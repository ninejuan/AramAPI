const router = require('../routes/index')
const { readFile } = require('fs')
const fs = require('fs')
const serveStatic = require('serve-static');
const apiLimiter = require('../middleware/apiLimiter');
const bodyParser = require('body-parser');
const path = require('path');
const uuidAPIKey = require('uuid-apikey');
const passport = require('passport');
const fetch = require('node-fetch');
const hanspell = require('hanspell');
const validUrl = require('valid-url');
const kpop = require('kpop');
const Inko = require('inko');
const inko = new Inko();
const lyricsFinder = require('lyrics-finder')
const UrlDB = require('../models/ShortURL')
const crypto = require('crypto')

module.exports.router = router;
module.exports.readFile = readFile;
module.exports.fs = fs;
module.exports.serveStatic = serveStatic;
module.exports.apiLimiter = apiLimiter;
module.exports.bodyParser = bodyParser;
module.exports.path = path;
module.exports.uuidAPIKey = uuidAPIKey;
module.exports.passport = passport;
module.exports.fetch = fetch;
module.exports.hanspell = hanspell;
module.exports.validUrl = validUrl;
module.exports.kpop = kpop;
module.exports.inko = inko;
module.exports.lyricsFinder = lyricsFinder;
module.exports.UrlDB = UrlDB;
module.exports.crypto = crypto;