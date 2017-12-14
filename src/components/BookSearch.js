import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

/**
* @description Component that displays search results for Books
* @constructor
* @param {array} books - Books that are currently on shelves
* @param {function} changeBookShelf - Changes the Book's Shelf
*/
class BookSearch extends React.Component {
  state = {
    searchBooks: []
  };
  
  /**
  * @description Executes a search of the BooksAPI
  * @param {string} query
  * @returns {arrray} Array of books from the search results
  */
  searchBooks = (query) => {
    if (query.trim()) {
      BooksAPI.search(query, 100).then(results => {
        if (results.length > 0) {
          const updatedResults = results.map (book => {
            const existingBook = this.props.listBooks.find (
              b => b.id === book.id
            );
            if (existingBook) {
              return existingBook;
            }
            return book;
          });

          this.setState({
            searchBooks: updatedResults
          });
        }
      });
    } else {
      this.setState({
        searchBooks: []
      });
    }
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              onChange={e => this.searchBooks(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.length > 0 && 
             this.state.searchBooks.map(book => {
              return (
                <li key={book.id}>
                  <Book
                    book={book}
                    changeBookShelf={this.props.changeBookShelf}
                  />
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    );
  }
}

BookSearch.propTypes = {
  listBooks: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};

export default BookSearch;
