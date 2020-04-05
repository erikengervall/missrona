const mongoose = require('mongoose')
const { SecretsManager } = require('aws-sdk')

const { MONGO_SECRET_NAME } = process.env

const ssm = new SecretsManager()
mongoose.set('useFindAndModify', false)

const getMongoURL = async () => {
  let secrets

  const encryptedSecretValue = await ssm.getSecretValue({ SecretId: MONGO_SECRET_NAME }).promise()

  if ('SecretString' in encryptedSecretValue) {
    secrets = JSON.parse(String(encryptedSecretValue.SecretString))
  } else {
    const buff = Buffer.from(String(encryptedSecretValue.SecretBinary), 'base64')
    secrets = JSON.parse(buff.toString('ascii'))
  }

  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_URL } = secrets

  return `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}`
}

const getMongoConnection = async () => {
  if (!mongo) {
    try {
      const mongoURL = await getMongoURL()

      const { connection } = await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

      mongo = connection
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    }
  }
}

const userSchema = new mongoose.Schema(
  {
    personaId: {
      type: String,
      unique: true,
    },
  },
  { autoIndex: false }
)

const feelingSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 2,
    },
    location: String,
  },
  { autoIndex: false }
)

const User = mongoose.model('User', userSchema)
const Feeling = mongoose.model('Feeling', feelingSchema)

let mongo = null

exports.addFeeling = async (event) => {
  await getMongoConnection()

  const { personaId, status, location } = JSON.parse(event.body)

  let { _id } = await User.findOneAndUpdate({ personaId }, {}, { upsert: true, new: true })

  const feeling = await Feeling.create({ userId: _id, status, location })

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ _id: feeling._id }),
  }
}
