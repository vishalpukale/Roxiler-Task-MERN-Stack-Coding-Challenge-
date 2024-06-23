const mongoose = require('mongoose');

//local mongodb schema 
const mongoURI = "mongodb://localhost:27017";

const mongoConnect = () => {
    
    mongoose.connect(mongoURI)

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    })

    mongoose.connection.on('error', (err) => {
        console.log('Error while connecting to MongoDB:', err);
    })
}

module.exports = mongoConnect;