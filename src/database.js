/*const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo/notesdb', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('Db is connected '))
    .catch(err => console.error(err));*/


const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/notesdb')
    .then(db => console.log('BASE DE DATOS CONECTADA', db.connection.host))
    .catch(err => console.error(err));