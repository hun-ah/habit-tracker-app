const mongoose = require('mongoose')
require('dotenv').config({ path: './config/.env' })

const dbConnectionStr = process.env.MONGO_URI

const connectDB = async () => {
   mongoose.connect(dbConnectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }, mongoose.set('strictQuery', false))
      .then(res => {
         console.log(`MongoDB Connected: ${res.connection.host}`)
      })
      .catch(err => {
         console.error(err)
         process.exit(1)
      })
}

module.exports = connectDB