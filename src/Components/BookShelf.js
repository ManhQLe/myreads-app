import React, { Component } from 'react'
import Book from './Book'
import AppSettings from '../AppSettings'
import PropTypes from 'prop-types'

class BookShelf extends Component {   
    static propTypes ={
        shelfInfo:PropTypes.object.isRequired
    }

    onShelfChanged=(book,shelfName)=>{
        //Update status = true
        this.props.onShelfChanged(book,shelfName,true);
    }

    state = {
        expand:true
    }
    render() {
        const { shelfInfo } = this.props        
        const books = shelfInfo.Rollup.books;                
        books.sort((a,b)=>a.title.localeCompare(b.title));
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{`${AppSettings.nameMap[shelfInfo.Fact]} (${books.length})`}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map(b => <li key={b.id}><Book onShelfChanged={this.onShelfChanged} book={b}/></li>)
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf