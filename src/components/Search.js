import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

export default class Search extends Component {
  componentDidMount () {
    if (this.refs.searchField) {
      this.refs.searchField.focus()
    }
  }
  render () {
    return (
      <div {...this.props}>
        <TextField
          ref={'searchField'}
          hintText="Search"
          fullWidth={true}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}