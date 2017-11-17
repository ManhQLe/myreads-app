import React, { Component } from 'react'
import Book from './Book'

class SearchPage extends Component {

    onShelfChanged = (book,shelfName)=>{
        const {onShelfChanged} = this.props;
        onShelfChanged &&onShelfChanged (book,shelfName,false,()=>{
            this.setState({});
        })
    }

    render() {
        const {words,found} = this.props.searchInfo;
      
        return (
            <div className="search-books">                
                {
                    found && <h1 className="search-result-text">{`Found ${found.length} book${found.length?'s':''}.`}</h1>
                }
                <div className="search-books-bar">
                    <a className="close-search" onClick={()=>window.history.back()}>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" defaultValue={words}
                            onChange={(e) => this.props.onQueryChanged(e.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            found && found.map(b =>
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