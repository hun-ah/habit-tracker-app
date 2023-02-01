const passport = require('passport')

module.exports = {
   getPage: (req, res) => {
      res.render('login.ejs')
   },
   authenticateLogin: (req, res, next) => {
      passport.authenticate('local', {
         successRedirect: '/habits',
         failureRedirect: '/login',
         failureFlash: true
      })
         (req, res, next)
   },
   logout: (req, res, next) => {
      req.logout((err) => {
         if (err) {
            return next(err)
         }
         req.flash('success_msg', 'You have successfully logged out')
         res.redirect('/login')
      })
   }
}