const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (mostLikedSoFar, curr) => {
    return mostLikedSoFar.likes < curr.likes ? curr : mostLikedSoFar
  }
  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  let numberOfBlogs = {}
  blogs.forEach(blog => {
    numberOfBlogs[blog.author] ?
      numberOfBlogs[blog.author]++ :
      numberOfBlogs[blog.author] = 1
  })
  const reducer = (hasMostSoFar, curr) => {
    return numberOfBlogs[hasMostSoFar] < numberOfBlogs[curr] ?
      curr :
      hasMostSoFar
  }
  const authorWithMostBlogs = Object.keys(numberOfBlogs).reduce(reducer, blogs[0].author)
  return {
    author: authorWithMostBlogs,
    blogs: numberOfBlogs[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  let numberOfLikes = {}
  blogs.forEach(blog => {
    numberOfLikes[blog.author] ?
      numberOfLikes[blog.author] + blog.likes :
      numberOfLikes[blog.author] = blog.likes
  })
  const reducer = (hasMostSoFar, curr) => {
    return numberOfLikes[hasMostSoFar] < numberOfLikes[curr] ? curr : hasMostSoFar
  }
  const authorWithMostLikes = Object.keys(numberOfLikes).reduce(reducer, blogs[0].author)
  return {
    author: authorWithMostLikes,
    likes: numberOfLikes[authorWithMostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}