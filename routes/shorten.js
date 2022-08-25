var express = require('express');
var router = express.Router();
const UrlDB = require('../models/ShortURL');

router.get('/', async (req, res) => {
    res.redirect('/u/404')
})

router.get('/:code', async (req, res) => {
    let code = req.params.code;
    const data = await UrlDB.findOne({
        code: code,
    })
    if (!data) {
        res.redirect('/u/404')
    }
    let redUrl = data.origin;
    res.redirect(redUrl)
})

router.get('/404', async (req, res) => {
    res.render('404')
})

module.exports = router;