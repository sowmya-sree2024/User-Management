const express = require('express');
const { connectDb } = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const UserRoute = require('./routes/user');

const port = 3000;

app.use(cors());
app.use(bodyParser.json());  

app.use('/user', UserRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(port, () => {
    console.log("Server running on port number", port);
});

connectDb();
