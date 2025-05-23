import { describe, it, expect, vi, beforeEach } from 'vitest'
import { pageViewHandler } from './pageview'
import { mockEvent } from '@mackenly/zaraz-tools'
import type { MCEvent, ComponentSettings } from '@managed-components/types'

describe('pageViewHandler event', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls setGclAwCookie with the event client', async () => {
    const event: MCEvent = {
      ...mockEvent,
      client: {
        ...mockEvent.client,
        url: new URL('https://example.com/?gclid=test-id'),
        set: vi.fn(),
        execute: vi.fn(),
      },
    } as unknown as MCEvent

    const settings: ComponentSettings = {
      domains: 'example.com,example.org',
    }

    await pageViewHandler(event, settings)

    expect(event.client.set).toHaveBeenCalledWith(
      '_gcl_aw',
      expect.stringContaining('GCL.'),
      { scope: 'infinite' }
    )
  })

  it('calls conversionLinkerHandler if settings.domains is set', async () => {
    const settings: ComponentSettings = {
      domains: 'example.com,example.org',
    }

    const event: MCEvent = {
      ...mockEvent,
      client: {
        ...mockEvent.client,
        url: new URL('https://example.com'),
        set: vi.fn(),
        execute: vi.fn(),
      },
    } as unknown as MCEvent

    await pageViewHandler(event, settings)

    expect(event.client.execute).toHaveBeenCalledWith(
      expect.stringContaining('linker')
    )
  })

  it('does not call conversionLinkerHandler if settings.domains is not set', async () => {
    const event: MCEvent = {
      ...mockEvent,
      client: {
        ...mockEvent.client,
        url: new URL('https://example.com'),
        set: vi.fn(),
        execute: vi.fn(),
      },
    } as unknown as MCEvent

    const settings: ComponentSettings = {}

    await pageViewHandler(event, settings)

    expect(event.client.execute).not.toHaveBeenCalled()
  })
})
