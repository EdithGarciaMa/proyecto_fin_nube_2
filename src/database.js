const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo/mydatabase'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifieldTopology: true,
    useFindAndModify: false
}
    .then(db => console.log('Db is connected to', db.connection.host))
    .catch(err => console.error(err));
    
