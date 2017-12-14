import React from 'react';
import PropTypes from 'prop-types';

/**
* @description Component that represents a Book
* @constructor
* @param {object} book - Book instance
* @param {function} changeBookShelf - Changes the Book's Shelf
*/
class Book extends React.Component {
  state = {
    shelf: this.props.book.shelf ? this.props.book.shelf : "none"
  };

  /**
  * @description Change a Book's Shelf set Book instance shelf state
  * @param {object} book
  * @param {string} shelf
  */
  changeBookShelf = (e) => {
    this.props.changeBookShelf(this.props.book, e.target.value);
    this.setState({
      shelf: e.target.value
    });
  }

  render () {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
        <div 
          className="book-cover" 
          style={{ 
            width: 128, 
            height: 193, 
            // Perform a check for the imageLinks in the book instance. Some instances did not have them when testing. 
            backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : 'http://lorempixel.com/200/200'}")` 
          }}
        ></div>
        <div className="book-shelf-changer">
          <select 
            value={this.state.shelf}
            onChange={this.changeBookShelf}
          >
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
        </div>
        <div className="book-title">{book.title}</div>
        {/* Perform a check that the instance has authors included. */}
        <div className="book-authors">{book.authors && book.authors.map(author => {
          return (
            <div key={book.id + '-' + author}>{author}</div>
          )
        })}</div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
};

export default Book;
