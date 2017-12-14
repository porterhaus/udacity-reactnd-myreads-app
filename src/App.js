import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import './App.css';

/**
* @description Top-level Component for Application
* @constructor
*/
class BooksApp extends React.Component {
  state = {
    listBooks: []
  };
  
  /**
  * @description Life-cycle method; Initializes App state
  */
  componentDidMount () {
    BooksAPI.getAll().then(books => {
      this.setState({
        listBooks: books
      });
    });
  }

  /**
  * @description Change a Book's Shelf
  * @param {object} book
  * @param {string} shelf
  */
  changeBookShelf = (book, shelf) =>{
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        listBooks: state.listBooks.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    const { listBooks } = this.state;
    
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList 
            listBooks={listBooks}
            changeBookShelf={this.changeBookShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <BookSearch 
            listBooks={listBooks}
            changeBookShelf={this.changeBookShelf}
          />
        )} />
      </div>
    );
  }
}

export default BooksApp;
