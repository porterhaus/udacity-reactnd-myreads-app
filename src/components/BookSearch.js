import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

class BookSearch extends React.Component {
  state = {
    searchBooks: []
  };

  searchBooks = (query) => {
    if (query.trim()) {
      BooksAPI.search(query, 100).then(results => {
        if (results.length > 0) { // Have to check the length because it causes an error in the console without the check.
          // https://stackoverflow.com/questions/12482961/is-it-possible-to-change-values-of-the-array-when-doing-foreach-in-javascript
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
          // Is this okay to do? It's mutating the state directly for those books that don't have a shelf.
          results.forEach((book, index, results) => {
            // For each book in results check to see if it is in the listBooks state received via props.
            let listBook = this.props.listBooks.find(b => b.id === book.id); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            // For each book in results check that it has a value for shelf or give it a value of 'none'.
            book.shelf = listBook ? listBook.shelf : 'none';
            // Update the results array to reflect the update to the shelf value.
            results[index] = book;
          });

          this.setState({
            searchBooks: results
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
