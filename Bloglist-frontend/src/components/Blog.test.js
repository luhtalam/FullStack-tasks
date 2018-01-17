import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  let blogComponent
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 5,
    user: {
      username: 'luhtalam'
    }
  }

  beforeEach(() => {
    blogComponent = shallow(
      <Blog blog={blog} />
    )
  })

  it('at first only title and author are shown', () => {
    const contentDiv = blogComponent.find('.info')
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).not.toContain(blog.url)
    expect(contentDiv.text()).not.toContain(blog.likes)
  })

  it('after click also url and likes are shown', () => {
    let contentDiv = blogComponent.find('.info')
    contentDiv.simulate('click')
    contentDiv = blogComponent.find('.info')
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.url)
    expect(contentDiv.text()).toContain(blog.likes)
    expect(contentDiv.text()).toContain(blog.user.username)
  })
})