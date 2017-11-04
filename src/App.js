import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/SearchPage'
import BookShelf from './components/BookShelf'
import Cube8 from 'cube8'


class BooksApp extends React.Component {
	state = {
		info: [],
		showSearchPage: false
	}

	componentDidMount() {
		BooksAPI.getAll().then(data => {

			/* 
				Create OLAP cube
			*/
			const cube = this.cube = new Cube8(data);
			cube.Dim(d => d.shelf, "Shelf")
				.SetMeasureFx(d => { return { books: [d] } })
				.SetRollupFx((a, b) => {
					return a && b ?
						{
							books: a.books.concat(b.books)
						} : (a ? a : b)
				})
			console.log(cube.NestDim(["Shelf"], 1))
			//Set state
			this.setState({ info: cube.NestDim(["Shelf"], 1) });

		})
	}

	render() {
		const { info, showSearchPage } = this.state;
		return (
			<div className="app">
				<Route exact path='/' render={()=>
					<div className="list-books">
						<div className="list-books-title">
							<h1>My Reads App</h1>
						</div>
						<div className="list-books-content">
							<div>
								{
									info.map(i => {
										return <BookShelf key={i.Fact} shelfInfo={i} />
									})
								}
							</div>
						</div>
						<div className="open-search">
							<Link to='/addbook'>Add a book</Link>
						</div>
					</div>
				}/>
				<Route path='/addbook' component={SearchPage}/>				
			</div>
		)
	}
}

export default BooksApp
