const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem } = require('../../../Module/function')

module.exports = {
    name: `shorten`,
    nickname: `단축URL`,
    version: `v1`,
    description: `URL을 단축합니다.`,
    async run(req, res, time) {
        let UrlCode = RandCha(7);
        let origin = req.query.url;
        const origindata = await UrlDB.findOne({ origin: origin })
        if (origindata) {
            res.status(200).json({
                message: "successfully registered link",
                status: 200,
                url: `https://aramy.net/${origindata.code}`,
                code: origindata.code,
                original: origin,
                success: true
            })
        } else if (!origindata) {
            if (!origin) {
                res.status(400).json({
                    message: "Please provide the url to shorten.",
                    status: 400,
                    success: false
                })
            } else if (!validUrl.isWebUri(origin)) {
                res.status(400).json({
                    message: "please provide valid url",
                    status: 400,
                    success: false
                })
            } else {
                const data = await UrlDB.findOne({ code: UrlCode })
                if (data) {
                    res.status(500).json({
                        message: "(Server Error) Random Url Code is already in use",
                        status: 500,
                        success: false
                    })
                }
                const newData = new UrlDB({
                    code: UrlCode,
                    origin: origin,
                })
                await newData.save();
                res.status(200).json({
                    message: "successfully registered link",
                    status: 200,
                    url: `https://aramy.net/${UrlCode}`,
                    code: UrlCode,
                    original: origin,
                    success: true
                })
            }
        }
    }
}