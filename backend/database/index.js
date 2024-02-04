const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const dbconnect = async () => {

    try {
        mongoose.set('strictQuery', false);
        console.log(`starting connection`);

   const conn =  await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log(`succesfuly connected`);
    } catch (error) {
        console.log(`Error:${error}`);
    }
}

module.exports = dbconnect;