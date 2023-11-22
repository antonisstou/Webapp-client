import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';




function NavBar({title, button}) {

  const navigate = useNavigate();

  const handleclick = () =>{
    localStorage.removeItem("user");
    navigate("/bookmanager/auth/authenticate");
  }

  let cbtn = true;
  
  if (button == null){
    cbtn = false;
  }

    return (
      <div >
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Link to="/bookmanager/authors" style={{textDecoration: 'none', color: '#FFF' }}> <strong>BookManager</strong> </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                       {cbtn ? <Button color="inherit"onClick={handleclick}>{button}</Button> : <></>}
                </Toolbar>
            </AppBar>
        </Box>
      </div>
    );
  }
  
  export default NavBar;
  