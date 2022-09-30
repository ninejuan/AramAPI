const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: `hangulify`,
    nickname: `발음번역`,
    version: `v1`,
    description: `해당 단어의 발음을 번역합니다.`,
    async run(req, res, time) {
        let text = req.query.text;
        if (!text) {
            res.status(400).json({
                message: "Please provide the text to be hangulified",
                status: 400,
                success: false
            })
        }
        res.status(200).json({
            license: "kpop module used https://www.npmjs.com/package/kpop",
            status: 200,
            original: text,
            result: kpop.hangulify(text),
            success: true
        })
    }
}