import { server } from '../YeOldeNetworkLayer'

const submitHealthCheck = async (data) => {
  const response = await server.post('/feelings', data)
  return response.status === 200
}

export default submitHealthCheck
