import React, { Component } from 'react'
import Book from './Book'
import AppSettings from '../AppSettings'
import PropTypes from 'prop-types'

class BookShelf extends Component {   
    static propTypes ={
        shelfInfo:PropTypes.object.isRequired,
        onShelfToggled: PropTypes.func
    }

    toggleTitle=(name)=>{
        const {onShelfToggled} = this.props;
        onShelfToggled && onShelfToggled(name);
    }

    onShelfChanged=(book,shelfName)=>{
        //Update status = true
        this.props.onShelfChanged(book,shelfName,true);
    }


    
    render() {
        const { shelfInfo,collapsed} = this.props                
        const books = shelfInfo.Rollup.books;                
        books.sort((a,b)=>a.title.localeCompare(b.title));
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title" onClick={()=>this.toggleTitle(shelfInfo.Fact)}>
                    <i className="fa fa-caret-right bookshelf-title-button" aria-hidden="true" data-collapsed={collapsed}></i> {`${AppSettings.nameMap[shelfInfo.Fact]} (${books.length})`}</h2>
                <div className="bookshelf-books" style={{display:collapsed?"none":"initial"}}>
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