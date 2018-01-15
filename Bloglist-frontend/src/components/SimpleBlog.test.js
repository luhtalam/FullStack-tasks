import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {

  let simpleBlogComponent
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    likes: 5
  }

  beforeEach(() => {
    simpleBlogComponent = shallow(
      <SimpleBlog blog={blog} />
    )
  })

  it('renders title and author', () => {
    const contentDiv = simpleBlogComponent.find('.titleAndAuthor')
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
  })

  it('renders likes', () => {
    const contentDiv = simpleBlogComponent.find('.likes')
    expect(contentDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })
})