const Habits = require('../models/Habits')
const moment = require('moment-timezone')
moment().format()

module.exports = {
   getPage: (req, res) => {
      let todaysDate = moment().utc().startOf('day')
      let todaysDateMs = new Date(todaysDate).getTime()

      Habits.updateMany({ $expr: { $gte: [{ $subtract: [todaysDateMs, "$lastClickedMs"] }, 172800000] } }, {
         $set: {
            streak: 0
         },
      })
         .then(() => {
            Habits.find({ userId: req.user.id }).sort({ lastCompleted: 1 }).lean()
               .then(results => {

                  res.render('habits.ejs', { habits: results, dayVar: 'days', name: req.user.name })
               })
         })
   },
   createHabit: (req, res) => {
      const habitName = req.body.habitName.trim().split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ')

      Habits.create({ habitName: habitName, streak: 0, lastCompleted: '', userId: req.user.id })
         .then(result => {
            console.log(result)
            res.redirect('/habits')
         }).catch(err => {
            console.log(err)
         })
   },
   updateHabit: (req, res) => {
      console.log(req.body)

      Habits.findOneAndUpdate({ _id: req.body.habitId }, {
         $set: {
            streak: req.body.streak + 1,
            lastCompleted: req.body['current-date'],
            lastClickedMs: req.body.lastClickedMs
         }
      }).lean()
         .then(console.log('Added Day'),
            res.json(' Habit Completed'))
         .catch(error => console.error(error))
   },
   undoHabit: (req, res) => {
      console.log(req.body)

      Habits.findOneAndUpdate({ _id: req.body.habitId }, {
         $set: {
            streak: req.body.streak - 1,
            lastCompleted: moment(req.body['current-date']).subtract(1, 'days').format(),
            lastClickedMs: req.body.lastClickedMs,
         }
      }).lean()
         .then(console.log('Undo Habit'),
            res.json('Undo Completed'))
         .catch(error => console.error(error))
   },
   deleteHabit: (req, res) => {
      Habits.findOneAndDelete({ _id: req.body.habitId })
         .then(console.log('Habit deleted'),
            res.json('Habit deleted')
         )
         .catch(error => console.error(error))
   }
}