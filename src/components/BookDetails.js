import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'
const UrlPattern = require('url-pattern');

function Rating(props){
    /*
        I stole Svg Star image from Wiki Commons :D        
    */        
    const {stars=0,color="#f39c12"} = props;
    const percent = Math.round(stars/Rating.MaxStar * 100);
    return (
        <svg style={{display:"inline-block"}} width="100" height="20">
            <defs>
                <pattern id="star" patternUnits="userSpaceOnUse" width="20" height="40">                    
                    <path transform="scale(.4)" xmlns="http://www.w3.org/2000/svg" fill="#ecf0f1" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                </pattern> 
                <pattern id="star-fill" patternUnits="userSpaceOnUse" width="20" height="40">                    
                    <path transform="scale(.4)" xmlns="http://www.w3.org/2000/svg" fill={color} d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                </pattern>               
            </defs>
            <rect width="100%" height="20" style={{fill:"url(#star)"}}/>
            <rect width={`${percent}%`} height="20" style={{fill:"url(#star-fill)"}}/>
        </svg>
    )
}
Rating.MaxStar = 5;
Rating.propTypes = {
    stars:PropTypes.number,
    color:PropTypes.string
}

function ShortLabel(props) {
    const { backgroundColor = '#808080', text = '', color = 'white' } = props;
    return (
        <div className='book-details-short-label' style={{ backgroundColor, color }}>
            <span>{text}</span>
        </div>
    )
}

function BookInfo(props) {
    const { book } = props;
    const reviews = Book.getReviewCount(book);

    return (
        <div>
            <ol className="books-grid" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                <li>
                    <div className="book-cover-details"
                        style={{
                            width: 128, height: 193,
                            backgroundImage: `url("${Book.getThumbnailUrl(book)}")`
                        }}></div>
                </li>
                <li>
                    <div style={{display:"flex"}}>
                        <h1 className="book-details-title">{book.title}</h1>
                        <span className="book-details-lang">{book.language}</span>
                    </div>
                    <div className="book-details-line">
                        <ShortLabel text="Rating" color="#f1c40f"/>&nbsp;<Rating stars={book.averageRating}/>
                        <span style={{display:"inline-block",verticalAlign:'middle'}}>({`${reviews} review${reviews?"s":""}`})</span>
                    </div>
                    <div className="book-details-line"><ShortLabel text='Author(s)' backgroundColor="#7f8c8d" /> <span>{Book.getAuthorName(book)}</span></div>
                    <div className="book-details-line"><ShortLabel
                        backgroundColor="#ecf0f1"
                        text='Publish Date'
                        color="#95a5a6"
                    /> <span>{book.publishedDate}</span></div>
                    <div className="book-details-line"><ShortLabel color="#95a5a6" backgroundColor="#ecf0f1" text='Publisher'/> <span>{book.publisher}</span></div>
                </li>
            </ol>
            <p className="book-details-des">
                {book.description}
            </p>
            <div>
                <div className="book-details-line">
                    {
                        book.categories.map(c=>
                            <ShortLabel key={c} color="#16a085" backgroundColor="#F0F0F0" text={c}/>   
                        )                        
                    }                    
                    <ShortLabel color="#95a5a6" backgroundColor="#F0F0F0" text={`Print Type: ${book.printType}`}/>
                    <ShortLabel color="#5C5C5C" backgroundColor="#F0F0F0" text={`${book.pageCount} pages`}/>
                    <i title="Image" className="fa fa-picture-o book-details-icon" 
                        style={{color:book.readingModes.image?"#2ecc71":"#f0f0f0"}} 
                        aria-hidden="true"></i>
                    <i title="Text" className="fa fa-font book-details-icon" 
                        style={{color:book.readingModes.text?"#2ecc71":"#f0f0f0"}} 
                        aria-hidden="true"></i>
                    
                </div>
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
        const { getBookById } = this.props;
        //Get Id from url;        
        var pat = new UrlPattern("/book/:id");
        var keys = pat.match(window.location.pathname)
        !keys ?
            this.setState({ loading: 2 })
            :
            getBookById(keys.id, (book) => {
                const newState = { book, loading: book ? 1 : 2 };                
                this.setState(newState)
            })
    }

    render() {
        const { loading, book } = this.state
        return (
            <div className="book-details">
                <div className="app-bar">
                    <Link className="return-home" to="/">Close</Link>
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
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                                <span style={{ marginLeft: 10 }}>Few seconds please...</span>
                            </div>
                        )
                    }
                </div>
            </div>
        )

    }
}

export default BookDetails