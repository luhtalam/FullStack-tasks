import React from 'react'
import { connect } from 'react-redux'
import BlogList from './BlogList'
import BlogForm from './BlogForm'

class Home extends React.Component {

  render() {
    return (
      <div>
        <BlogForm />
        <BlogList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(Home)
