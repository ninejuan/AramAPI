var express = require('express');
var router = express.Router();
const uuidAPIKey = require('uuid-apikey');
const passport = require('passport');
const UserDB = require('../models/user')

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

router.post('/:key/test', async (req, res) => {
  let apikey = req.params.key;
  if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
    res.status(403).json({
      "test": 'fail',
      "reason": "api key is invaild. please provide vaild key."
    })
  } else {
    res.status(200).json({
      "test": "successful"
    })
  }
})

router.get('/getKey', checkAuth, async (req, res) => {
  let newkey = uuidAPIKey.create();
  const data = await UserDB.findOne({
    Id: req.session.passport.user.id,
  })
  if (data) {
    console.log('found')
  } else if (!data) {
    console.log('404')
  }
  res.send()
})
module.exports = router;
