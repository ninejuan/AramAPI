// // let str = 'hiyeom'
// // console.log(str)
// const crypto = require('crypto')
// const algorithm = 'aes-256-cbc';
// let text = 'Hello World!'; // 암호화 할 문구
// const key = crypto.scryptSync('123123','specialSalt', 32); // 나만의 암호화키. password, salt, byte 순인데 password와 salt는 본인이 원하는 문구로~ 
// const iv = crypto.randomBytes(16); //초기화 벡터. 더 강력한 암호화를 위해 사용. 랜덤값이 좋음

// const cipher = crypto.createCipheriv(algorithm, key, iv); //key는 32바이트, iv는 16바이트
// let result = cipher.update(text, 'utf8', 'base64');
// result += cipher.final('base64');
// console.log('암호화: ', result);

// const deciper = crypto.createDecipheriv(algorithm, key, iv);
// let result2 = deciper.update(result, 'base64', 'utf8');
// result2 += deciper.final('utf8');
// console.log('복호화: ', result2);
let str = 'hihi'
let estr = Buffer.from(str, 'utf-8').toString()
console.log(estr)