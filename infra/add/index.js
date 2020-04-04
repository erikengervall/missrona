const mongoose = require('mongoose')
const { SecretsManager } = require('aws-sdk')

const { MONGO_SECRET_NAME } = process.env

const ssm = new SecretsManager()
mongoose.set('useFindAndModify', false)

const getDbUrl = async () => {
  let secrets

  const encryptedSecretValue = await ssm.getSecretValue({ SecretId: MONGO_SECRET_NAME }).promise()

  if ('SecretString' in encryptedSecretValue) {
    secrets = JSON.parse(String(encryptedSecretValue.SecretString))
  } else {
    const buff = Buffer.from(String(encryptedSecretValue.SecretBinary), 'base64')
    secrets = JSON.parse(buff.toString('ascii'))
  }

  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_URL } = secrets

  const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}`

  console.log(secrets)
  console.log(MONGO_USERNAME, MONGO_PASSWORD, MONGO_URL)
  console.log(url)

  return url
}

const feelingSchema = new mongoose.Schema(
  {
    userId: String,
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 2,
    },
    location: String,
  },
  { autoIndex: false }
)

const userSchema = new mongoose.Schema(
  {
    userId: String,
    personaId: {
      type: String,
      unique: true,
    },
  },
  { autoIndex: false }
)

const User = mongoose.model('User', userSchema)
const Feeling = mongoose.model('Feeling', feelingSchema)

let db = null

exports.add = async (event) => {
  console.log('start')
  const {
    body: { personaId, feeling, location },
  } = event
  console.log('get request')

  if (!db) {
    try {
      const dbUrl = await getDbUrl()
      const { connection } = await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      db = connection
      console.log('db connected')
    } catch (error) {
      return console.error(error)
    }
  }
  console.log('db ready')

  let { userId } = await User.findOneAndUpdate({ personaId }, {}, { upsert: true, new: true })
  console.log('got user')

  await new Feeling({ userId, feeling, location }).save()
  console.log('saved feeling')
}
