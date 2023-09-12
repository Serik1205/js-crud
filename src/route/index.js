// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Product {
	static #list = []
	static #count = 0
	constructor(img, title, description, category, price) {
		this.id = ++Product.#count
		this.img = img
		this.title = title
		this.description = description
		this.category = category
		this.price = price
	}
	static add = (
		img,
		title,
		description,
		category,
		price,
	) => {
		const newProduct = new Product(
			img,
			title,
			description,
			category,
			price,
		)
		this.#list.push(newProduct)
	}
	static getList = () => {
		return this.#list
	}
	static getById = (id) => {
		return this.#list.find((product) => product.id === id)
	}
	static getRandomList = (id) => {
		const filteredList = this.#list.filter(
			(product) => product.id != id,
		)
		const shuffledList = filteredList.sort(
			() => Math.random() - 0.5
		)
		return shuffledList.slice(0.3);
	}
}

Product.add(
	'/img/comp.png',
	`Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
	`AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС`,
	[
		{ id: 1, text: 'Готовий до відправки' },
		{ id: 2, text: 'Топ продажів' },
	],
	27000,

)
Product.add(
	'/img/comp2.png',
	`Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel`,
	`Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux`,
	[
		{ id: 1, text: 'Готовий до відправки' },
		{ id: 2, text: 'Топ продажів' },
	],
	17000,

)
Product.add(
	'/img/comp3.png',
	`Комп'ютер ARTLINE Gaming by ASUS TUF v119 (TUFv119`,
	`Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4070 Ti, 12 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС`,
	[
		{ id: 1, text: 'Готовий до відправки' },
		{ id: 2, text: 'Топ продажів' },
	],
	113109,

)




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
		title: 'Товари',
		description: `Комп'ютери та ноутбуки/Комп'ютери, неттопи, моноблоки`,

		data: {
			title: 'Товари',
			subtitle:
				"Комп'ютери та ноутбуки/Комп'ютери, неттопи, моноблоки",
			list: Product.getList(),
		},
	})
})
// ↑↑ сюди вводимо JSON дані
router.get('/purchase-product', function (req, res) {
	const id = Number(req.query.id)
	res.render('purchase-product', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'purchase-product',

		data: {
			list: Product.getRandomList(id),
			product: Product.getById(id),
		},
	})
})

router.post('/purchase-create', function (req, res) {
	const id = Number(req.query.id)
	const amount = Number(req.body.amount)
	console.log(id, amount);
	if (amount < 1) {
		return res.render('alert', {
			// вказуємо назву папки контейнера, в якій знаходяться наші стилі
			style: 'alert',

			data: {
				message: "Помилка",
				info: "Некоректна кількість товару",
				link: `purchase-product?id=${id}`
			},
		})
	}


	res.render('purchase-product', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'purchase-product',

		data: {
			list: Product.getRandomList(id),
			product: Product.getById(id),
		},
	})
})


// Підключаємо роутер до бек-енду
module.exports = router
