import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class BookList extends React.Component {
  filterBooks = (shelf) => {
    return this.props.listBooks.filter(b => b.shelf === shelf);
  };

  render () {
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
                books={this.filterBooks('currentlyReading')}
              />
              <BookShelf
                title={'Want to Read'}
                books={this.filterBooks('wantToRead')}
              />
              <BookShelf
                title={'Read'}
                books={this.filterBooks('read')}
              />
            </div>
          </div>
        </div>
        <div className="open-search">
            <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

BookList.propTypes = {
  listBooks: PropTypes.array.isRequired
};

export default BookList;
