import type { Client } from '@managed-components/types'

/**
 * Get a random integer between min (inclusive) and max (exclusive)
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (exclusive)
 * @returns A random integer between min and max
 */
export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min

/**
 * setGclAwCookie
 * Sets cookies for cross-domain tracking and click id
 * @param client - The client object used to extract URL and set cookies
 * @returns void
 */
export function setGclAwCookie(client: Client) {
  // search for _gl param used for cross-domain tracking, and extract the _gcl_aw cookie value from it
  try {
    const ts = Math.floor(new Date().valueOf() / 1000)
    if (client.url.searchParams.get('_gl')) {
      const glParam = client.url.searchParams.get('_gl')

      if (glParam) {
        const glParts = glParam.split('*')

        // Find the part that starts with _gcl_aw
        const gclawIndex = glParts.findIndex(part => part === '_gcl_aw')
        if (gclawIndex !== -1 && gclawIndex + 1 < glParts.length) {
          const gclid = glParts[gclawIndex + 1] // Extract the value after _gcl_aw
          client.set('_gcl_aw', `GCL.${ts}.${gclid}`, {
            scope: 'infinite',
          })
        }
      }
    }

    // search for gclid param and set it as the _gcl_aw cookie value
    if (client.url.searchParams.get('gclid')) {
      const gclid = client.url.searchParams.get('gclid')
      if (gclid) {
        client.set('_gcl_aw', `GCL.${ts}.${gclid}`, {
          scope: 'infinite',
        })
      }
    }
  } catch (e) {
    console.error('Google Ads: Error parsing gclaw')
    console.error(e)
  }
}
