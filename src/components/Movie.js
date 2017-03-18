import React, { Component } from 'react'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Chip from 'material-ui/Chip'
injectTapEventPlugin()


export default class Movie extends Component {
  handleClick () {
    let sdStreams = this.props.movie.streams.filter((stream) => stream.quality === 'SD')
    let hdStreams = this.props.movie.streams.filter((stream) => stream.quality === 'HD')
    let hdPlusStreams = this.props.movie.streams.filter((stream) => stream.quality === 'HD+')
    let stream = null
    if (hdPlusStreams.length > 0) {
      hdPlusStreams.sort(() => 0.5 * Math.random())
      stream = hdPlusStreams[0]
    } else if (hdStreams.length > 0) {
      hdStreams.sort(() => 0.5 * Math.random())
      stream = hdStreams[0]
    } else if (sdStreams.length > 0) {
      sdStreams.sort(() => 0.5 * Math.random())
      stream = sdStreams[0]
    } else {
      throw new Error('No stream available')
    }
    if (window) {
      var win = window.open(stream.url, '_blank');
      if (win) {
          //Browser has allowed it to be opened
          win.focus();
      } else {
          //Browser has blocked it
          window.href = stream.url
      }
    }
  }
  render () {
    return (
      <Card style={{ width: 350, margin: 20 }}>
        <CardMedia>
          <img src={this.props.movie.cover} alt={this.props.movie.title[this.props.lang]} />
        </CardMedia>
        <CardTitle title={this.props.movie.title[this.props.lang]} subtitle={
          this.props.movie.genres.map((genre, idx) => <Chip
          onTouchTap={()=>{}}
          key={idx}
          style={{margin: 4, display: 'inline-block'}}
        >
          {genre[this.props.lang]}
        </Chip>)
        } />
        <CardText>
          {this.props.movie.description[this.props.lang]}
        </CardText>
        <CardActions>
          <RaisedButton primary label='Watch' fullWidth={true} onTouchTap={this.handleClick.bind(this)} />
          <FlatButton secondary label='Report' fullWidth={true} onTouchTap={this.handleReport.bind(this)} />
        </CardActions>
      </Card>
    )
  }
  handleReport () {
    let title = `[${this.props.movie.title[this.props.lang]}] broken link`
    let url = `https://github.com/mattmezza/smartime/issues/new?title=${encodeURI(title)}`
    if (window) {
      var win = window.open(url, '_blank');
      if (win) {
          //Browser has allowed it to be opened
          win.focus();
      } else {
          //Browser has blocked it
          window.href = url
      }
    }
  }
}

Movie.defaultProps = {
  lang: 'en'
}