const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')

//load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

cloudinary.config({
    cloud_name: 'duaxfzgmp',
    api_key: '615712249958477',
    api_secret: 'EU2PMyTSKYj17xigJKh9pnARcbc'
});

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 }
}))


//logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars helpers
const { section } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs({ helpers: {section}, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'lichigov1',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/products', require('./routes/products'))
app.use('/upload', require('./routes/upload'))
app.use('/perfil', require('./routes/profile'))



const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server running now in ${process.env.NODE_ENV} mode on port ${PORT}`))