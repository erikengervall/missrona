import { server } from '../YeOldeNetworkLayer'

const n = 59.374665870211466
const s = 59.29446880123298
const e = 18.15293306945799
const w = 17.973546930541975

const getFeelinDataByBox = async ({ north, south, east, west }) => {
  const response = await server.get(`/?n=${north}&s=${south}&e=${east}&w=${west}`)
  return response
}

export default getFeelinDataByBox
