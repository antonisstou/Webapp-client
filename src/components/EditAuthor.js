import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CancelIcon from '@mui/icons-material/Cancel';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConf';
import {useParams} from 'react-router-dom';

function EditAuthor() {

    let params = useParams();

    const [firstName, setFirstName] = useState(params.firstName)
    const [lastName, setLastName] = useState(params.lastName)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    
 
    const navigate = useNavigate();

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
                api.put("/author/update/"+params.id,{firstName:firstName, lastName:lastName});

            }
            catch(err)
            {
                console.error(err);
            }

            navigate("/authors")
        }
    }

    
    return (
        <React.Fragment>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Edit </h2>
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
                    <Button startIcon={<ArrowUpwardIcon/>} type="submit">SUBMIT</Button>
                    <Button color="error" startIcon={<CancelIcon/>} onClick={() => navigate("/authors")}>CANCEL</Button>
                </ButtonGroup>
             
        </form>
        </React.Fragment>
    );
}

export default EditAuthor;
