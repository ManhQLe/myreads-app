import React, { Component } from 'react'
import AppSettings from '../AppSettings'

class Book extends Component {
   
    getAuthorName(book){
        return book.authors?book.authors.join(", "):""
    }

    getThumbnailUrl(book){
        const thumbnail = book.imageLinks ? book.imageLinks.thumbnail :null;
        return thumbnail || "/icons/add.svg";
    }

    render() {
        const { book } = this.props        
        return (<div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{ width: 128, height: 193, backgroundImage: `url("${this.getThumbnailUrl(book)}")` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => this.props.sendBookToShelf(book,e.target.value)} defaultValue={book.shelf && book.shelf.length ? book.shelf : 'none'}>
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
            <div className="book-authors">{this.getAuthorName(book)}</div>
        </div>)
    }
}

export default Book;