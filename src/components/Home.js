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

    const getAuthors = async () =>{
    
        try{
            const response = await api.get("/authors");
            console.log(response.data)
            setAuthors(response.data);

        } 
        catch(err){
            console.log(err);
        }
    }
  
    useEffect(() => {
        getAuthors();
    },[])

    const navigate = useNavigate();

    
    function goToBooks(id) {
        // console.log(id);
        navigate("/authors/"+ id+ "/books");
    }

    function goToEdit(id, firstName, lastName){
        navigate("/author/update/"+id + "/" + firstName + "/" + lastName);
    }

    function deleteAuthor(id){
    
        try{
            api.delete("/author/delete/"+id);
        } 
        catch(err){
            console.log(err);
        }
        let updatedAuthors = [...authors].filter(i => i.id !== id);
        setAuthors(updatedAuthors);
    }

  return (
    <div>
        <h1 id = "id1">Page for book managment by author</h1>
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
            <Button variant="contained" startIcon={<AddIcon/>} onClick={() => navigate("/author/create")}>ADD AUTHOR</Button>
        </div>
    </div>
  );
}

export default Home;
