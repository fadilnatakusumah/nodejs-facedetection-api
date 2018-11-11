const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Controllers 
const signIn = require('./Controllers/SigninController');
const register = require('./Controllers/RegisterController');
const profile = require('./Controllers/ProfileController');
const image = require('./Controllers/ImageController');

const knex = require('knex');
// to connect to database postgresql
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '12345',
      database : 'smartbrain'
    }
  });


const database = {
    users: [
        {
            id: 1,
            name: 'Fadil Natakusumah',
            email: 'fadil.ntksmh@gmail.com',
            password: 'bismillah',
            entries: 0,
            joined: new Date()
        },
        {
            id: 2,
            name: 'Muhammad',
            email: 'muhammad@gmail.com',
            password: 'bismillah',
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: 1
        }
    ]
};

// THE ROUTES
// /signin (POST), return success/fail => for signin user
// /register (POST), return user => for register user ofcourse
// /profile:id (GET), return user => to get user profile
// /image (PUT), return user  => to put or update entries

app.get('/', (req, res) => res.json(database.users));

// FIRST STYLE FUNCTION
// for signin 
app.post('/signin', (req,res) => {signIn.handleSignin(db, bcrypt, req, res)});

// SECOND STYLE FUNCTION
// for register
app.post('/register', register.handleRegister(db, bcrypt));

// for getting users
app.get('/profile/:id', profile.getProfile(db));

// for updating entries
app.put('/image', image.handleImage(db));

// for sending from clieat to server entries
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});



app.listen(process.env.PORT || 3000, () => {
    console.log(`App running in port ${process.env.PORT}`);
});

