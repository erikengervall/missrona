const mongoose = require('mongoose')

const USERNAME = 'missrona'
const PASSWORD = '2rwhu5xKGRGTIP0D'
const MONGO_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@hack-for-crysis-begkv.mongodb.net/test?retryWrites=true&w=majority`

// SCHEMA
// ============================================================

const kittySchema = new mongoose.Schema({
  name: String,
})

// ============================================================

const main = async () => {
  try {
    const { connection: db } = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    db.on('error', console.error.bind(console, 'connection error:'))

    const Kitten = mongoose.model('Kitten', kittySchema)

    await new Kitten({ name: 'Silence' }).save()

    const kitten = await Kitten.find({ name: 'Silence' })

    console.log(kitten)
  } catch (error) {
    console.log(error)
  }
}

module.exports = main()
