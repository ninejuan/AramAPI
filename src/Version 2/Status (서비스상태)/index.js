const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: `status`,
    nickname: `상태`,
    version: `v2`,
    description: `서비스의 상태를 반환합니다`,
    async run(req, res, time) {
        res.status(200).json({
            status: 100,
            success: false
        })
    }
}