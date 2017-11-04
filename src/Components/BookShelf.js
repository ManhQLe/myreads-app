import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Book from './Book'

class BookShelf extends Component {

    render() {
        const { books } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map(b => <li><Book/></li>)
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf