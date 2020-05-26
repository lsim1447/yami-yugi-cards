const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

require('dotenv').config;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'react-client/build')));

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname + '/react-client/build/index.html'));
});

app.get('/all-cards', (req, res) => {
  res.sendFile(path.join(__dirname + '/react-client/build/index.html'));
});

app.get('/my-deck', (req, res) => {
  res.sendFile(path.join(__dirname + '/react-client/build/index.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname + '/react-client/build/index.html'));
});

app.use(express.json());

const uri = 'mongodb+srv://slazar:Cantdothat1@cluster0-tgala.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection estabilished successfully!');
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/api/users', usersRouter);
app.use('/api/cards', cardsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});