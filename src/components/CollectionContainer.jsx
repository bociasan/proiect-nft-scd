import * as React from 'react';
import axios from 'axios';
import {
    Avatar,
    Box,
    Button,
    Card,
    Modal, TextField,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import {useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    pb: 2
};

export default function CollectionContainer({collection, updateCollectionList}) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState({})

    const handleDelete = () => {
        axios.delete('http://localhost:4000/api/collections/nft-delete-by-slug', {data:{slug:collection.slug}})
            .then(function (response) {
                // console.log(response);
                updateCollectionList();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleOpen = () => {
        setOpen(true);
        setUpdate({
            slug: collection.slug ? collection.slug : '',
            name: collection.name ? collection.name : '',
            average_price: collection.average_price? collection.average_price : 0,
            floor_price: collection.floor_price ? collection.floor_price : 0,
            num_owners: collection.num_owners ? collection.num_owners : 0,
            total_volume: collection.total_volume ? collection.total_volume : 0
        })
    }
    const handleClose = () => {
        setOpen(false);
        setUpdate({})
    }

    const handleSendUpdate = () => {
        axios.post('http://localhost:4000/api/collections/nft-update-by-slug', update)
            .then(function (response) {
                // console.log(response);
                updateCollectionList();
            })
            .catch(function (error) {
                console.log(error);
            });
        handleClose()
    }


    return (
        <Card sx={{width: 250, height: 410, m: 1, p: 2, textAlign: 'left', position: 'relative'}}>
            <Box sx={{width: '100%', mb: 1}}>
                <Avatar src={collection.image_url} variant="square" sx={{width: 'inherit', height: 'auto'}}/>
            </Box>

            <Typography variant='h6'>{collection.name}</Typography>
            <Typography>Average Price: {collection.average_price.toFixed(4)}</Typography>
            <Typography>Owners: {collection.num_owners}</Typography>
            <Typography>Date: {collection.date ? new Date(Date.parse(collection.date)).toLocaleString() : '---'}</Typography>
            <Box display='flex' justifyContent='space-between' position='absolute' sx={{bottom: 16, width: 'inherit'}}>
                <Button variant="contained" startIcon={<CreateIcon/>} onClick={handleOpen}>
                    Update
                </Button>
                <Button variant="outlined" endIcon={<DeleteIcon/>} onClick={handleDelete}>
                    Delete
                </Button>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
                        Update {collection.name} NFT
                    </Typography>

                    <TextField
                        value={update.name}
                        onChange={(e) => setUpdate(prevState => ({...prevState, name: e.target.value}))}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Name"
                        id="name"
                    />

                    <TextField
                        value={update.average_price}
                        onChange={(e) => setUpdate(prevState => ({...prevState, average_price: e.target.value}))}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Average Price"
                        id="average_price"
                    />
                    <TextField
                        value={update.floor_price}
                        onChange={(e) => setUpdate(prevState => ({...prevState, floor_price: e.target.value}))}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Floor Price"
                        id="floor_price"
                    />
                    <TextField
                        value={update.num_owners}
                        onChange={(e) => setUpdate(prevState => ({...prevState, num_owners: e.target.value}))}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Owners"
                        id="num_owners"
                    />
                    <TextField
                        value={update.total_volume}
                        onChange={(e) => setUpdate(prevState => ({...prevState, total_volume: e.target.value}))}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Total Volume"
                        id="total_volume"
                    />
                    <Box justifyContent='flex-end' display='flex' mt={1}>
                        <Button variant='contained' sx={{alignSelf: 'end'}} size='large'
                                endIcon={<SendIcon/>}
                                onClick={handleSendUpdate}
                        >Update</Button>
                    </Box>
                </Box>
            </Modal>
        </Card>
    )
}