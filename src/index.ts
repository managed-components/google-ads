import type {
  ComponentSettings,
  Manager,
  MCEvent,
} from '@managed-components/types'
import type { GAdsQuery } from './types'
import { getRandomInt, setGclAwCookie } from './utils'
import { pageViewHandler } from './events/pageview'

export const eventHandler = async (
  eventType: string,
  event: MCEvent,
  settings: ComponentSettings
) => {
  const { client, payload } = event

  // set the _gcl_aw cookie if _gl or gclid query params exists
  setGclAwCookie(client)

  // if not pageview, build the request and send it
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

  const neededFetch = []

  const conversionId = payload.conversionId || settings.conversionId
  delete payload.conversionId

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

/**
 * Managed Component handler for Google Ads
 * @param manager - The Managed Components manager instance
 * @param settings - The component settings
 * @returns {Promise<void>}
 */
export default async function (manager: Manager, settings: ComponentSettings) {
  /**
   * Pageview event handler
   * @remarks This event is used to load the client side conversion linker
   * @see {@link https://support.google.com/tagmanager/answer/7549390?hl=en}
   * @param event - The pageview event
   * @param settings - The component settings
   */
  manager.addEventListener('pageview', event => {
    pageViewHandler(event, settings)
  })

  /**
   * Conversion event handler
   * @remarks This event is used for conversion tracking for measuring campaign performance
   * @see {@link https://developers.google.com/google-ads/api/rest/reference/rest/v19/customers/uploadClickConversions}
   * @param event - The conversion event
   * @param settings - The component settings
   */
  manager.addEventListener('conversion', event => {
    eventHandler('conversion', event, settings)
  })

  /**
   * Remarketing event handler
   * @remarks This event is used for remarketing purposes
   * @see {@link https://developers.google.com/google-ads/api/docs/dynamic-remarketing/overview}
   * @param event - The remarketing event
   * @param settings - The component settings
   */
  manager.addEventListener('remarketing', event => {
    eventHandler('remarketing', event, settings)
  })
}
