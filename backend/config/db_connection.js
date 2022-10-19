const mongoose = require('mongoose');

const db_connection = mongoose.connect('mongodb+srv://blaisembambo:abcdabcd@cluster0.losrzdm.mongodb.net/chat_app_db?retryWrites=true&w=majority', err => {
    if(err){
        throw err
    }
    console.log('connected to the data base successfully')
})

module.exports = mongoose;