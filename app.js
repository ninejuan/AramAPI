var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

const bodyParser = require('body-parser');

const config = require('./data/config.json')

// Router
var indexRouter = require('./routes/index');
// var ApiRouter = require('./routes/api');
var AuthRouter = require('./routes/login');
// var ShortUrlRouter = require('./routes/shorten');

// passport
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const LocalStrategy = require('passport-local').Strategy;

var app = express();
module.exports.load = async => {
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(session({ secret: "asdlfj;lasdfj;" }))
  app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

  // Routers
  app.use('/', indexRouter);
  // app.use('/', ApiRouter);
  app.use('/login', AuthRouter);
  // app.use('/u', ShortUrlRouter);

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // passport settings

  // Github Authorization
  passport.use(new GitHubStrategy({
    clientID: config.Auth.Github.ClientId,
    clientSecret: config.Auth.Github.ClientSecret,
    callbackURL: config.Auth.Github.RedirectUrl
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    process.nextTick(async function() {
      const find = await UserDB.findOne({ Id: profile.id })
      if (!find) {
        const newData = new UserDB({
          Id: profile.id,
          provider: profile.provider,
        })
        newData.save();
        return cb(null, profile)
      } else {
        return cb(null, profile)
      }
    })
  }
  ));

  // Google Authorization
  passport.use(new GoogleStrategy({
    clientID: config.Auth.Google.ClientId,
    clientSecret: config.Auth.Google.ClientSecret,
    callbackURL: config.Auth.Google.RedirectUrl,
    scope: ['email', 'profile', 'openid' ]
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('passport app.js google authorization')
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    process.nextTick(async function() {
      const find = await UserDB.findOne({ Id: profile.id })
      if (!find) {
        const newData = new UserDB({
          Id: profile.id,
          provider: profile.provider,
        })
        newData.save();
        return cb(null, profile)
      } else {
        return cb(null, profile)
      }
    })
  }
  ));

  // Kakao Authorization
  passport.use(new KakaoStrategy({
    clientID : config.Auth.Kakao.RestKey,
    clientSecret: config.Auth.Kakao.ClientSecret, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
    callbackURL : config.Auth.Kakao.RedirectUrl
  },
  (accessToken, refreshToken, profile, done) => {
    // 사용자의 정보는 profile에 들어있다.
    // User.findOrCreate(... (err, user) => {
    //   if (err) { return done(err) }
    //   return done(null, user)
    // })
    process.nextTick(async function() {
      const find = await UserDB.findOne({ Id: profile.id })
      if (!find) {
        const newData = new UserDB({
          Id: profile.id,
          provider: profile.provider,
        })
        newData.save();
        return done(null, profile)
      } else {
        return done(null, profile)
      }
    })
  }
  ))

  // Naver Authorization
  passport.use(new NaverStrategy({
    clientID: config.Auth.Naver.ClientId,
    clientSecret: config.Auth.Naver.ClientSecret,
    callbackURL: config.Auth.Naver.RedirectUrl
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOne({
    //     'naver.id': profile.id
    // }, function(err, user) {
    //     if (!user) {
    //         user = new User({
    //             name: profile.displayName,
    //             email: profile.emails[0].value,
    //             username: profile.displayName,
    //             provider: 'naver',
    //             naver: profile._json
    //         });
    //         user.save(function(err) {
    //             if (err) console.log(err);
    //             return done(err, user);
    //         });
    //     } else {
    //         return done(err, user);
    //     }
    // });
    process.nextTick(async function() {
      const find = await UserDB.findOne({ Id: profile.id })
      if (!find) {
        const newData = new UserDB({
          Id: profile.id,
          provider: profile.provider,
        })
        newData.save();
        return done(null, profile)
      } else {
        return done(null, profile)
      }
    })
  }
  ));

  // Discord Authorization
  passport.use(new DiscordStrategy({
    clientID: config.Auth.Discord.ClientId,
    clientSecret: config.Auth.Discord.ClientSecret,
    callbackURL: config.Auth.Discord.RedirectUrl,
    scope: [ 'identify', 'guilds', 'guilds.join' ]
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ discordId: profile.id }, function(err, user) {
    //     return cb(err, user);
    // });
    process.nextTick(async function() {
      const find = await UserDB.findOne({ Id: profile.id })
      if (!find) {
        const newData = new UserDB({
          Id: profile.id,
          provider: profile.provider,
        })
        newData.save();
        return cb(null, profile)
      } else {
        return cb(null, profile)
      }
    })
  }));

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  app.listen(config.Web.PORT, () => {
    console.log(`website on ${config.Web.PORT}`)
  })

  // module.exports = app;
}