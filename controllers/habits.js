const Habits = require('../models/Habits')

module.exports = {
   getPage: (req, res) => {
      let todaysDate = new Date().toString()
      // let todaysDateMs = new Date(todaysDate + ', 00:00:00').getTime()

      console.log(todaysDate)
      // console.log(todaysDateMs)

      Promise.all([
         Habits.updateMany({}, {
            $set: {
               todaysDate,
               // todaysDateMs
            }
         }),
         Habits.updateMany({ lastClicked: { $ne: todaysDate } }, {
            $set: {
               clicked: 'false'
            }
         }),
         // Habits.updateMany({ $expr: { $gte: [{ $subtract: ["$todaysDateMs", "$lastClickedMs"] }, 172800000] } }, {
         //    $set: {
         //       streak: 0
         //    },
         // })
      ]).then(() => {
         Habits.find({ userId: req.user.id }).sort({ clicked: 1 })
            .then(results => {
               let filtered = results.filter(result => result.clicked === 'false')
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

      Habits.create({ habitName: habitName, streak: 0, lastClicked: '', clicked: 'false', userId: req.user.id })
         .then(result => {
            console.log(result)
            res.redirect('/habits')
         }).catch(err => {
            console.log(err)
         })
   },
   updateHabit: (req, res) => {
      console.log(req.body)
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
   undoHabit: (req, res) => {
      Habits.findOneAndUpdate({ _id: req.body.habitId }, {
         $set: {
            streak: req.body.streak - 1,
            clicked: req.body.clicked,
            lastClicked: req.body['current-date'],
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