require("dotenv").config();
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

const path = require('path');


const app = express();

const db = process.env.DATABASE

mongoose.connect(db);

//log requests
app.use(morgan('tiny'));



//parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

//set view engine
app.set("view engine", "ejs")


//load assets
app.use(express.static("public"));

//load routers
app.use('/', require('./server/routes/router'))
 
//port
const PORT = process.env.PORT

app.listen(PORT, function(){
    console.log("success")
});