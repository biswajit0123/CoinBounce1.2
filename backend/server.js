const express = require('express');
const dotenv = require('dotenv').config();
const  PORT = process.env.PORT;
// the above is for secure port number

const dbconnect = require('./database/index');
//Afor routing import
const router = require('./routes/index');
//use of error handeler
const errorhandeler = require('./middlewire/erroehandeler') 
//cokkie
const cookieParser = require('cookie-parser')


const app = express();

app.use(cookieParser());

 


app.use(express.json());
 //its cuz our app will be able communicate , receive and send json data

//Bthen use
app.use(router);

dbconnect();
//1 to host ur image staticaly from broswer
app.use('/storage',express.static('storage'))

app.use(errorhandeler);//use this at the end 
 app.listen(PORT, console.log(`server is running ${PORT}`));