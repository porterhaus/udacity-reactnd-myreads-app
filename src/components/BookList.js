import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

/**
* @description Stateless Functional Component that lists Shelves and Books
* @constructor
* @param {array} books - Books that have been assigned to a Shelf
* @param {function} changeBookShelf - Changes the Book's Shelf
*/
const BookList = ({listBooks, changeBookShelf}) => {
  /**
  * @description Filters a Book to its assigned Shelf
  * @param {string} shelf 
  * @returns {array} Array of books grouped by shelf
  */
  const filterBooks = (shelf) => {
    return listBooks.filter(b => b.shelf === shelf)
  };

  return (
    <div>
      <div className="list-books"> 
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title={'Currently Reading'}
              books={filterBooks('currentlyReading')}
              changeBookShelf={changeBookShelf}
            />
            <BookShelf
              title={'Want to Read'}
              books={filterBooks('wantToRead')}
              changeBookShelf={changeBookShelf}
            />
            <BookShelf
              title={'Read'}
              books={filterBooks('read')}
              changeBookShelf={changeBookShelf}
            />
          </div>
        </div>
      </div>
      <div className="open-search">
          <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
};

BookList.propTypes = {
  listBooks: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};

export default BookList;
