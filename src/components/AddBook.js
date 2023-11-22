import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CancelIcon from '@mui/icons-material/Cancel';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConf';
import Alert from '@mui/material/Alert';
import {useParams} from 'react-router-dom';
import NavBar from './NavBar';
import '../App.css';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';


function AddBook() {

    let params = useParams();
    
    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publishedYear, setPublisherYear] = useState("");

    const [open, setOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    
    const [titleError, setTitleError] = useState(false);
    const [isbnError, setIsbnError] = useState(false);
    const [publisherError, setPublisherError] = useState(false);
    const [publishedYearError, setPublishedYearError] = useState(false);

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
 
    const handleSubmit = (event) => {
        event.preventDefault()
 
        setTitleError(false)
        setIsbnError(false)
        setPublisherError(false)
        setPublishedYearError(false)

        if (title === '') {
            setTitleError(true)
        }
        if (isbn === '') {
            setIsbnError(true)
        }
        if (publisher === '') {
            setPublisherError(true)
        }
        if (publishedYear === '') {
            setPublishedYearError(true)
        }
 
        if (title && isbn && publisher && publishedYear) {
            
            try{
                api.post("/bookmanager/author/"+ params.authorId + "/book/create",{isbn:isbn, title:title, publisher:publisher, publishedYear:publishedYear, author:{id:params.authorId}},
                { headers: {Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}} );

            }
            catch(err)
            {
                console.error(err);
                setSnackMessage(err.message)
                setOpen(true);
            }
            setTitle("");
            setIsbn("");
            setPublisher("");
            setPublisherYear("");
            setAlertContent("saccessful submission");
            setAlert(true);
        }
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user') == null){
            navigate("/bookmanager/auth/authenticate")
        }
    },[navigate])

    useEffect(() => {
            setTimeout(() => {
            setAlert(false)
    }, 9000)})

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
        <div><NavBar title={ "Add new book" } button = 'LOGOUT'/></div>
        <form autoComplete="off" onSubmit={handleSubmit} id="myLogF">
                <TextField 
                    label="Title"
                    onChange={e => setTitle(e.target.value)}
                    required
                    variant="outlined"
                    sx={{mb: 3}}
                    fullWidth
                    value={title}
                    error={titleError}
                />
                <TextField 
                    label="ISBN"
                    onChange={e => setIsbn(e.target.value)}
                    required
                    variant="outlined"
                    value={isbn}
                    error={isbnError}
                    fullWidth
                    sx={{mb: 3}}
                />
                <TextField 
                    label="Publisher"
                    onChange={e => setPublisher(e.target.value)}
                    required
                    variant="outlined"
                    value={publisher}
                    error={publisherError}
                    fullWidth
                    sx={{mb: 3}}
                />
                <TextField 
                    label="Published Year"
                    onChange={e => setPublisherYear(e.target.value)}
                    required
                    variant="outlined"
                    value={publishedYear}
                    error={publishedYearError}
                    fullWidth
                    sx={{mb: 3}}
                />
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button startIcon={<ArrowUpwardIcon/>} type="submit">ADD</Button>
                    <Button color="error" startIcon={<CancelIcon/>} onClick={() => navigate("/bookmanager/authors/"+params.authorId+"/books")}>CANCEL</Button>
                </ButtonGroup>
             
        </form>
        <div>{alert ? <Alert severity="success">{alertContent}</Alert>:<></>}</div>
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
  
  export default AddBook;