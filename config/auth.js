module.exports = {
   ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
         return next()
      }
      req.flash('error_msg', 'Please login to view your habits')
      res.redirect('/login')
   },
   ensureGuest: (req, res, next) => {
      if (req.isAuthenticated()) {
         res.redirect('/habits')
      } else {
         return next()
      }
   }
}