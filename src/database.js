const mysql = require('mysql'),
	{ promisify } = require('util'), // Modulo para soportar promesas
	{ database } = require('./keys')

// Using create pull
const pool = mysql.createPool(database)

pool.getConnection((err, connection) => {
	// Check errors
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('Database Connection was closed')
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.error('Database has to many Connections')
		}
		if (err.code === 'ECONNREFUSED') {
			console.error('Database connection was refused')
		}
	}
	// successful connection
	if (connection) connection.release()
	console.log('DB is connected')
	return
})

// Promisify pool querys
pool.query = promisify(pool.query)

module.exports = pool
