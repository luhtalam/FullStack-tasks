const SimpleBlog = ({blog, onClick}) => (
  <div>
    <div class='titleAndAuthor'>
      {blog.title} {blog.author}
    </div>
    <div class='likes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog