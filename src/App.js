import './App.css';
import {useEffect, useState} from "react";
import SearchBar from "./components/SearchBar";
import CollectionsContainer from "./components/CollectionsContainer";
import {Box, Container, IconButton} from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

function App() {
    const [searchText, setSearchText] = useState('')
    const [fetchedCollections, setFetchedCollections] = useState([])

    async function fetchData(){
        const res = await fetch('http://localhost:4000/api/collections/nft-get-all')
        const json = await res.json()
        setFetchedCollections(json)
    }

    const updateCollectionList = () => {
        fetchData()
    }

    useEffect (()=>{
        fetchData()
        // console.log(json)
    }, [])

  return (
    <Container className="App" maxWidth={"xl"} display="flex" align='center'>
        <Box display='flex' flexDirection='row' justifyContent='center'>
            <SearchBar searchText={searchText} setSearchText={setSearchText} updateCollectionList={updateCollectionList}/>
            <IconButton color="primary" sx={{p: '10px'}} aria-label="add" onClick={updateCollectionList}>
                <ReplayIcon/>
            </IconButton>
        </Box>
        <CollectionsContainer fetchedCollections={fetchedCollections} setFetchedCollections={setFetchedCollections} updateCollectionList={updateCollectionList}/>
    </Container>
  );
}

export default App;
