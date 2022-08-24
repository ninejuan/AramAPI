var express = require('express');
var router = express.Router();
const uuidAPIKey = require('uuid-apikey');
const passport = require('passport');
const apiLimiter = require('../middleware/apiLimiter');
const fetch = require('node-fetch');
const hanspell = require('hanspell');

async function checkKey(key) {  
  console.log('function called')
  const data = await UserDB.findOne({
    ApiKey: key,
  })
  if (data) {
    console.log('data true')
    let check = uuidAPIKey.check(`${key}`, `${data.ApiUUID}`)
    let isKey = uuidAPIKey.isAPIKey(`${key}`)
    if (isKey || check) {
      console.log('data true iskey or check true')
      return true;
    } else {
      console.log('data true iskey or check false')
      return false;
    }
  } else {
    console.log('data false')
    return false;
  }
}

function RandCha(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
const checkAuth = (req, res, next) => {
	if (!req.session.passport) {
    res.redirect('/login')
  } else {
    return next()
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', apiLimiter, async (req, res) => {
  res.status(200).json({
    "test": "successful"
  })
});

router.get('/captcha', apiLimiter, async (req, res) => {
  let cptcode = RandCha(6)
  res.status(200).json({
		"message": "captcha image and code was returned",
    "status": "200",
    "url": `https://dummyimage.com/2000x500/ffffff/33363c&text=${cptcode}`,
    "code": `${cptcode}`
	})
})

router.get('/grammar', apiLimiter, async (req, res) => {
	let str = req.query.string;
	if (str.length <= 0 || !str) {
		res.status(400).json({
			"message": "please provide query value",
			"status": "400"
		})
	}
	if (str.length >= 250) {
		res.status(400).json({
			"message": "query value too large",
			"status": "400"
		})
	}
	const end = function () {
		
	}
	const error = function (err) {
			return res.status(500).json({
				"message": "server error",
				"status": "500"
			})
	}
	const check = function (chk) {
		if (chk.length <= 0){
				res.status(200).json({
					"message": "there is nothing wrong",
					"status": "200",
					"original": `${str}`,
					"errnum": '0'
			})
		}else{
			chk.forEach((elem, index) => {
				res.status(200).json({
					"message": `There are ${chk.length} wrong parts.`,
					"status": "200",
					"original": `${str}`,
					"errnum": `${chk.length}`,
					"wrong": `${elem.token}`,
					"suggestions": `${elem.suggestions}`,
					"more": `${elem.info}`
				})
			})
		}
	}
	hanspell.spellCheckByDAUM(str, 6000, check, end, error)
})

router.get('/github/:username', apiLimiter, async (req, res) => {
  const username = req.params.username;
	let data;
	await fetch(`https://api.github.com/users/${username}`).then(x => console.log(x.json))
	.catch((err) => {
		res.status(404).json({
			"message": "user not found",
			"status": "404"
		})
	})
})

module.exports = router;
