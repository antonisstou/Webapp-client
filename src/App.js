import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import AddAuthor from './components/AddAuthor';
import ViewBooks from './components/ViewBooks';
import EditAuthor from './components/EditAuthor';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

function App() {



  return (
    <div className="App">
      <Routes>
          <Route path="/authors" element={<Home />}></Route>
          <Route path="/author/create" element={<AddAuthor/>}/>
          <Route path="/authors/:id/books" element={<ViewBooks/>}/>
          <Route path="/author/update/:id/:firstName/:lastName" element={<EditAuthor/>}/>
          <Route path="/author/:authorId/book/create" element={<AddBook/>}/>
          <Route path="/book/update/:id/:title/:isbn/:publisher/:publishedYear/:authorId" element={<EditBook/>}/>
      </Routes>
    </div>
  );
}

export default App;
