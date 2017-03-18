import React, { Component } from 'react'
import logo from './film.svg'
import './App.css'
import {cyan500} from 'material-ui/styles/colors'
import Masonry from 'react-masonry-component'
import Movie from './components/Movie'
import Search from './components/Search'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import sleep from 'sleep-promise'
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline'
import Paper from 'material-ui/Paper'
import movies from '../data/movies.json'
const DB = require('../data/MovieDB')(movies)

const dbVersion = "0.0.1"

export default class App extends Component {

  constructor (props) {
    super(props)
    this.DB = DB
    this.state = {
      movies,
      lang: 'en'
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  async handleSearch (event, newV) {
    await sleep(350)
    let newValue = newV || ''
    if (newValue === '') {
      this.setState({ movies })
      return
    }
    if (newValue.length < 3) {
      this.setState({ movies })
      return
    }
    if (typeof newValue === 'string') {
        this.DB.filterTitle(newValue).then((filteredMovies) => {
          this.setState({ movies: filteredMovies })
        }).catch((err) => console.log(err.message))
    }
  }

  render() {
    const masonryOptions = {
        transitionDuration: 0,
        fitWidth: true
    }
    let movies = this.state.movies.map((movie, idx) => (
                  <Movie movie={movie} lang={this.state.lang} key={idx.toString()} />
                ))
    let noMovies = (
      <div>
        <ErrorOutline style={{ width: 100, height: 100 }} />
        <h2>No movies matching your criteria</h2>
      </div>
    )

    return (
      <MuiThemeProvider>
        <div className='App'>
          <div style={{ height: 150 }}></div>
          <Paper style={{ 
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: 40}} zDepth={1}>
            <img src={logo} className='App-logo' alt='logo' />
            <Search style={{ margin: 50 }} onChange={this.handleSearch.bind(this)} />
            <Masonry
              ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
              options={masonryOptions}
              style={{
                width: '90%',
                margin: 'auto'
              }}>
              {movies.length > 0 ? movies : noMovies}
            </Masonry>
          </Paper>
          <div className='App-footer' style={{ backgroundColor: cyan500 }}>
            <h5><a href='https://github.com/mattmezza/movie-streaming-collection'>Movie Streaming Collection</a> DB v{dbVersion}</h5>
            <h6><a href='https://github.com/mattmezza/movie-streaming-collection'>Fork</a> this project on <a href='https://github.com/mattmezza/movie-streaming-collection'>GitHub</a></h6>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

