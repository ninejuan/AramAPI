const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: `captcha`,
    nickname: `캡챠인증`,
    version: `v1`,
    description: `6자리 랜덤 코드를 발급한다(이미지 포함)`,
    async run(req, res, time) {
        let cptcode = RandCha(6)
        res.status(200).json({
            message: "captcha image and code was returned",
            status: 200,
            url: `https://dummyimage.com/2000x500/ffffff/33363c&text=${cptcode}`,
            code: cptcode,
            success: true
        })
    }
}