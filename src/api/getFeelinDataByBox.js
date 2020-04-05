import { server } from '../YeOldeNetworkLayer'

const getFeelinDataByBox = async ({ north, south, east, west }) => {
  const response = await server.get(`/?n=${north}&s=${south}&e=${east}&w=${west}`)
  return response
}

export default getFeelinDataByBox
