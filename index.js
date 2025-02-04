const mongoose = require('mongoose');
const express = require('express');
const user = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const config = require('config');

app.use(express.json());
app.use('/api/users', user);
app.use('/api/auth', auth);


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR : jwt not defined');
    process.exit(1); // anything other then 0 is failure
}




mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(err.message));


const port = process.env.PORT || 3000;
app.listen(port, `listening on port ${port}...`);


