import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/SearchPage'
import BookShelf from './components/BookShelf'
import AppSettings from './AppSettings'
import Cube8 from 'cube8'




class BooksApp extends React.Component {

	state = {
		cube: new Cube8()
	}

	getAllBook() {
		BooksAPI.getAll().then(data => {
			const cube = this.state.cube;
			//Set data
			cube.Data = data;
			//Get Summary
			this.setState({})
		});
	}

	queryChanged = (q, fx) => {
		const { cube } = this.state;
		const currentBooks = cube.Data;
		let shelfLookup = {}
		q && q.length ?
			BooksAPI.search(q, 100).then(foundBooks => {
				currentBooks.forEach(b => shelfLookup[b.id] = b.shelf)
				foundBooks.forEach(b => shelfLookup[b.id] ? b.shelf = shelfLookup[b.id] : 0);
				fx(foundBooks);
			}) : fx([])
	}

	onShelfChanged = (book, shelfName, refresh) => {
		BooksAPI.update(book, shelfName).then(d => {
			const { cube } = this.state;

			book.shelf = shelfName;
			const remove = shelfName === 'none'

			remove ?
				cube.Data = cube.Data.filter(b => b.id !== book.id)
				:
				(cube.Data.find(b => b.id === book.id) || cube.Data.push(book));

			refresh && this.setState({})
		});
	}

	componentWillMount() {
		//Setup OLAP Cube		
		const { cube } = this.state;
		cube.Dim(d => d.shelf, "Shelf")
			.SetMeasureFx(d => { return { books: [d] } })
			.SetRollupFx((a, b) => {
				return a && b ?
					{
						books: a.books.concat(b.books)
					} : (a ? a : b)
			});
	}

	componentDidMount() {
		this.getAllBook();
	}


	renderShelf=()=> {
		const { cube } = this.state;
		const info = cube.Data ? cube.NestDim(["Shelf"], 1) : [];
		info.sort((a, b) => AppSettings.shelfOrderMap.indexOf(a.Fact) - AppSettings.shelfOrderMap.indexOf(b.Fact));

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>My Reads App</h1>
				</div>
				<div className="list-books-content">
					<div>
						{
							info.map(i => {
								return <BookShelf onShelfChanged={this.onShelfChanged} key={i.Fact} shelfInfo={i} />
							})
						}
					</div>
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>)
	}

	render() {

		return (
			<div className="app">
				<Route exact path='/' render={this.renderShelf} />
				<Route path='/search' component={() => <SearchPage onQueryChanged={this.queryChanged} onShelfChanged={this.onShelfChanged} />} />
			</div>
		);
	}
}

export default BooksApp
