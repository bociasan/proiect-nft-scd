const express = require('express');
const collectionService = require('./Service');
const collectionRouter = express.Router();

collectionRouter.route('/nft-insert').post(insertCollection);
collectionRouter.route('/nft-create-by-slug').post(createCollectionBySlug);
collectionRouter.route('/nft-update-by-slug').post(updateCollectionBySlug);
// collectionRouter.route('/nft-update-by-id').post(updateRecordsValueById);
// collectionRouter.route('/nft-get-by-id').get(getCollectionById);
collectionRouter.route('/nft-get-by-slug').post(getCollectionBySlug);
collectionRouter.route('/nft-delete-by-slug').delete(deleteCollectionBySlug);
collectionRouter.route('/nft-get-all').get(getAllCollections);
collectionRouter.route('/nft-get-collection-names').get(getCollectionNames);



function insertCollection(request, response) {
    const value = request.body;
    console.log(value)
    if (value){
        collectionService.insertRecord(
            value,
            data => response.status(201).json(data),
            error => response.status(400).json(error),
        );
    }else {
        response.status(400).json({message:'slug cannot be empty'})
    }
}

function createCollectionBySlug(request, response) {
    const value = request.body.slug;
    // console.log(request.body)
    collectionService.createAndInsertRecordBySlug(
        value,
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

function deleteCollectionBySlug(request, response) {
    const value = request.body.slug;

    collectionService.deleteRecordBySlug(
        value,
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

function updateRecordsValueById(request, response) {
    const value = request.body;

    collectionService.updateRecordsPriceById(
        request.body._id,
        value,
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

function updateCollectionBySlug(request, response) {
    const value = request.body;
    collectionService.updateRecordBySlug(
        value,
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

function getCollectionById(request, response) {
    const id = request.body._id;

    collectionService.getRecordById(
        id,
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

function getCollectionBySlug(request, response) {
    const slug = request.body.slug
    collectionService.getRecordBySlug(
        slug,
        data => {
            // console.log('success',data)

            if (data[0].floor_price <= 0.9* request.body.floor_price){
            // if (request.body.floor_price === -1) {
                collectionService.sendMail(request.body.mail, data[0].name,
                    (success) => console.log(success),
                    (fail) => console.log(fail)
                )
            }

            return response.status(201).json(data)
        },
        error => {
            // console.log('error', error)
            return response.status(400).json(error)
        }
    )
}

function getAllCollections(request, response) {
    collectionService.getAllRecords(
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

function getCollectionNames(request, response) {
    collectionService.getCollectionNames(
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

module.exports = collectionRouter;
