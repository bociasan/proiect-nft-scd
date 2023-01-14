const express = require('express')
const app = express()
const mongoose = require('mongoose')
const collectionRouter = require("./Collections/Controller");


const startApp = async () => {
    app.listen(4000, () => console.log('server started on PORT 4000'))
    mongoose.connect('mongodb://localhost:27017/', () => console.log('database started'))
    initRoutes()
}

const initRoutes = () => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    });
    app.use(express.json());
    app.use('/api/collections', collectionRouter);
}

startApp()