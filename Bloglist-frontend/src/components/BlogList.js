import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

class BlogList extends React.Component {
  render() {
    return (
      <div>
        <h2>Blogs</h2>
        {this.props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)