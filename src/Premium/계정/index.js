const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB, lyricsFinder, account } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem, RandomPw } = require('../../../Module/function')

module.exports = {
    name: `account`,
    nickname: `아람이 계정 정보를 인증합니다.`,
    version: `pr`,
    description: ``,
    async run(req, res, time) {
        res.status(100).json({
            status: 100,
            success: false
        })
    }
}