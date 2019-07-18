const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const signout = require('./controllers/signout');
const profile = require('./controllers/profile');
const account = require('./controllers/account');
const image = require('./controllers/image');
const leaderboard = require('./controllers/leaderboard');
const auth = require('./controllers/authorization');

//Database Setup
const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

const app = express();

const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(morgan('combined'));
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send("ITS WORKING") })
app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.post('/signout', auth.requireAuth, (req, res) => { signout.handleSignOut(req, res)})
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)})
app.put('/account', auth.requireAuth, (req, res) => { account.handlePasswordChange(req, res, db, bcrypt)}) 
app.delete('/account', auth.requireAuth, (req, res) => { account.deleteAccount(req, res, db)})
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res)})
app.get('/leaderboard', auth.requireAuth, (req, res) => { leaderboard.getLeaderboard(req, res, db)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
})
