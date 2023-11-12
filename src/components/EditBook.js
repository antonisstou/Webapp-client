import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CancelIcon from '@mui/icons-material/Cancel';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConf';
import {useParams} from 'react-router-dom';


function EditBook() {

    let params = useParams();

    // const [book, setBook] = useState([]);

    const [title, setTitle] = useState(params.title);
    const [isbn, setIsbn] = useState(params.isbn);
    const [publisher, setPublisher] = useState(params.publisher);
    const [publishedYear, setPublisherYear] = useState(params.publishedYear);
    
    const [titleError, setTitleError] = useState(false);
    const [isbnError, setIsbnError] = useState(false);
    const [publisherError, setPublisherError] = useState(false);
    const [publishedYearError, setPublishedYearError] = useState(false);

 
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
                api.put("/book/update/" + params.id,{isbn:isbn, title:title, publisher:publisher, publishedYear:publishedYear, author:{id:params.authorId}} );

            }
            catch(err)
            {
                console.error(err);
            }
            navigate("/authors/" + params.authorId +"/books")
        }
    }

    const navigate = useNavigate();

    return (
        <React.Fragment>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Edit book</h2>
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
                    <Button color="error" startIcon={<CancelIcon/>} onClick={() => navigate("/authors")}>CANCEL</Button>
                </ButtonGroup>
        </form>
        </React.Fragment>
    );
  }
  
  export default EditBook;