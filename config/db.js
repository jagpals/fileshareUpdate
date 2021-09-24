  
require('dotenv').config();
const mongoose = require('mongoose');
function connectDB() {
    mongoose.connect(process.env.MONGO_CONNECTION_URL, 
        { useNewUrlParser: true, 
            useCreateIndex:true, 
            useUnifiedTopology: true, 
            useFindAndModify : true 
        })
        .then(res => console.log("Database Connected"))
        .catch(err => console.log(err))
    
    mongoose.connection.on('error', err => {
        console.error(err);
      });
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;