const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const db = require('./util/database');

const app = express();

const userRoutes = require('./routes/user-routes');
const formRoutes = require('./routes/form-routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRoutes);
app.use(formRoutes);

//app.use(errorController.get404);

app.listen(3000,()=> {
    console.log('application is running on 3000 port');
});

