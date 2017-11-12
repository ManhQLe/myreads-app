import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/SearchPage'
import BookShelf from './components/BookShelf'
import BookDetails from './components/BookDetails'
import AppSettings from './AppSettings'
import Cube8 from 'cube8'

class BooksApp extends React.Component {

	state = {
		cube: new Cube8(),
		shelfToggleMap:{},
		searchInfo:{
			words:"",
			found:null
		}
	}

	getBookById = (id,fx)=> {
		const {Data} = this.state.cube;
		const book = Data?Data.find(b=>b.id===id):null;
		book?fx(book):BooksAPI.get(id).then(fx)
		.catch(ex=>fx(null))
	}

	onShelfToggled = (shelfName)=>{
		const {shelfToggleMap} = this.state
		shelfToggleMap[shelfName] = !shelfToggleMap[shelfName];
		this.setState({shelfToggleMap});
	}

	getAllBook() {
		return BooksAPI.getAll().then(data => {
			const cube = this.state.cube;
			//Set data
			cube.Data = data;
			//Get Summary			
		});
	}

	queryChanged = (q) => {

		const { cube } = this.state;
		const currentBooks = cube.Data;
		let shelfLookup = {}
		
		q && q.length ?
			BooksAPI.search(q, 100).then(foundBooks => {
				const words = q;
				currentBooks.forEach(b => shelfLookup[b.id] = b.shelf)
				foundBooks.forEach(b => shelfLookup[b.id] ? b.shelf = shelfLookup[b.id] : 0);
				const searchInfo = {words,found:foundBooks};
				this.setState({searchInfo})

			}) : this.setState({searchInfo:{words:"",found:null}})
	}

	onShelfChanged = (book, shelfName, refresh,cb) => {
		BooksAPI.update(book, shelfName).then(d => {
			const { cube } = this.state;

			book.shelf = shelfName;
			const remove = shelfName === 'none'

			remove ?
				cube.Data = cube.Data.filter(b => b.id !== book.id)
				:
				(cube.Data.find(b => b.id === book.id) || cube.Data.push(book));
			cb && cb(remove);
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
						books: [...a.books,...b.books]
					} : (a ? a : b)
			});
	}

	componentDidMount() {
		this.getAllBook().then(()=>this.setState({}))
	}


	renderShelf=()=> {
		const { cube,shelfToggleMap } = this.state;
		
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
								return <BookShelf collapsed={shelfToggleMap[i.Fact]} onShelfToggled={this.onShelfToggled} onShelfChanged={this.onShelfChanged} key={i.Fact} shelfInfo={i} />
							})
						}
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>)
	}

	render() {

		return (
			<div className="app">
				<Route exact path='/' render={this.renderShelf} />
				<Route path='/search' render={() => <SearchPage searchInfo={this.state.searchInfo} onQueryChanged={this.queryChanged} onShelfChanged={this.onShelfChanged} />} />
				<Route path='/book/:id' render={()=><BookDetails getBookById={this.getBookById}/>}/>
			</div>
		);
	}
}

export default BooksApp
