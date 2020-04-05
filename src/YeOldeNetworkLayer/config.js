const { v4: uuidv4 } = require('uuid')

let personaId = localStorage.getItem('personaId')
if (!personaId) {
  personaId = uuidv4()
  localStorage.setItem('personaId', personaId)
}

const config = {
  baseURL: 'https://missrona.sousa.cloud/feelings',
  timeout: 1000 * 10,
  headers: { personaId },
}

export default config
