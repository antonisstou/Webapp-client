import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConf';
import {useParams} from 'react-router-dom';
import NavBar from './NavBar';
import '../App.css'
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';


function EditAuthor() {

    let params = useParams();

    const [firstName, setFirstName] = useState(params.firstName)
    const [lastName, setLastName] = useState(params.lastName)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [open, setOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    
 
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user') == null){
            navigate("/bookmanager/auth/authenticate")
        }
    },[navigate])

    const handleSubmit = (event) => {
        event.preventDefault()
 
        setFirstNameError(false)
        setLastNameError(false)
 
        if (firstName === '') {
            setFirstNameError(true)
        }
        if (lastName === '') {
            setLastNameError(true)
        }
 
        if (firstName && lastName) {
            
            try{
                api.put("/bookmanager/author/update/"+params.id,{firstName:firstName, lastName:lastName},{ headers: {Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}});

            }
            catch(err)
            {
                console.error(err);
                setSnackMessage(err.message)
                setOpen(true);
            }

            navigate("/bookmanager/authors")
        }
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <React.Fragment>
        <div><NavBar title={'Edit author'} button = 'LOGOUT'/></div>
        <form autoComplete="off" onSubmit={handleSubmit} id="myLogF">
                <TextField 
                    label="FirstName"
                    onChange={e => setFirstName(e.target.value)}
                    required
                    variant="outlined"
                    sx={{mb: 3}}
                    fullWidth
                    value={firstName}
                    error={firstNameError}
                />
                <TextField 
                    label="Lastname"
                    onChange={e => setLastName(e.target.value)}
                    required
                    variant="outlined"
                    value={lastName}
                    error={lastNameError}
                    fullWidth
                    sx={{mb: 3}}
                />
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button startIcon={<EditIcon/>} type="submit">EDIT</Button>
                    <Button color="error" startIcon={<CancelIcon/>} onClick={() => navigate("/bookmanager/authors")}>CANCEL</Button>
                </ButtonGroup>
        </form>
        <Box sx={{ width: 500 }}>
            <Snackbar
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={6000}
                message={snackMessage}
            />
        </Box>
        </React.Fragment>
    );
}

export default EditAuthor;
