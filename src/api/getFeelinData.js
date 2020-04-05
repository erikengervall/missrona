import { server } from '../YeOldeNetworkLayer'

const getFeelData = async ({ lat, lng }) => {
  const response = await server.get(`/feelings?lat=${lat}&lng=${lng}`)
  return response
}

export default getFeelData
