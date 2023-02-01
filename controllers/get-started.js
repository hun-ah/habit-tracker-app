const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
   getPage: (req, res) => {
      res.render('get-started.ejs')
   },
   registerUser: (req, res) => {
      const { name, email, password } = req.body

      let errors = []

      // Check required fields
      if (!name || !email || !password) {
         errors.push({ msg: 'Please fill in all fields.' })
      }

      // Check pass length
      if (password.length < 6) {
         errors.push({ msg: 'Password should be at least 6 characters.' })
      }

      if (errors.length > 0) {
         res.render('get-started.ejs', {
            errors,
            name,
            email,
            password
         })
      } else {
         User.findOne({ email: email })
            .then(user => {
               if (user) {
                  // User exists
                  errors.push({ msg: 'Email is already registered.' })
                  res.render('get-started.ejs', {
                     errors,
                     name,
                     email,
                     password
                  })
               } else {
                  const newUser = new User({
                     name,
                     email,
                     password
                  })

                  // Hash password
                  bcrypt.genSalt(10, (err, salt) =>
                     bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash

                        // Save user
                        newUser.save()
                           .then(user => {
                              req.flash('success_msg', 'You are now registered! Please login to start tracking your habits.')
                              res.redirect('/login')
                           })
                           .catch(err => console.log(err))
                     }))
               }
            })
      }
   }
}