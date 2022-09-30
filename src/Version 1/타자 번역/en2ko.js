const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: `en2ko`,
    nickname: `한타`,
    version: `v1`,
    description: `영어를 한국어로 번역합니다.`,
    async run(req, res, time) {
        let text = req.query.text;
        if (!text) {
            res.status(400).json({
                message: "Please provide the text to change to Korean typing",
                status: 400,
                success: false
            });
        }
        res.status(200).json({
            license: "inko module used https://www.npmjs.com/package/inko",
            status: 200,
            origin: text,
            result: inko.en2ko(`${text}`),
            success: true
        });
    }
}