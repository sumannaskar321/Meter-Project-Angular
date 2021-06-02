const express = require('express');



var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const my_mongoose = require('./db.js');

var meterService = require('./services/meterAPI.js');

app.get('/',(req,res)=>{
    res.send('server working');
})
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with,multipart/form-data");
    next(); // Important
})

app.use('/meter',meterService);

const cors = require('cors');

app.use(cors());
//app.use(cors({ origin: 'http://localhost:4200' }));


var port  = process.env.PORT || 4500;
app.listen(port,()=>{console.log(`Server at : ${port}`)});