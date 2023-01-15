const sdk = require('api')('@opensea/v1.0#bg4ikl1mk428b')

async function fetchNftStatsBySlug({slug}) {
    let res = await sdk.retrievingCollectionStats({collection_slug: slug})
    return res.data.stats
}

async function fetchNftDetailsBySlug({slug}) {
    let res = await sdk.retrievingASingleCollection({collection_slug: slug})
        .catch(error => ({error: true}))
    // console.log(res)
    return res.error? res : res.data.collection
}

function createCollectionObjectFromStats(collection) {
    return (({
                 one_hour_difference,
                 average_price,
                 floor_price,
                 total_volume,
                 num_owners,
                 seven_day_sales,
                 total_supply
             }) => ({
        one_hour_difference,
        average_price,
        floor_price,
        total_volume,
        num_owners,
        seven_day_sales,
        total_supply
    }))(collection)
}

function createCollectionObjectFromDetails(collection) {
    // console.log(collection)
    const {
        one_hour_difference,
        average_price,
        floor_price,
        total_volume,
        num_owners,
        seven_day_sales,
        total_supply
    } = collection.stats
    const {name, slug, image_url, large_image_url} = collection
    return {
        name,
        slug,
        image_url,
        large_image_url,
        one_hour_difference,
        average_price,
        floor_price,
        total_volume,
        num_owners,
        seven_day_sales,
        total_supply,
        date: new Date()
    }
}

module.exports = {
    fetchNftStatsBySlug,
    fetchNftDetailsBySlug,
    createCollectionObjectFromStats,
    createCollectionObjectFromDetails
}