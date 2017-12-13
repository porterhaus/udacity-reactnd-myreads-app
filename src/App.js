import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import './App.css';

class BooksApp extends React.Component {
  state = {
    listBooks: []
  };

  componentDidMount () {
    BooksAPI.getAll().then(books => {
      this.setState({
        listBooks: books
      });
    });
  }

  render() {
    const { listBooks } = this.state;
    
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList 
            listBooks={listBooks}
          />
        )} />
        <Route path='/search' render={() => (
          <BookSearch 
            listBooks={listBooks}
          />
        )} />
      </div>
    );
  }
}

export default BooksApp;
