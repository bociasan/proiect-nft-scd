const express = require('express')
const app = express()
const mongoose = require('mongoose')
const collectionRouter = require("./Collections/Controller");
const collectionService = require("./Collections/Service");
const cron = require('node-cron')
const {sendMail} = require("../trymailer");

const startApp = async () => {
    app.listen(4000, () => console.log('server started on PORT 4000'))
    mongoose.connect('mongodb://0.0.0.0:27017/', () => console.log('database started'))
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

function cronFunc15() {
    let s,e
    console.log('Cron 15 routine.')
    collectionService.getCollectionNames(
        data => data.forEach(collection => collectionService.updateRecordBySlugFromOpensea(
            collection.slug,
            // data => console.log(data),
            // error => console.log(error),
            data => s = data,
            error => e = error,
        )),
        error => console.log(error),
    )
}

function cronFunc1() {
    console.log(`Cron1 routine. ${subscribers.length} subscribers.`)
    subscribers.forEach(async subscriber => {
        let collection, oldCollection
        await collectionService.getRecordBySlug(subscriber.slug,
            (data) => {
                oldCollection = data
            },
            error => console.log(error)
        )
        await collectionService.updateRecordBySlugFromOpensea(
            subscriber.slug,
            (data, object) => {
                collection = object
            },
            error => console.log(error))
        // console.log(`${collection.average_price}<0.9*${oldCollection.average_price}`)
        if (collection?.average_price < 0.9 * oldCollection?.average_price) {
            subscriber.subject = 'Your NFT has a lower price!'
            subscriber.text = `${subscriber.slug} has a 10% lower price now! It's only ${collection.average_price.toFixed(4)}ETH`
            sendMail(subscriber)
            console.log('price is lower')
        }
    })
}

// cron.schedule('*/10 * * * * *', cronFunc15,{}) //10 sec
cron.schedule('*/15 * * * *', cronFunc15,{})   //15 min

let subscribers = [
    {
        to: 'kade.herzog5@ethereal.email',
        slug: 'bananas',
    },
    {
        to: 'kade.herzog5@ethereal.email',
        slug: 'kubz-relic',
    },
    {
        to: 'kade.herzog5@ethereal.email',
        slug: 'notorious-fool-academy',
    },
]

// cronFunc1()
// cron.schedule('*/20 * * * * *', cronFunc1, {})       //20 sec
cron.schedule('* * * * *', cronFunc1, {}) //1 min

