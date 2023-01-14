import {Box, Divider, IconButton, InputBase, Paper} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

export default function SearchBar({searchText, setSearchText, updateCollectionList}) {

    const handleNftCreateBySlug = () => {
        axios.post('http://localhost:4000/api/collections/nft-create-by-slug', {slug: searchText})
            .then(res => {
                console.log(res)
                updateCollectionList()
            })
            .catch(err => console.log(err))
    }

    return <Paper
        component="form"
        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: 50, margin: 5}}

    >
        <InputBase
            value={searchText}
            sx={{ml: 1, flex: 1}}
            placeholder="Search NFT collection"
            inputProps={{'aria-label': 'search google maps'}}
            onChange={(e) => setSearchText(e.target.value)}
        />
        {/*<IconButton type="button" sx={{p: '10px'}} aria-label="search">*/}
        {/*    <SearchIcon/>*/}
        {/*</IconButton>*/}
        {/*<Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>*/}
        <IconButton color="primary" sx={{p: '10px'}} aria-label="add" onClick={handleNftCreateBySlug}>
            <AddIcon/>
        </IconButton>
    </Paper>
}