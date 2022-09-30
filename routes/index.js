var express = require('express');
var router = express.Router();
const UrlDB = require('../models/ShortURL');
const axios = require('axios').default;

let Callback_RedirectUri;
const checkAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
        return next()
    }
	console.log(req.session)
	Callback_RedirectUri = req.url
	res.redirect('/login')
}

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session)
	res.render('index', {
    	passport: req.session.passport,
  	});
});

// 로그아웃
router.get('/logout', async (req, res) => {
  	req.logOut();
  	req.session.save(err => {
    	if (err) throw err;
		res.redirect('/')
  	})
});

// 서비스

// 단축URL
router.get('/shorturl', async (req, res) => {
	res.render('api/shorten', {
		set: null,
	})
});
router.post('/shorturl', async (req, res) => {

});
// 가사
router.get('/lyrics', async (req, res) => {
	if (!req.query.singer || !req.query.name) {
		res.render('api/lyrics', {
			lyrics: null,
		})
	} else {
		const lf = require('lyrics-finder')
		let Ldata = await lf(req.query.singer, req.query.name) || "검색 결과가 존재하지 않아요"
		let data = `${Ldata}`.split('\n').join(`<br>`)
		res.render('api/lyrics', {
			lyrics: data,
			query: req.query
		})
	}
});

// router.get('/:code', async (req, res) => {
//   let code = req.params.code;
//   const data = await UrlDB.findOne({
//       code: code,
//   })
//   if (data) {
//       let redUrl = data.origin;
//       res.redirect(redUrl)
//   }
// });

module.exports = router;
