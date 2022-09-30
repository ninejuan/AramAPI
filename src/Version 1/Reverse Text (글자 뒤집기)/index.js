const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: `reverse`,
    nickname: `글자 뒤집기`,
    version: `v1`,
    description: `입력된 글자를 뒤집습니다.`,
    async run(req, res, time) {
        let text = req.query.text;
        if (!text) {
            res.status(400).json({
                message: "Please provide the text to be reversed",
                status: 400,
                success: false
            })
        }
        let rev = text.split("").reverse().join("");
        res.status(200).json({
            status: 200,
            original: text,
            result: rev,
            success: true
        })
    }
}