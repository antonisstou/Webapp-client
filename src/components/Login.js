import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import LoginIcon from '@mui/icons-material/Login';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConf';
import NavBar from "./NavBar";
import '../App.css'
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [open, setOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
  
    const handleSubmit = async (event) => {
        event.preventDefault()
 
        setUsernameError(false)
        setPasswordError(false)

 
        if (username === '') {
            setUsernameError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }
 
        if (username && password) {
            
            try{
                const response = await api.post("/bookmanager/auth/authenticate",{username:username, password:password})
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/bookmanager/authors");

            }
            catch(err)
            {
                console.error(err);
                if (err.code === "ERR_NETWORK"){
                    setSnackMessage(err.message)
                    setOpen(true);
                }
                else{
                    console.log("Incorrect credentials");
                    setSnackMessage("Incorrect credentials. Please give the correct to login")
                    setOpen(true);
                }
                setUsername("");
                setPassword("");
            }
        }
    }

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <div><NavBar title={'Login page'}/></div>
            <form autoComplete="off" onSubmit={handleSubmit} id="myLogF">
                <TextField 
                    label="username"
                    onChange={e => setUsername(e.target.value)}
                    required
                    variant="outlined"
                    sx={{mb: 3}}
                    fullWidth
                    value={username}
                    error={usernameError}
                />
                <TextField 
                    label="password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{mb: 3}}
                    type= "password"
                />
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button startIcon={<LoginIcon/>} type="submit">LOGIN</Button>
                    <Button color="error" startIcon={<CancelIcon/>} onClick={() => navigate("/")}>CANCEL</Button>
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
  
  export default Login;
  