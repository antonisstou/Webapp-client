import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CancelIcon from '@mui/icons-material/Cancel';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConf';
import Alert from '@mui/material/Alert';


function AddAuthor() {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
 
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
            // console.log(firstName, lastName)
            
            try{
                api.post("/author/create",{firstName:firstName, lastName:lastName});

            }
            catch(err)
            {
                console.error(err);
            }
            setFirstName("");
            setLastName("");
            setAlertContent("saccessful submission");
            setAlert(true);
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
            setTimeout(() => {
            setAlert(false)
    }, 6000)})

    return (
        <React.Fragment>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Add new author</h2>
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
                    <Button startIcon={<ArrowUpwardIcon/>} type="submit">ADD</Button>
                    <Button color="error" startIcon={<CancelIcon/>} onClick={() => navigate("/authors")}>CANCEL</Button>
                </ButtonGroup>
             
        </form>
        <div>{alert ? <Alert severity="success">{alertContent}</Alert>:<></>}</div>
        </React.Fragment>
    );
  }
  
  export default AddAuthor;