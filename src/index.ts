import { ComponentSettings, Manager, MCEvent } from '@managed-components/types'
import { conversionLinkerHandler } from './conversionLinker'

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min
}

interface GAdsQuery {
  guid: string
  rnd: number
  fst: number
  cv: number
  sendb: number
  num: number
  u_java: boolean
  url: URL | string
  tiba?: string
  u_tz: number
  u_his: number
  u_h?: number
  u_w?: number
  u_ah?: number
  u_aw?: number
  ig: number
  ref?: string
  gclaw?: string
  gac?: string
}

export const eventHandler = async (
  eventType: string,
  event: MCEvent,
  settings: ComponentSettings
) => {
  const { client, payload } = event
  const neededFetch = []

  const conversionId = payload.conversionId || settings.conversionId
  delete payload.conversionId

  const query: GAdsQuery = {
    guid: 'ON',
    rnd: new Date().valueOf() + getRandomInt(100, 1600000),
    fst: new Date().valueOf(), // google_conversion_first_time
    cv: 9, // google_conversion_js_version
    sendb: 1,
    num: 1,
    // u_cd: system.device.colors, // TODO: How do we want to handle this?
    u_java: false,
    url: client.url.href,
    tiba: client.title,
    u_tz: -(client.timezoneOffset || 0),
    // resp: 'GooglemKTybQhCsO',
    u_his: 10,
    u_h: client.viewportHeight,
    u_w: client.viewportWidth,
    u_ah: client.screenHeight,
    u_aw: client.screenWidth,
    ig: 1,
    ...(client.referer && {
      ref: client.referer,
    }),
  }

  // TODO: Add enhances parameters:
  // bg: "ffffff",
  // u_nplug: 3
  // u_nmime: 4


  if (client.url.searchParams.get('_gl')) {
    try {
      const gclaw = atob(
        (client.url.searchParams.get('_gl')?.split('*').pop() || '').replaceAll(
          '.',
          ''
        )
      )
      client.set('_gcl_aw', gclaw, {
        scope: 'infinite',
      })
      query.gclaw = gclaw.split('.').pop()
    } catch (e) {
      console.error('Google Conversion Pixel: Error parsing gclaw')
      console.error(e)
    }
  }
  if (eventType === 'pageview') {
    return
  }

  if (client.get('_gcl_aw')) {
    query.gclaw = client.get('_gcl_aw')?.split('.').pop()
  }

  if (query.gclaw) {
    const url = new URL(query.url)
    url.searchParams.append('gclid', query.gclaw)
    query.url = url
    neededFetch.push(
      `https://www.google.com/pagead/landing?gclid=${query.gclaw}&url=${query.url}&rnd=${query.rnd}`
    )
  }
  if (query.gclaw && settings.gaAccount) {
    query.gac = settings.gaAccount + ':' + query.gclaw
  }

  const params = new URLSearchParams({ ...query, ...payload }).toString()

  let baseURL = ''
  if (eventType === 'remarketing') {
    baseURL = 'https://www.google.com/pagead/1p-user-list'
  } else {
    baseURL = 'https://www.googleadservices.com/pagead/conversion'
  }
  neededFetch.push(`${baseURL}/${conversionId}/?${params}`)

  neededFetch.push(
    `https://googleads.g.doubleclick.net/pagead/viewthroughconversion/${conversionId}/?${params}`
  )

  neededFetch.forEach(url => {
    client.fetch(url, {
      credentials: 'include',
      mode: 'no-cors',
      keepalive: true,
    })
  })
}

export default async function (manager: Manager, settings: ComponentSettings) {
  manager.addEventListener('pageview', event => {
    conversionLinkerHandler(event, settings)
    eventHandler('pageview', event, settings)
  })
  manager.addEventListener('conversion', event => {
    eventHandler('conversion', event, settings)
  })
  manager.addEventListener('remarketing', event => {
    eventHandler('remarketing', event, settings)
  })
}
