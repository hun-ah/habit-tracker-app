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
      type: String,
   },
   timezone: {
      type: String
   },
   clicked: {
      type: Boolean,
   },
   lastClickedMs: {
      type: Number
   }
})

module.exports = mongoose.model('Habits', HabitSchema)