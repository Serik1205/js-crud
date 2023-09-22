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
	"../../img/image 627.png",
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
		this.tracks = []
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
		return res.render('alert-spotify', {
			style: 'alert-spotify',
			data: {
				message: 'Помилка',
				info: 'Введіть назву плейлиста',
				link: isMix
					? `/spotify-create?isMix=true`
					: `/spotify-create`,

			},
		})
	}
	const playlist = Playlist.create(name)
	if (isMix) {
		Playlist.makeMix(playlist)
	}
	console.log(playlist);

	// res.render генерує нам HTML сторінку

	// ↙️ cюди вводимо назву файлу з сontainer
	res.render('spotify-playlist', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'spotify-playlist',
		data: {
			playlistId: playlist.id,
			tracks: playlist.tracks,
			name: playlist.name,
		},
	})
})
router.get('/spotify-playlist', function (req, res) {
	// res.render генерує нам HTML сторінку
	const id = Number(req.query.id);
	const playlist = Playlist.getById(id);
	if (!playlist) {
		return res.render('alert-spotify', {
			style: 'alert-spotify',
			data: {
				message: 'Помилка',
				info: 'Такого плейлиста не знайдено',
				link: `/`,
			}
		})
	}
	// ↙️ cюди вводимо назву файлу з сontainer
	res.render('spotify-playlist', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'spotify-playlist',
		data: {
			playlistId: playlist.id,
			tracks: playlist.tracks,
			name: playlist.name,
		}
	})
	// ↑↑ сюди вводимо JSON дані
})
router.get('/spotify-track-add', function (req, res) {
	const playlistId = Number(req.query.playlistId)
	const playlist = Playlist.getById(playlistId)
	const allTracks = Track.getList()

	console.log(playlistId, playlist, allTracks)

	res.render('spotify-track-add', {
		style: 'spotify-track-add',

		data: {
			playlistId: playlist.id,
			tracks: allTracks,
			// link: `/spotify-track-add?playlistId={playlistId}}&trackId=={id}}`,
		},
	})
})

// ================================================================
// Шлях POST для додавання треку до плейліста
router.post('/spotify-track-add', function (req, res) {
	const playlistId = Number(req.body.playlistId)
	const trackId = Number(req.body.trackId)

	const playlist = Playlist.getById(playlistId)

	if (!playlist) {
		return res.render('alert-spotify', {
			style: 'alert-spotify',
			data: {
				message: 'Помилка',
				info: 'Такого плейліста не знайдено',
				link: `/spotify-playlist?id=${playlistId}`,
			},
		})
	}

	const trackToAdd = Track.getList().find(
		(track) => track.id === trackId,
	)

	if (!trackToAdd) {
		return res.render('alert-spotify', {
			style: 'alert-spotify',
			data: {
				message: 'Помилка',
				info: 'Такого треку не знайдено',
				link: `/spotify-track-add?playlistId=${playlistId}`,
			},
		})
	}

	playlist.tracks.push(trackToAdd)

	res.render('spotify-playlist', {
		style: 'spotify-playlist',
		data: {
			playlistId: playlist.id,
			tracks: playlist.tracks,
			name: playlist.name,
		},
	})
})

router.get('/spotify-track-delete', function (req, res) {
	// res.render генерує нам HTML сторінку
	const playlistId = Number(req.query.playlistId);
	const trackId = Number(req.query.trackId);
	const playlist = Playlist.getById(playlistId);
	if (!playlist) {
		return res.render('alert-spotify', {
			style: 'alert-spotify',
			data: {
				message: 'Помилка',
				info: 'Такого плейлиста не знайдено',
				link: `/spotify-playlist?id=${playlistId}`,
			},
		})
	}
	playlist.deleteTrackById(trackId);
	// ↙️ cюди вводимо назву файлу з сontainer
	res.render('spotify-playlist', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'spotify-playlist',
		data: {
			playlistId: playlist.id,
			tracks: playlist.tracks,
			name: playlist.name,
		}
	})
	// ↑↑ сюди вводимо JSON дані
})


router.get('/spotify-search', function (req, res) {
	// res.render генерує нам HTML сторінку
	const value = '';
	const list = Playlist.findListByValue(value);

	res.render('spotify-search', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'spotify-search',
		data: {
			list: list.map(({ tracks, ...rest }) => ({
				...rest,
				amount: tracks.length,
			})
			),
			value,
		},
	})
	// ↑↑ сюди вводимо JSON дані
})

router.post('/spotify-search', function (req, res) {
	// res.render генерує нам HTML сторінку
	const value = req.body.value || '';
	const list = Playlist.findListByValue(value);
	console.log(value);
	res.render('spotify-search', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'spotify-search',
		data: {
			list: list.map(({ tracks, ...rest }) => ({
				...rest,
				amount: tracks.length,
			})
			),
			value,
		},
	})
})




// Підключаємо роутер до бек-енду
module.exports = router
