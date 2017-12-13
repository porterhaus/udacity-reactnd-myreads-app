import React from 'react';

class BookSearch extends React.Component {
  render () {
    return (
      <div>
        <h1>I am a BookSearch Component!</h1>
        {JSON.stringify(this.props.listBooks)}
      </div>
    );
  }
}

export default BookSearch;
