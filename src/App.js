import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import AddAuthor from './components/AddAuthor';
import ViewBooks from './components/ViewBooks';
import EditAuthor from './components/EditAuthor';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Welcome from './components/Welcome';
import Login from './components/Login';
import TokenExpired from './components/TokenExpired';


function App() {


  return (
    <div className="App">
      <Routes>
          <Route path ="/" element={<Welcome />}></Route>
          <Route path ="/bookmanager/auth/authenticate" element={<Login />}></Route>
          <Route path="/bookmanager/authors" element={<Home />}></Route>
          <Route path="/bookmanager/author/create" element={<AddAuthor/>}/>
          <Route path="/bookmanager/authors/:id/books" element={<ViewBooks/>}/>
          <Route path="/bookmanager/author/update/:id/:firstName/:lastName" element={<EditAuthor/>}/>
          <Route path="/bookmanager/author/:authorId/book/create" element={<AddBook/>}/>
          <Route path="/bookmanager/book/update/:id/:title/:isbn/:publisher/:publishedYear/:authorId" element={<EditBook/>}/>
      </Routes>
      <TokenExpired/>
    </div>
  );
}

export default App;
