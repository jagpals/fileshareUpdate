const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
const port = process.env.PORT || 3000;

const connectDB=require('./config/db');
connectDB();

app.use(cors());
app.use(express.static('public'));
// template engine
app.use(express.json());
app.set('views', path.join(__dirname,'/views'));
app.set('view engine','ejs');
//routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));

app.use('/files/download', require('./routes/download'));
app.listen(port, ()=>{
    console.log(`listening port ${port}`);
})