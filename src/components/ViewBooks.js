import {useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import api from '../api/axiosConf';
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
import { grey } from '@mui/material/colors';
import '../App.css';
import AddIcon from '@mui/icons-material/Add';
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

function ViewBooks() {

  const navigate = useNavigate();
  
  useEffect(() => {
      if (localStorage.getItem('user') == null){
          navigate("/bookmanager/auth/authenticate")
      }
  },[navigate])

  let params = useParams();

  console.log(params.id)  
  
  const [books, setBooks] = useState();
  const [author, setAuthor] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  
  
  useEffect(() => {

    const getBooks = async () =>{
    
      try{
        const response = await api.get("/bookmanager/authors/"+params.id+"/books", { headers: {Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}});
        setBooks(response.data);

      } 
      catch(err){
        console.log(err);
        setSnackMessage(err.message)
        setOpen(true);
      }
    } 
    getBooks();
  },[params.id])



  useEffect(() => {
    const getAuthorById = async () =>{
    
      try{
          const response = await api.get("/bookmanager/author/"+params.id, { headers: {Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}});
          console.log(response.data)
          setAuthor(response.data);
  
      } 
      catch(err){
          console.log(err);
          setSnackMessage(err.message)
          setOpen(true);
      }
    }
    getAuthorById();
  },[params.id])

  function deleteBook(id){
    
    try{
        api.delete("/bookmanager/book/delete/"+id, { headers: {Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}});
    } 
    catch(err){
        console.log(err);
        setSnackMessage(err.message)
        setOpen(true);
    }
    let updatedBooks = [...books].filter(i => i.id !== id);
    setBooks(updatedBooks);
  }

  function goToEdit(id, title, isbn, publisher, publishedYear){
    navigate("/bookmanager/book/update/"+id + "/" + title + "/" + isbn + "/" + publisher + "/" + publishedYear + "/" + params.id);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
      <React.Fragment>
        <div><NavBar title={ author.firstName + " " + author.lastName + "'s Books"} button = 'LOGOUT'/></div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell>ISBN</StyledTableCell>
                        <StyledTableCell>Publisher</StyledTableCell>
                        <StyledTableCell>Published year</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {books?.map((book) => (
                        <TableRow
                            key={book.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">{book.title}</StyledTableCell>
                            <StyledTableCell>{book.isbn}</StyledTableCell>
                            <StyledTableCell>{book.publisher}</StyledTableCell>
                            <StyledTableCell>{book.publishedYear}</StyledTableCell>
                            <StyledTableCell align = "right">
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button startIcon={<EditIcon/>}onClick={() => goToEdit( book.id, book.title, book.isbn, book.publisher, book.publishedYear)}>EDIT</Button>
                                    <Button color="error" startIcon={<DeleteIcon />}onClick={() => deleteBook( book.id)}>DELETE</Button>
                                </ButtonGroup>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <div id = "btnDiv">
            <Button variant="contained" startIcon={<AddIcon/>}onClick={() => navigate("/bookmanager/author/"+ params.id + "/book/create")}>ADD BOOK</Button>
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
  
  export default ViewBooks;