const Habits = require('../models/Habits')
const moment = require('moment-timezone')
moment().format()

module.exports = {
   getPage: (req, res) => {
      // hardcoded in my timezone to get this to work for now
      let todaysDate = moment().utc().startOf('day')
      let todaysDateFormatted = moment.tz(todaysDate, 'America/Toronto').startOf('day').add(1, 'days').format()
      let todaysDateMs = new Date(todaysDateFormatted).getTime()

      Promise.all([
         Habits.updateMany({ lastCompleted: { $ne: todaysDateFormatted } },
            {
               $set: {
                  clicked: false
               }
            }),
         Habits.updateMany({ $expr: { $gte: [{ $subtract: [todaysDateMs, "$lastClickedMs"] }, 172800000] } }, {
            $set: {
               streak: 0
            },
         })
      ])
         .then(() => {
            Habits.find({ userId: req.user.id }).sort({ clicked: 1 })
               .then(results => {
                  let filtered = results.filter(result => result.clicked === false)
                  habitsLeft = filtered.length
                  let completed = []

                  if (habitsLeft === 0 && results.length > 0) {
                     completed.push({ msg: 'Congratulations! You have completed all of today\'s habits!' })
                  }

                  res.render('habits.ejs', { habits: results, dayVar: 'days', habitsLeft, name: req.user.name, completed })
               })
         })
   },
   createHabit: (req, res) => {
      const habitName = req.body.habitName.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ')

      Habits.create({ habitName: habitName, streak: 0, lastCompleted: null, timezone: req.body.timezone, clicked: false, userId: req.user.id })
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
            clicked: req.body.clicked,
            lastCompleted: req.body['current-date'],
            lastClickedMs: req.body.lastClickedMs
         }
      })
         .then(console.log('Added Day'),
            res.json(' Habit Completed'))
         .catch(error => console.error(error))
   },
   undoHabit: (req, res) => {
      console.log(req.body)

      Habits.findOneAndUpdate({ _id: req.body.habitId }, {
         $set: {
            streak: req.body.streak - 1,
            clicked: req.body.clicked,
            lastCompleted: moment(req.body['current-date']).subtract(1, 'days').format(),
            lastClickedMs: req.body.lastClickedMs,
         }
      })
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