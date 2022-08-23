var express = require('express');
var router = express.Router();

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
})
module.exports = router;
