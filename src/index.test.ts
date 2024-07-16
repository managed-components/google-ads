import { Client } from '@managed-components/types'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { setGclAwCookie } from './utils' // Adjust this import to your actual function location

describe('Google Ads MC', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should set the correct _gcl_aw cookie value from _gl parameter', async () => {
    const mockClient = {
      emitter: 'browser',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      language: 'en-GB,en-US;q=0.9,en;q=0.8',
      referer: 'https://google.com',
      ip: '::1',
      title: 'My Website',
      timestamp: 1692890759111,
      url: new URL(
        'http://127.0.0.1:1337/?_gl=1*159xsr*_gcl_aw*CjwKCAjwnK60BhA9EiwAmpHZwxKOtYkUL7L3fXNGpGSuGAY8b9UwJSUBKiAO569CG3wPjFzGvtEcVRoCrVwQAvD_BwE*_ga_N5L9GMND5*MTYzNTENjQzMC40MS4xLjE2MzU%C3%97NTkMTguMA*_fp|c*/VozZE1zRk16cjBOcVIJ'
      ),
      set: vi.fn(),
      get: vi.fn(),
    } as unknown as Client

    setGclAwCookie(mockClient)

    expect(mockClient.set).toHaveBeenCalledWith(
      '_gcl_aw',
      expect.stringMatching(
        /^GCL\.\d+\.CjwKCAjwnK60BhA9EiwAmpHZwxKOtYkUL7L3fXNGpGSuGAY8b9UwJSUBKiAO569CG3wPjFzGvtEcVRoCrVwQAvD_BwE$/
      ),
      { scope: 'infinite' }
    )
  })

  it('should set the correct _gcl_aw cookie value from gclid parameter', async () => {
    const mockClient = {
      emitter: 'browser',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      language: 'en-GB,en-US;q=0.9,en;q=0.8',
      referer: 'https://google.com',
      ip: '::1',
      title: 'My Website',
      timestamp: 1692890759111,
      url: new URL(
        'http://127.0.0.1:1337/?gclid=CjwKCAjwnK60BhA9EiwAmpHZwxKOtYkUL7L3fXNGpGSuGAY8b9UwJSUBKiAO569CG3wPjFzGvtEcVRoCrVwQAvD_BwE'
      ),
      set: vi.fn(),
      get: vi.fn(),
    } as unknown as Client

    setGclAwCookie(mockClient)

    expect(mockClient.set).toHaveBeenCalledWith(
      '_gcl_aw',
      expect.stringMatching(
        /^GCL\.\d+\.CjwKCAjwnK60BhA9EiwAmpHZwxKOtYkUL7L3fXNGpGSuGAY8b9UwJSUBKiAO569CG3wPjFzGvtEcVRoCrVwQAvD_BwE$/
      ),
      { scope: 'infinite' }
    )
  })

  it('should set the correct _gcl_aw cookie value from _gl parameter with _gcl_aw as the last value', async () => {
    const mockClient = {
      emitter: 'browser',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      language: 'en-GB,en-US;q=0.9,en;q=0.8',
      referer: 'https://google.com',
      ip: '::1',
      title: 'My Website',
      timestamp: 1692890759111,
      url: new URL(
        'http://127.0.0.1:1337/?_gl=1*159xsr*_ga_N5L9GMND5*MTYzNTENjQzMC40MS4xLjE2MzU%C3%97NTkMTguMA*_fp|c*/VozZE1zRk16cjBOcVIJ*_gcl_aw*CjwKCAjwnK60BhA9EiwAmpHZwxKOtYkUL7L3fXNGpGSuGAY8b9UwJSUBKiAO569CG3wPjFzGvtEcVRoCrVwQAvD_BwE'
      ),
      set: vi.fn(),
      get: vi.fn(),
    } as unknown as Client

    setGclAwCookie(mockClient)

    expect(mockClient.set).toHaveBeenCalledWith(
      '_gcl_aw',
      expect.stringMatching(
        /^GCL\.\d+\.CjwKCAjwnK60BhA9EiwAmpHZwxKOtYkUL7L3fXNGpGSuGAY8b9UwJSUBKiAO569CG3wPjFzGvtEcVRoCrVwQAvD_BwE$/
      ),
      { scope: 'infinite' }
    )
  })

  it('should set the correct _gcl_aw cookie value from gclid parameter with other query parameters', async () => {
    const mockClient = {
      emitter: 'browser',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      language: 'en-GB,en-US;q=0.9,en;q=0.8',
      referer: 'https://google.com',
      ip: '::1',
      title: 'My Website',
      timestamp: 1692890759111,
      url: new URL(
        'http://127.0.0.1:1337/?utm_source=test&utm_medium=test&gclid=CjwKCAjwnK60BhA9EiwAmpHZwxKOtYkUL7L3fXNGpGSuGAY8b9UwJSUBKiAO569CG3wPjFzGvtEcVRoCrVwQAvD_BwE&utm_campaign=test'
      ),
      set: vi.fn(),
      get: vi.fn(),
    } as unknown as Client

    setGclAwCookie(mockClient)

    expect(mockClient.set).toHaveBeenCalledWith(
      '_gcl_aw',
      expect.stringMatching(
        /^GCL\.\d+\.CjwKCAjwnK60BhA9EiwAmpHZwxKOtYkUL7L3fXNGpGSuGAY8b9UwJSUBKiAO569CG3wPjFzGvtEcVRoCrVwQAvD_BwE$/
      ),
      { scope: 'infinite' }
    )
  })
})
