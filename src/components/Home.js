import api from '../api/axiosConf';
import '../App.css';
import {useState, useEffect} from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookIcon from '@mui/icons-material/Book';
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: grey[200],
        fontSize: 14,
    },
    }));

function Home() {


    const [authors, setAuthors] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");

    const getAuthors = async () =>{

        try{
            const response = await api.get("/bookmanager/authors",{ headers: {Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}});
            setAuthors(response.data);

        } 
        catch(err){
            console.log(err);
            setSnackMessage(err.message)
            setOpen(true);
        }
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user') == null){
            navigate("/bookmanager/auth/authenticate")
        }
        getAuthors();
    },[navigate])

    
    function goToBooks(id) {
        navigate("/bookmanager/authors/"+ id+ "/books");
    }

    function goToEdit(id, firstName, lastName){
        navigate("/bookmanager/author/update/"+id + "/" + firstName + "/" + lastName);
    }

    function deleteAuthor(id){
    
        try{
            api.delete("/bookmanager/author/delete/"+id ,{ headers: {Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}});
        } 
        catch(err){
            console.log(err);
            setSnackMessage(err.message)
            setOpen(true);
        }
        let updatedAuthors = [...authors].filter(i => i.id !== id);
        setAuthors(updatedAuthors);
    }

    const handleClose = () => {
        setOpen(false);
    }

  return (
    <React.Fragment>
        <div><NavBar title={'Page for book managment by author'} button = 'LOGOUT'/></div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>First name</StyledTableCell>
                        <StyledTableCell>Last name</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {authors?.map((author) => (
                        <TableRow
                            key={author.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">{author.firstName}</StyledTableCell>
                            <StyledTableCell>{author.lastName}</StyledTableCell>
                            <StyledTableCell align = "right">
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button startIcon={<BookIcon/> } onClick={() => goToBooks( author.id)}>BOOKS</Button>
                                    <Button startIcon={<EditIcon/>} onClick={() => goToEdit( author.id, author.firstName, author.lastName)}>EDIT</Button>
                                    <Button color="error" startIcon={<DeleteIcon />} onClick={() => deleteAuthor( author.id)}>DELETE</Button>
                                </ButtonGroup>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <div id = "btnDiv">
            <Button variant="contained" startIcon={<AddIcon/>} onClick={() => navigate("/bookmanager/author/create")}>ADD AUTHOR</Button>
        </div>
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

export default Home;
