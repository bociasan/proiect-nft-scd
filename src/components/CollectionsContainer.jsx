import {Box} from "@mui/material";
import CollectionContainer from "./CollectionContainer";

export default function CollectionsContainer({fetchedCollections, setFetchedCollections, updateCollectionList}) {

    return (
        <Box sx={{mt: 5}} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            {
                fetchedCollections.length > 0 ?
                fetchedCollections.map(collection => <CollectionContainer collection={collection} updateCollectionList={updateCollectionList} key={collection.slug}/>)
                    : 'No collections in Database ...'
            }
        </Box>
    )
}