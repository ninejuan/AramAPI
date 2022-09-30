const { client, app, readFile, fs, serveStatic, apiLimiter, bodyParser, path, uuidAPIKey, passport, fetch, hanspell, validUrl, kpop, inko, UrlDB, allwebhook, crypto } = require('./index')
const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(require('../data/config.json').key.encrypt, require('../data/config.json').key.decrypt, 32);
const iv = crypto.randomBytes(16);

const checkAuth = (req, res, next) => {
    if (!req.session.passport) {
        res.redirect('/login')
    } else {
        return next()
    }
}
async function checkKey(key) {
    console.log('function called')
    const data = await UserDB.findOne({
        ApiKey: key,
    })
    if (data) {
        console.log('data true')
        let check = uuidAPIKey.check(`${key}`, `${data.ApiUUID}`)
        let isKey = uuidAPIKey.isAPIKey(`${key}`)
        if (isKey || check) {
            console.log('data true iskey or check true')
            return true;
        } else {
            console.log('data true iskey or check false')
            return false;
        }
    } else {
        console.log('data false')
        return false;
    }
}
function hex2() {
    var result = '';
    var strs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var strslenth = strs.length;
    for (var i = 0; i < 10; i++) {
        result += strs.charAt(Math.floor(Math.random() * strslenth));
    }
    return result;
}
function RandCha(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
function randomItem(a) {
    return a[Math.floor(Math.random() * a.length)];
}
function RandomPw(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()-_=+:/?!@#?*&^%%';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
function encrypt(str) {
    const cipher = crypto.createCipheriv(algorithm, key, iv); //key는 32바이트, iv는 16바이트
    let result = cipher.update(str, 'utf8', 'base64');
    result += cipher.final('base64');
    return result;  
}
function decrypt(str) {
    const deciper = crypto.createDecipheriv(algorithm, key, iv);
    let result = deciper.update(str, 'base64', 'utf8');
    result += deciper.final('utf8');
    return result;
}
module.exports.checkAuth = checkAuth;
module.exports.checkKey = checkKey;
module.exports.hex2 = hex2;
module.exports.RandCha = RandCha;
module.exports.randomItem = randomItem;
module.exports.RandomPw = RandomPw;
module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;