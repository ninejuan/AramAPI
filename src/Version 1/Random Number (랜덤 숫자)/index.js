const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: `randomnumber`,
    nickname: `랜덤 숫자`,
    version: `v1`,
    description: `지정된 범위로 랜덤한 숫자를 알려줍니다.`,
    async run(req, res, time) {
        let minimum = req.query.min || 1;
        let maximum = req.query.max;
        let arr = [];
        if (isNaN(maximum)) {
            return res.status(400).json({
                message: "please provide valid maximum number",
                status: 400,
                success: false
            })
        } else if (!maximum) {
            res.status(400).json({
                message: "please provide maximum number",
                status: 400,
                success: false
            })
        }
        for (let i = minimum; i <= maximum; i++) {
            arr.push(i)
        }
        let result = randomItem(arr);
        res.status(200).json({
            status: 200,
            minimum: minimum,
            maximum: maximum,
            result: result,
            success: true
        })
    }
}