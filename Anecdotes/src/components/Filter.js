import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (e) => {
    e.preventDefault()
    this.props.filterChange(e.target.value)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter: <input name="filter" onChange={this.handleChange} />
      </div>
    )
  }
}

export default connect(
  null,
  { filterChange }
)(Filter)