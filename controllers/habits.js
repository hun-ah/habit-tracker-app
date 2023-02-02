const Habits = require('../models/Habits')

module.exports = {
   getPage: (req, res) => {
      let todaysDate = new Date().toString().split(' ').slice(0, 4).join(' ')
      let todaysDateMs = new Date(todaysDate + ', 00:00:00').getTime()

      Promise.all([
         Habits.updateMany({}, {
            $set: {
               todaysDate,
               todaysDateMs
            }
         }),
         Habits.updateMany({ lastClicked: { $ne: todaysDate } }, {
            $set: {
               clicked: 'false'
            }
         }),
         Habits.updateMany({ $expr: { $gte: [{ $subtract: ["$todaysDateMs", "$lastClickedMs"] }, 172800000] } }, {
            $set: {
               streak: 0
            },
         })
      ]).then(() => {
         Habits.find({ userId: req.user.id })
            .then(results => {
               let filtered = results.filter(result => result.clicked === 'false')
               habitsLeft = filtered.length
               res.render('habits.ejs', { habits: results, dayVar: 'days', habitsLeft, name: req.user.name })
            })
      })
   },
   createHabit: (req, res) => {
      const habitName = req.body.habitName.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ')

      Habits.create({ habitName: habitName, streak: 0, lastClicked: '', clicked: 'false', userId: req.user.id })
         .then(result => {
            console.log(result)
            res.redirect('/habits')
         }).catch(err => {
            console.log(err)
         })
   },
   updateHabit: (req, res) => {
      Habits.findOneAndUpdate({ _id: req.body.habitId, streak: req.body.streak, date: { $ne: req.body['current-date'] } }, {
         $set: {
            streak: req.body.streak + 1,
            clicked: req.body.clicked,
            lastClicked: req.body['current-date'],
            lastClickedMs: req.body.lastClickedMs
         }
      })
         .then(console.log('Added Day'),
            res.json('Completed'))
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