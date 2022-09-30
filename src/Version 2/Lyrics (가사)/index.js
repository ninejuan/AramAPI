const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB, lyricsFinder } = require('../../../Module/index')
const { checkAuth, checkKey, hex2, RandCha, randomItem, RandomPw } = require('../../../Module/function')

module.exports = {
    name: `lyrics`,
    nickname: `가사 검색`,
    version: `v2`,
    description: `노래의 가사를 가져옵니다.`,
    async run(req, res, time) {
        let query = req.query;
        if (!query.singer || !query.name) {
            res.status(400).json({
                status: 400,
                success: false,
                message: 'please provide valid query'
            })
        }
        let resp = await lyricsFinder(query.singer, query.name) || "검색 결과가 존재하지 않아요"
        res.status(200).json({
            status: 200,
            success: true,
            lyrics: resp,
            message: 'lyrics returned'
        })
    }
}