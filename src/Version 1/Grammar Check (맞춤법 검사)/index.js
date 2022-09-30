const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: `grammar`,
    nickname: `맞춤법검사`,
    version: `v1`,
    description: `글자에 맞춤법을 검사합니다.`,
    async run(req, res, time) {
        let str = req.query.string;
        if (!str) {
            res.status(400).json({
                message: "please provide query value",
                status: 400,
                success: false
            })
        } else if (str.length <= 0 || !str) {
            res.status(400).json({
                message: "please provide query value",
                status: 400,
                success: false
            })
        } else if (str.length >= 250) {
            res.status(400).json({
                message: "query value too large",
                status: 400,
                success: false
            })
        } else {
            const end = function () {
            }
            const error = function (err) {
                return res.status(500).json({
                    message: "server error",
                    status: 500,
                    success: false
                })
            }
            const check = function (chk) {
                if (chk.length <= 0) {
                    res.status(200).json({
                        message: "there is nothing wrong",
                        license: "hanspell module used https://www.npmjs.com/package/hanspell",
                        status: 200,
                        original: str,
                        errnum: 0,
                        success: true
                    })
                } else {
                    chk.forEach((elem, index) => {
                        res.status(200).json({
                            message: `There are ${chk.length} wrong parts.`,
                            license: "hanspell module used https://www.npmjs.com/package/hanspell",
                            status: 200,
                            original: str,
                            errnum: chk.length,
                            wrong: elem.token,
                            suggestions: elem.suggestions,
                            more: elem.info,
                            success: true
                        })
                    })
                }
            }
            hanspell.spellCheckByDAUM(str, 6000, check, end, error)
        }
    }
}