const express = require('express');
const port = 9000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const cors = require('cors')
require('./config/passport')(passport);
const corsOption = ({
    origin: "http://localhost:3000"
})
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors(corsOption))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        console.log('MongoDB successfully connected.')
    ).catch(err => console.log(err));

app.use(passport.initialize());

app.use('/api', users);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
