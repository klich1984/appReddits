const express = require('express'),
	router = express.Router()

// import database conexion
const db_pool = require('../database')

router.get('/', async (req, res) => {
	const data = await db_pool.query('SELECT * FROM info_subreddits')

	res.render('reddits.html', {
		data,
		img_default:
			'https://www.vectorico.com/wp-content/uploads/2018/08/Reddit-logo-300x300.png',
	})
})

router.get('/details/:id', async (req, res) => {
	const { id } = req.params
	const dataId = await db_pool.query(
		'SELECT * FROM info_subreddits WHERE id = ?',
		[id]
	)

	res.render('details.html', {
		dataId: dataId[0],
		img_default:
			'https://www.vectorico.com/wp-content/uploads/2018/08/Reddit-logo-300x300.png',
		msg_default: 'This is the subreddit ',
	})
	// console.log(dataId[0])
})

module.exports = router
