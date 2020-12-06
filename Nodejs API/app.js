const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const db = require('./util/database');

const app = express();

//routes
const userRoutes = require('./routes/user-routes');
const formRoutes = require('./routes/form-routes');

//Cross-origin resource sharing
app.use(cors());

//Body Parser for parsing request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(userRoutes);
app.use(formRoutes);

// start application server
app.listen(3000,()=> {
    console.log('application is running on 3000 port');
});

