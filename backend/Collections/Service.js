const collectionModel = require('./Model')
const {fetchNftStatsBySlug, createCollectionObjectFromStats, fetchNftDetailsBySlug, createCollectionObjectFromDetails} = require("../functions");

const collectionService = {
    insertRecord: (collection, success, fail) => {
            collectionModel.create(collection)
                .then(data => success(data))
                .catch(error => fail(error))
    },
    createAndInsertRecordBySlug : async (slug, success, fail) =>{
        console.log(slug)
        if (slug){
            const collectionFetch = await fetchNftDetailsBySlug({slug})
            // console.log(collectionFetch)
            if (!collectionFetch.error){
                const object = createCollectionObjectFromDetails(collectionFetch)
                // console.log(object)
                // success({message:'success'})
                collectionModel.create(object)
                    .then(data => success(data))
                    .catch(error => fail(error))
            } else {
                fail({message: 'not found'})
            }
        } else {
            fail({message: 'slug is undefined'})
        }
    },
    deleteRecordBySlug: (slug, success, fail)=>{
        // fail({message: 'Not implemented yet ...'})
        collectionModel.deleteOne({slug: slug})
            .then(data => success(data))
            .catch(error => fail(error))
    },
    getRecordById: (id, success, fail)=> {
        collectionModel.find({_id: id})
            .then(data => success(data))
            .catch(error => fail(error))
    },
    getRecordBySlug: async (slug, success, fail)=> {
        // console.log(slug)
        collectionModel.find({slug: slug})
            .then(data => success(data[0]))
            .catch(error => fail(error))
    },
    getAllRecords: (success, fail)=> {
        collectionModel.find()
            .then(data => success(data))
            .catch(error => fail(error))
    },
    updateRecordsPriceById: (id, value, success, fail) => {
        collectionModel.updateOne({_id: id}, {$set:{floor_price: value}})
            .then(data => success(data))
            .catch(error => fail(error))
    },
    updateRecordBySlug: (collection, success, fail) => {
        collectionModel.updateOne({slug: collection.slug}, {
            $currentDate: {
                // lastModified: true,
                "date": { $type: "date" }
            },
            $set: collection
        }, {upsert: true})
            .then(data => success(data))
            .catch(error => fail(error))
    },
    updateRecordBySlugFromOpensea: async (slug, success, fail) => {
        // console.log(slug)
        if (slug) {
            const collectionFetch = await fetchNftDetailsBySlug({slug})
            const object = createCollectionObjectFromDetails(collectionFetch)
            await collectionModel.updateOne({slug: object.slug}, {
                $set: object
            }, {upsert: true})
                .then(data => success(data, object))
                .catch(error => fail(error))
        } else {
            fail({message: 'slug is undefined'})
        }
    },

    getCollectionNames: (success, fail) => {
        collectionModel.find()
            .then(data => success(data.map(collection => {return {slug:collection.slug,name:collection.name}})))
            .catch(error => fail(error))
    },
    sendMail: (mail, name, succes, fail) => {
        fetch(`https://api.mailjet.com/v3.1/send`,
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('83bcb4e2692851115efaee938907deb1:abd7326f73ec07e481a5b85d1c98c327')

                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    Messages: [
                        {
                            From: {
                                Email: "bociasan95@gmail.com",
                                Name: "NFT Manager"
                            },
                            To: [
                                {
                                    Email: mail,
                                    Name: "NFT User"
                                }
                            ],
                            Subject: "Nft Token Price Low!",
                            TextPart: "Greetings from Mailjet!",
                            HTMLPart: `Your NFT ${name} has a lower price.`
                        }
                    ]
                }),
            }
        )
            .then(res => res.json())
            .then((data) => {
                succes(data)
            })
            .catch(err => console.log(err))
    }

}

module.exports = collectionService