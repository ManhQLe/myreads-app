import React from 'react'
import Book from './Book'
import AppSettings from '../AppSettings'
import PropTypes from 'prop-types'

function BookShelf(props) {

   const toggleTitle= (name)=>{
        const { onShelfToggled } = props;
        onShelfToggled && onShelfToggled(name);
    }

    const { shelfInfo, collapsed, onShelfChanged } = props
    const books = shelfInfo.Rollup.books;
    books.sort((a, b) => a.title.localeCompare(b.title));
    
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title" onClick={() => toggleTitle(shelfInfo.Fact)}>
                <i className="fa fa-caret-right bookshelf-title-button" aria-hidden="true" data-collapsed={collapsed}></i> {`${AppSettings.nameMap[shelfInfo.Fact]} (${books.length})`}</h2>
            <div className="bookshelf-books" style={{ display: collapsed ? "none" : "initial" }}>
                <ol className="books-grid">
                    {
                        books.map(b => <li key={b.id}><Book onShelfChanged={onShelfChanged} book={b} /></li>)
                    }
                </ol>
            </div>
        </div>
    )
}
BookShelf.propTypes = {
    shelfInfo: PropTypes.object.isRequired,
    onShelfToggled: PropTypes.func
}

export default BookShelf