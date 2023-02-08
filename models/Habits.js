const mongoose = require('mongoose')

const HabitSchema = new mongoose.Schema({
   habitName: {
      type: String,
      required: true
   },
   userId: {
      type: String,
   },
   streak: {
      type: Number,
   },
   lastClicked: {
      type: String,
   },
   todaysDateUTC: {
      type: String,
   },
   clicked: {
      type: String,
   },
   lastClickedMs: {
      type: Number
   },
   todaysDateMs: {
      type: Number
   }
})

module.exports = mongoose.model('Habits', HabitSchema)