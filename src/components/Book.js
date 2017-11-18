import React from 'react'
import AppSettings from '../AppSettings'
import { Link } from 'react-router-dom'


function Book(props) {


    const { book, displayShelf } = props
    return (
        <div className="book">
            <div className="book-top">
                <Link to={`/book/${book.id}`}>
                    <div className="book-cover"
                        style={{ width: 128, height: 193, backgroundImage: `url("${Book.getThumbnailUrl(book)}")` }}></div>
                </Link>
                {
                    displayShelf && book.shelf && book.shelf !== 'none' && <div className="book-shelf-label">{AppSettings.getShelfName(book.shelf)}</div>
                }
                <div className="book-shelf-changer">
                    <select onChange={(e) => this.props.onShelfChanged(book, e.target.value)}
                        defaultValue={book.shelf && book.shelf.length ? book.shelf : 'none'}>
                        <option value="none" disabled>Move to...</option>
                        {
                            AppSettings.shelfOrderMap.map(sid => (
                                <option key={sid} value={sid}>{AppSettings.getShelfName(sid)}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{Book.getAuthorName(book)}</div>
        </div>)

}
Book.getAuthorName=(book)=> {
    return book.authors ? book.authors.join(", ") : ""
}

Book.getReviewCount=(book)=>{
    return book.ratingsCount?book.ratingsCount:0
}

Book.getThumbnailUrl=(book)=> {
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : null;
    return thumbnail || "/icons/add.svg";
}
export default Book;