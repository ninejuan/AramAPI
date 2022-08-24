const RateLimit = require('express-rate-limit');

module.exports = new RateLimit({
    windowMs: 10 * 1000,
    max: 10,
    handler(req, res) {
        res.status(429).json({
            code: '429',
            message: 'Too many requests. please try again later'
        })
    }
})