import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {
    state ={        
        found:[]
    }

    onQueryChange = (e)=>{
        const q = e.target.value;
        q.length?
        BooksAPI.search(q,100).then(data=>{

            this.setState({found:data});
        }):this.setState({found:[]})
        
    }

    render() {
        const found = this.state.found;
        found.sort((a,b)=>a.title.localeCompare(b.title));
        return (<div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={this.onQueryChange}/>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        found.map(b=>
                            <li key={b.id}>
                                <Book sendBookToShelf={this.props.sendBookToShelf} book={b}/>
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