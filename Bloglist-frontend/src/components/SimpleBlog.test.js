import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {

  it('renders title and author', () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      likes: 5
    }
     const simpleBlogComponent = shallow(
      <SimpleBlog blog={blog} />
    )
    const contentDiv = simpleBlogComponent.find('.titleAndAuthor')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
  })
})