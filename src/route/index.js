// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Product {
	static #list = [];
	constructor(name, price, description) {
		this.name = name
		this.price = price
		this.description = description
		this.id = new Date().getTime()
	}
	static add = (product) => {
		this.#list.push(product)
	}
	static getList = () => this.#list
	static getById = (id) => this.#list.find((product) => product.id === id)

	static deletById = (id) => {
		const index = this.#list.findIndex(
			(product) => product.id === id,
		)
		if (index !== -1) {
			this.#list.splice(index, 1)
			return true
		} else {
			return false
		}
	}
}



//====================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
	// res.render генерує нам HTML сторінку

	// ↙️ cюди вводимо назву файлу з сontainer
	res.render('index', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'index',
	})
	// ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.post('/product-create', function (req, res) {
	const { name, price, description } = req.body;
	const product = new Product(name, price, description)
	Product.add(product);
	console.log(Product.getList());

	// ↙️ cюди вводимо назву файлу з сontainer
	res.render("alert-product", {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: "alert-product",
		data: {
			link: '/product-list',
			title: 'Успішне виконання дії',
			info: 'Продукт створений',
		},
	})
	// ↑↑ сюди вводимо JSON дані
})
router.get('/product-list', function (req, res) {
	const products = Product.add(
		{
			name,
			description,
			price

		},

	) = req.body;

	console.log(products)
	// ↙️ cюди вводимо назву файлу з сontainer
	res.render("alert-product", {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: "alert-product",
		data: {
			link: '/product-list',
			title: 'Успішне виконання дії',
			info: 'Продукт створений',
		},
	})
	// ↑↑ сюди вводимо JSON дані
})


// Підключаємо роутер до бек-енду
module.exports = router
