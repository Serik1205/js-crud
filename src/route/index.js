// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()





//====================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-choose', function (req, res) {
	// res.render генерує нам HTML сторінку

	// ↙️ cюди вводимо назву файлу з сontainer
	res.render('spotify-choose', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'spotify-choose',
		data: {}
	})
	// ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/spotify-create', function (req, res) {
	const isMix = req.query.isMix
	console.log(isMix);
	// res.render генерує нам HTML сторінку

	// ↙️ cюди вводимо назву файлу з сontainer
	res.render('spotify-create', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'spotify-create',
		data: {
			isMix,
		},

	})
	// ↑↑ сюди вводимо JSON дані
})

router.post('/spotify-create', function (req, res) {

	console.log(req.body, req.query);

	// res.render генерує нам HTML сторінку

	// ↙️ cюди вводимо назву файлу з сontainer
	res.render('spotify-create', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'spotify-create',
		data: {}


	})
	// ↑↑ сюди вводимо JSON дані
})




// Підключаємо роутер до бек-енду
module.exports = router
