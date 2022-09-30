const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: `msdate`,
    nickname: `날짜변환`,
    version: `v2`,
    description: `밀리세컨드를 날짜로 변환합니다`,
    async run(req, res, time) {
        res.status(100).json({
            status: 100,
            success: false
        })
    }
}