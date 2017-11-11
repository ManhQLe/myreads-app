import React, { Component } from 'react'
import AppSettings from '../AppSettings'
import { Link } from 'react-router-dom'
class Book extends Component {

    static getAuthorName(book) {
        return book.authors ? book.authors.join(", ") : ""
    }

    static getThumbnailUrl(book) {
        const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : null;
        return thumbnail || "/icons/add.svg";
    }

    render() {
        const { book } = this.props
        return (
            <div className="book">
                <div className="book-top">
                    <Link to={`/book/${book.id}`}>
                        <div className="book-cover"
                            style={{ width: 128, height: 193, backgroundImage: `url("${Book.getThumbnailUrl(book)}")` }}></div>
                    </Link>
                    <div className="book-shelf-changer">
                        <select onChange={(e) => this.props.onShelfChanged(book, e.target.value)} defaultValue={book.shelf && book.shelf.length ? book.shelf : 'none'}>
                            <option value="none" disabled>Move to...</option>
                            {
                                AppSettings.shelfOrderMap.map(sid => (
                                    <option key={sid} value={sid}>{AppSettings.nameMap[sid]}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{Book.getAuthorName(book)}</div>
            </div>)
    }
}

export default Book;