// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Product { }



//====================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
	// res.render генерує нам HTML сторінку

	// ↙️ cюди вводимо назву файлу з сontainer
	res.render('alert', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'alert',
		data: {
			message: "Операція успішна",
			info: "Товар створений",
			link: `/purchase-index`,
		},
	})
	// ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/purchase-index', function (req, res) {
	res.render('purchase-index', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'purchase-index',
		data: {
			img: '/img/comp.png',
			title: "Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/",
			description: "AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС",
			category: [
				{ id: 1, text: "Готовий до відправки" },
				{ id: 2, text: "ТОП Продіжів" },
			],
			price: 27000,
			img: '/img/comp2.png',
			title: "Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel",
			description: "Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux",
			category: [
				{ id: 1, text: "Готовий до відправки" },
				{ id: 2, text: "ТОП Продіжів" },
			],
			price: 17000,
		},
	})
})
// ↑↑ сюди вводимо JSON дані



// Підключаємо роутер до бек-енду
module.exports = router
