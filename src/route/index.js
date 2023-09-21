// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

//====================================================================
class Track {
	static #list = []

	constructor(name, author, image) {
		this.id = Math.floor(1000 + Math.random() * 9000)
		this.name = name
		this.author = author
		this.image = image
	}

	static create(name, author, image) {
		const newTrack = new Track(name, author, image)
		this.#list.push(newTrack)
		return newTrack;
	}
	static getList() {
		return this.#list.reverse()
	}
}
Track.create(
	"Інь Ян",
	"MONATIK і ROXOLANA",
	'../../img/image 627.png',
)
Track.create(
	"Baila Conmigo (Remix)",
	"Selena Gomez і Rauw Alejandro",
	`../../img/image 630.png`,
)
Track.create(
	"Shameless",
	"Camila Cabello ",
	`../../img/image 629.png`,
)
Track.create(
	"DÁKITI",
	"BAD BUNNY і JHAY",
	`../../img/image 628.png`,
)
Track.create(
	"11 PM",
	"Maluma",
	`../../img/image 631.png`,
)
Track.create(
	"Інша любов",
	"Enleo",
	`../../img/image 632.png`,
)
console.log(Track.getList());
class Playlist {
	static #list = []
	constructor(name) {
		this.id = Math.floor(1000 + Math.random() * 9000)
		this.name = name
		this.trfcks = []
		this.image = `../../img/image 632.png`
	}
	static create(name) {
		const newPlaylist = new Playlist(name)
		this.#list.push(newPlaylist)
		return newPlaylist;
	}
	static getList() {
		return this.#list.reverse()
	}
	static makeMix(playlist) {
		const allTracks = Track.getList()
		let randomTracks = allTracks
			.sort(() => 0.5 - Math.random())
			.splice(0, 3)
		playlist.tracks.push(...randomTracks)
	}
	static getById(id) {
		return (
			Playlist.#list.find(
				(playlist) => playlist.id === id,
			) || null
		)
	}
	deleteTrackById(trackId) {
		this.tracks = this.tracks.filter(
			(track) => track.id == !trackId
		)
	}
	static findListByValue(name) {
		return this.#list.filter((playlist) =>
			playlist.name
				.toLowerCase()
				.includes(name.toLowerCase())

		)
	}
}
Playlist.makeMix(Playlist.create('Test'))
Playlist.makeMix(Playlist.create('Test2'))
Playlist.makeMix(Playlist.create('Test3'))

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
	const isMix = !!req.query.isMix
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
	const isMix = !!req.query.isMix
	const name = req.body.name
	if (!name) {
		return res.render('alert', {
			style: 'alert',
			data: {
				message: 'Помилка',
				info: 'Введіть назву плейлиста',
				link: isMix ? `/spotify-create?isMix=true` : `/spotify-create`,

			}
		},
		)
	}
	const playlist = Playlist.create(name)

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
