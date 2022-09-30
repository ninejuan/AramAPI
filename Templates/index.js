const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: ``,
    nickname: ``,
    version: `v`,
    description: ``,
    async run(req, res, time) {
        res.status(100).json({
            status: 100,
            success: false
        })
    }
}