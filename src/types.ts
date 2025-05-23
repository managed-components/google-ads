/**
 * Interface for client-side Google Ads calls
 * @remarks TODO: Add more details about the properties
 */
export interface GAdsQuery {
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
