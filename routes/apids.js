var express = require('express');
var router = express.Router();
const uuidAPIKey = require('uuid-apikey');
const passport = require('passport');
const apiLimiter = require('../middleware/apiLimiter');
const fetch = require('node-fetch');
const hanspell = require('hanspell');
const validUrl = require('valid-url');
const kpop = require('kpop');

const Inko = require('inko');
const inko = new Inko();

const UrlDB = require('../models/ShortURL')

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

function randomItem(a) {
	return a[Math.floor(Math.random() * a.length)];
}

const checkAuth = (req, res, next) => {
	if (!req.session.passport) {
    res.redirect('/login')
  } else {
    return next()
  }
}

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

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
    "code": `${cptcode}`,
	"success": "true"
	})
})

router.get('/grammar', apiLimiter, async (req, res) => {
	let str = req.query.string;
	if (str.length <= 0 || !str) {
		res.status(400).json({
			"message": "please provide query value",
			"status": "400",
			"success": "false"
		})
	}
	if (str.length >= 250) {
		res.status(400).json({
			"message": "query value too large",
			"status": "400",
			"success": "false"
		})
	}
	const end = function () {
		
	}
	const error = function (err) {
			return res.status(500).json({
				"message": "server error",
				"status": "500",
				"success": "false"
			})
	}
	const check = function (chk) {
		if (chk.length <= 0){
				res.status(200).json({
					"message": "there is nothing wrong",
					"license": "hanspell module used https://www.npmjs.com/package/hanspell",
					"status": "200",
					"original": `${str}`,
					"errnum": '0',
					"success": "true"
			})
		}else{
			chk.forEach((elem, index) => {
				res.status(200).json({
					"message": `There are ${chk.length} wrong parts.`,
					"license": "hanspell module used https://www.npmjs.com/package/hanspell",
					"status": "200",
					"original": `${str}`,
					"errnum": `${chk.length}`,
					"wrong": `${elem.token}`,
					"suggestions": `${elem.suggestions}`,
					"more": `${elem.info}`,
					"success": "true"
				})
			})
		}
	}
	hanspell.spellCheckByDAUM(str, 6000, check, end, error)
})

router.get('/shorten', apiLimiter, async (req, res) => {
	let UrlCode = RandCha(7);
	let origin = req.query.url;
	const origindata = await UrlDB.findOne({ origin: origin })
	if (origindata) {
		res.status(200).json({
			"message": "successfully registered link",
			"status": "200",
			"url": `${require('../data/config.json').Web.url}/${origindata.code}`,
			"code": `${origindata.code}`,
			"original": `${origin}`,
			"success": "true"
		})
	} else if (!origindata) {
		if (!origin) {
			res.status(400).json({
				"message": "Please provide the url to shorten.",
				"status": "400",
				"success": "false"
			})
		}
		if (!validUrl.isUri(origin)) {
			res.status(400).json({
				"message": "please provide valid url",
				"status": "400",
				"success": "false"
			})
		}
		const data = await UrlDB.findOne({ code: UrlCode })
		if (data) {
			res.status(500).json({
				"message": "(Server Error) Random Url Code is already in use",
				"status": "500",
				"success": "false"
			})
		}
		const newData = new UrlDB({
			code: UrlCode,
			origin: origin,
		})
		newData.save();
		res.status(200).json({
			"message": "successfully registered link",
			"status": "200",
			"url": `${require('../data/config.json').Web.url}/${UrlCode}`,
			"code": `${UrlCode}`,
			"original": `${origin}`,
			"success": "true"
		})
	}
});

router.get('/randomnumber', apiLimiter, async (req, res) => {
	let minimum = req.query.min || 1;
	let maximum = req.query.max;
	let arr = [];
	if (isNaN(maximum)) {
		return res.status(400).json({
			"message": "please provide valid maximum number",
			"status": "400",
			"success": "false"
		})
	} else if (!maximum) {
		res.status(400).json({
			"message": "please provide maximum number",
			"status": "400",
			"success": "false"
		})
	}
	for (let i = minimum; i <= maximum; i++) {
		arr.push(i)
	}
	let result = randomItem(arr);
	res.status(200).json({
		"status": "200",
		"minimum": `${minimum}`,
		"maximum":  `${maximum}`,
		"result": `${result}`,
		"success": "true"
	})
});

router.get('/reverse', apiLimiter, async (req, res) => {
	let text = req.query.text;
	if (!text) {
		res.status(400).json({
			"message": "Please provide the text to be reversed",
			"status": "400",
			"success": "false"
		})
	}
	let rev = text.split("").reverse().join("");
	res.status(200).json({
		"status": "200",
		"original": `${text}`,
		"result": `${rev}`,
		"success": "true"
	})
});

router.get('/hangulify', apiLimiter, async (req, res) => {
	let text = req.query.text;
	if (!text) {
		res.status(400).json({
			"message": "Please provide the text to be hangulified",
			"status": "400",
			"success": "false"
		})
	}
	res.status(200).json({
		"license": "kpop module used https://www.npmjs.com/package/kpop",
		"status": "200",
		"original": `${text}`,
		"result": `${kpop.hangulify(text)}`,
		"success": "true"
	})
});

router.get('/romanize', apiLimiter, async (req, res) => {
	let text = req.query.text;
	if (!text) {
		res.status(400).json({
			"message": "Please provide the text to be romanized",
			"status": "400",
			"success": "false"
		})
	}
	res.status(200).json({
		"license": "kpop module used https://www.npmjs.com/package/kpop",
		"status": "200",
		"original": `${text}`,
		"result": `${kpop.romanize(text)}`,
		"success": "true"
	})
});

router.get('/en2ko', apiLimiter, async (req, res) => {
	let text = req.query.text;
	if (!text) {
		res.status(400).json({
			"message": "Please provide the text to change to Korean typing",
			"status": "400",
			"success": "false"
		});
	}
	res.status(200).json({
		"license": "inko module used https://www.npmjs.com/package/inko",
		"status": "200",
		"origin": `${text}`,
		"result": `${inko.en2ko(`${text}`)}`,
		"success": "true"
	});
});

router.get('/ko2en', apiLimiter, async (req, res) => {
	let text = req.query.text;
	if (!text) {
		res.status(400).json({
			"message": "Please provide the text to change to English typing",
			"status": "400",
			"success": "false"
		});
	}
	res.status(200).json({
		"license": "inko module used https://www.npmjs.com/package/inko",
		"status": "200",
		"origin": `${text}`,
		"result": `${inko.ko2en(`${text}`)}`,
		"success": "true"
	});
});

router.get('/ahmola', apiLimiter, async (req, res) => {
	
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
