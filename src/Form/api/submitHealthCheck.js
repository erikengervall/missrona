import { server } from '../../YeOldeNetworkLayer'

const submitHealthCheck = async (data) => {
  const response = await server.post('/save', data)
  return response.status === 200
}

export default submitHealthCheck
