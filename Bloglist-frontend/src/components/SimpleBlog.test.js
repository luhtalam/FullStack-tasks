import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {

  let simpleBlogComponent
  const mockHandler = jest.fn()
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    likes: 5
  }

  beforeEach(() => {
    simpleBlogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
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

  it('clicking the button twice calls event handler twice', () =>{
    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})