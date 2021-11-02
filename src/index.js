const express = require('express'),
	morgan = require('morgan'),
	path = require('path')

// initializations
const app = express()

//settings
app.set('port', process.env.PORT || 4000) // if there is a port use it
app.set('views', path.join(__dirname, 'views')) //configure where the folder is
app.engine('html', require('ejs').renderFile) // Html files will be used but they will be processed by ejs
app.set('view engine', 'ejs') // Configure the template engine ejs

// MiddleWares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.use(require('./routes/conexion'))

// Starting the server
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'))
})
