import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'
const UrlPattern  = require('url-pattern');

function BookInfo(props) {
    const { book } = props;
    return (
    <div>
        <ol className="books-grid" style={{textAlign:'left',justifyContent:'flex-start'}}>
            <li>
                <div className="book-cover"
                    style={{
                        width: 128, height: 193,
                        backgroundImage: `url("${Book.getThumbnailUrl(book)}")`
                    }}></div>
            </li>
            <li>
                <h1 className="book-details-title">{book.title}</h1>
                <div><span>Authors: </span>{Book.getAuthorName(book)}</div>
                <div><span>Pubished Date: {book.publishedDate}</span></div>
                <div><span>Publisher: {book.publisher}</span></div>
            </li>
        </ol>
        <div className="book-details-des">
            {book.description}
        </div>
    </div>)
}

class BookDetails extends Component {
    static propTypes = {
        getBookById: PropTypes.func.isRequired
    }

    state = {
        book: null,
        loading: 0
    }
    componentDidMount() {
        const {getBookById} = this.props;
        //Get Id from url;        
        var pat =new UrlPattern("/book/:id");
        var keys = pat.match(window.location.pathname)
        if(!keys)
            this.setState({loading:2})
        else
            getBookById(keys.id,(book)=>{    
                const newState =         {book,loading:book?1:2};
                console.log(newState)
                this.setState(newState)
            })
    }

    render() {
        const { loading, book } = this.state
        return (
            <div className="book-details">
                <div className="app-bar">
                    <Link className="return-home" to='/'>Close</Link>
                    <h1 className="app-bar-title">Book Details</h1>
                </div>
                <div className="book-details-content">
                    {
                        loading === 1 && <BookInfo book={book} />
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
                                <span style={{marginLeft:10}}>Few seconds please...</span>                              
                            </div>
                        )
                    }
                </div>
            </div>
        )

    }
}

export default BookDetails