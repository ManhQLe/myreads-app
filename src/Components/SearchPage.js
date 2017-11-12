import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'


class SearchPage extends Component {
    state = {
        found: []
    }

    resultFx = (d) => {
        d.sort((a, b) => a.title.localeCompare(b.title)); 
        this.setState({ found: d })
    }

    onShelfChanged = (book,shelfName)=>{
        const {onShelfChanged} = this.props;
        onShelfChanged &&onShelfChanged (book,shelfName,false,()=>{
            this.setState({});
        })
    }

    render() {
        const found = this.state.found;
      
        return (
            <div className="search-books">                
                <h1 className="search-result-text">{`Found ${found.length} book${found.length?'s':''}.`}</h1>
                <div className="search-books-bar">
                    <a className="close-search" onClick={()=>window.history.back()}>Close</a>
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
                                    <Book displayShelf onShelfChanged={this.onShelfChanged} book={b} />
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