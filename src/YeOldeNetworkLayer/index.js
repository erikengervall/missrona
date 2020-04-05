import axios from 'axios'
import config from './config'

const server = axios.create(config)

export { server }
