import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
* @description Stateless Functional Component that lists Books
* @constructor
* @param {string} title - Name of the Book Shelf
* @param {array} books - Books that have been assigned to a Shelf
* @param {function} changeBookShelf - Changes the Book's Shelf
*/
const BookShelf = ({title, books, changeBookShelf}) => 
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => {
          return (
            <li key={book.id}>
              <Book 
                book={book}
                changeBookShelf={changeBookShelf}
              />
            </li>
          )
        })}
      </ol>
    </div>
  </div>

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};

export default BookShelf;
