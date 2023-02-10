const { Double } = require('mongodb')
const mongoose = require('mongoose')

const HabitSchema = new mongoose.Schema({
   userId: {
      type: String,
   },
   habitName: {
      type: String,
      required: true
   },
   streak: {
      type: Number,
   },
   lastCompleted: {
      type: Date,
   },
   timezone: {
      type: String
   },
   clicked: {
      type: Boolean,
   },
   lastClickedMs: {
      type: Number
   },
   todaysDateMs: {
      type: Number
   }
})

module.exports = mongoose.model('Habits', HabitSchema)