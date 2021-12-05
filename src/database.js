const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo/notesdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
//    useUnifieldTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('Db is connected to', db.connection.host))
    .catch(err => console.error(err));


//import mongoose from "mongoose";
//import config from "./config";
    
//    (async () => {
//      try {
//        const db = await mongoose.connect(config.MONGODB_URI, {
//          useNewUrlParser: true,
//          useUnifiedTopology: true,
//          useFindAndModify: false,
//          useCreateIndex: true,
//        });
//        console.log("Mongodb is connected to", db.connection.host);
//      } catch (error) {
//        console.error(error);
//      }
//    })();
    
