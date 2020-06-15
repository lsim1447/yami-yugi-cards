const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'react-client/build')));

app.use(/^\/(?!api).*/, function(req, res) {
    res.sendFile(path.join(__dirname + '/react-client/build/index.html'));
});

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection estabilished successfully!');
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const commentsRouter = require('./routes/comments');
const ordersRouter = require('./routes/orders');

app.use('/api/users', usersRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/orders', ordersRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});