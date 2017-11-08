import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchPage extends Component {
    state = {
        found: []
    }

    resultFx = (d) => {
        this.setState({ found: d })
    }

    render() {
        const found = this.state.found;
        found.sort((a, b) => a.title.localeCompare(b.title));
        return (
            <div className="search-books">                
                <h1 className="search-result-text">{`Found ${found.length} book${found.length?'s':''}.`}</h1>
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={(e) => this.props.onQueryChanged(e.target.value, this.resultFx)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            found.map(b =>
                                <li key={b.id}>
                                    <Book onShelfChanged={this.props.onShelfChanged} book={b} />
                                </li>
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage