var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', async function (req, res) {
    if (req.session.passport) {
        res.render('auth/already_auth')
    } else {
        res.render('auth/login')
    }
})

router.get('/google', passport.authenticate('google', { failureRedirect: '/' }), async function (req, res) {
    if (!req.user) {
        res.redirect('/')
    } else {
        res.redirect('/')
    }
})

router.get('/github', passport.authenticate('github', { failureRedirect: '/' }), async function (req, res) {
    if (!req.user) {
        res.redirect('/')
    } else {
        res.redirect('/')
    }
})

router.get('/kakao', passport.authenticate('kakao', { failureRedirect: '/' }), async function (req, res) {
    if (!req.user) {
        res.redirect('/')
    } else {
        res.redirect('/')
    }
})

router.get('/naver', passport.authenticate('naver', { failureRedirect: '/' }), async function (req, res) {
    if (!req.user) {
        res.redirect('/')
    } else {
        res.redirect('/')
    }
})

router.get('/discord', passport.authenticate('discord', { failureRedirect: '/' }), async function (req, res) {
    if (!req.user) {
        res.redirect('/')
    } else {
        res.redirect('/')
    }
})

router.post('/id', passport.authenticate('local', { failureRedirect: '/login' }), async function (req, res) {
    if (!req.user) {
        console.log(req)
    console.log('=' * 10)
    console.log(res)
        res.redirect('/')
    } else {
        console.log(req)
    console.log('=' * 10)
    console.log(res)
        res.redirect('/')
    }
    console.log(req)
    console.log('=' * 10)
    console.log(res)
})


module.exports = router;