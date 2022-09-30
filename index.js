const mongoose = require('mongoose')
const config = require('./data/config.json')

mongoose.connect(`${config.database.test}`)
.then(() => {
    console.log('[Mongo] Connected')
})
.catch((err) => {
    console.log(err)
});

process.on('uncaughtException', function (err) {
    console.log(err)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
  });

const server = require('./app')
server.load();
const apicode = require('./routes/Api Get')
apicode.load();