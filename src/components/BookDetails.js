import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'

function BookInfo(props) {
    const { book } = props;
    return (
    <div>
        <ol className="books-grid">
            <li>
                <div className="book-cover"
                    style={{
                        width: 128, height: 193,
                        backgroundImage: `url("${Book.getThumbnailUrl(book)}")`
                    }}></div>
            </li>
            <li>
                <h1>{book.title}</h1>
                <div><span>Authors: </span>{Book.getAuthorName(book)}</div>
                <div><span>Pubished Date: {book.publishDate}</span></div>
                <div><span>Publisher: {book.publisher}</span></div>
            </li>
        </ol>
    </div>)
}

class BookDetails extends Component {
    static propTypes = {
        getBookById: PropTypes.func
    }

    status = {
        book: null,
        loading: 1
    }
    componentDidMount() {

    }

    render() {
        const { loading, book } = this.status

        return (
            <div className="book-details">
                <div className="app-bar">
                    <Link className="return-home" to='/'>Close</Link>
                    <h1 className="app-bar-title">Book Details</h1>
                </div>
                <div className="book-details-content">
                    {
                        loading === 1 && <BookInfo book={{}} />
                    }
                    {
                        loading === 2 &&
                        <h1 className="book-details-not-found">Oops! Could not find your book : )</h1>
                    }
                    {
                        loading === 0 &&
                        (
                            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                {
                                    /* 
                                        Stole progress element style from Material UI for react : )
                                    */
                                }
                                <div size="40" className="wait-one">
                                    <div className="wait-two">
                                        <svg viewBox="0 0 32 32" style={{ width: 32, height: 32 }}>
                                            <circle cx="16" cy="16" r="11" className="wait-three"></circle>
                                        </svg>
                                    </div>
                                </div>                                
                                <span style={{marginLeft:10}}>Looking for your book...</span>                              
                            </div>
                        )
                    }
                </div>
            </div>
        )

    }
}

export default BookDetails