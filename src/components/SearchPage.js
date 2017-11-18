import React from 'react'
import Book from './Book'
import { Debounce } from 'react-throttle'

function SearchPage(props) {

    const onShelfChanged = (book, shelfName) => {
        const { onShelfChanged } = props;
        onShelfChanged && onShelfChanged(book, shelfName)
    }

    const { words, found } = props.searchInfo;

    return (
        <div className="search-books">
            {
                found && <h1 className="search-result-text">{`Found ${found.length} book${found.length ? 's' : ''}.`}</h1>
            }
            <div className="search-books-bar">
                <a className="close-search" onClick={() => window.history.back()}>Close</a>
                <div className="search-books-input-wrapper">
                    <Debounce time="400" handler="onChange">
                        <input type="text" placeholder="Search by title or author" defaultValue={words}
                            onChange={(e) => props.onQueryChanged(e.target.value)} />
                    </Debounce>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        found && found.map(b =>
                            <li key={b.id}>
                                <Book displayShelf onShelfChanged={onShelfChanged} book={b} />
                            </li>
                        )
                    }
                </ol>
            </div>
        </div>
    )

}

export default SearchPage