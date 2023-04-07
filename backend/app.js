const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const connectdatabase = require('./connectdb.js');

connectdatabase()

const app=express()

app.use(express.json())
app.use(cors())

app.listen(4000,() => {
    console.log("listening");
});

// app.get('/', (req, res) => res.send('Hello world!'));

const personaldetails=require('./routes/details.js')

app.use('/details', personaldetails)

const frienddetails=require('./routes/ffdetails.js')

app.use('/ffs',frienddetails)

const greditdetails=require('./routes/greditdetails.js')

app.use('/subgres', greditdetails)

const postdetails=require('./routes/pdetails.js')

app.use('/posts',postdetails)

const reportdetails=require('./routes/rdetails.js')

app.use('/reports',reportdetails)

