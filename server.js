const express = require('express')
const app = express()
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const nocache = require("nocache")

// Route variables
const habitRoutes = require('./routes/habits')
const errorRoutes = require('./routes/errors')
const indexRoutes = require('./routes/index')
const loginRoutes = require('./routes/login')
const getStartedRoutes = require('./routes/get-started')

// Passport & env
require('dotenv').config({ path: './config/.env' })
require('./config/passport')(passport)

const PORT = process.env.PORT

connectDB()

// Middleware...
app.use(nocache())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions
app.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: false,
   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global vars
app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg')
   res.locals.error_msg = req.flash('error_msg')
   res.locals.error = req.flash('error')
   next()
})

// Routes
app.use('/', indexRoutes)
app.use('/habits', habitRoutes)
app.use('/login', loginRoutes)
app.use('/getStarted', getStartedRoutes)
app.use('*', errorRoutes)


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))