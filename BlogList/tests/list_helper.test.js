const list = require('../utils/list_helper')

test('dummy is called', () => {
    const blogs = []

    const result = list.dummy(blogs)
    expect(result).toBe(1)
})

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithFewBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a673334d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'John Gill',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676444d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
    },
    {
        _id: '5a422aa71454a676444d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Taylor Swift',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 4,
        __v: 0
    }
]

describe('total likes', () => {

    test('of empty list is zero', () => {
        expect(list.totalLikes([])).toBe(0)
    })

    test('of list that has only one blog equals the likes of that', () => {
        expect(list.totalLikes(listWithOneBlog)).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        expect(list.totalLikes(listWithFewBlogs)).toBe(17)
    })
})

describe('favorite blog', () => {

    test('of empty list is undefined', () => {
        expect(list.favoriteBlog([])).toBe(undefined)
    })

    test('of list with one blog is that blog', () => {
        expect(list.favoriteBlog(listWithOneBlog)).toBe(listWithOneBlog[0])
    })

    test('of a bigger list is calculated right', () => {
        expect(list.favoriteBlog(listWithFewBlogs)).toBe(listWithFewBlogs[1])
    })

})

describe('most blogs', () => {

    test('of empty list is undefined', () => {
        expect(list.favoriteBlog([])).toBe(undefined)
    })

    test('of list with one blog has on the author of that blog', () => {
        expect(list.mostBlogs(listWithOneBlog)).toEqual({
            author: listWithOneBlog[0].author,
            blogs: 1
        })
    })

    test('of a bigger list is calculated right', () => {
        expect(list.mostBlogs(listWithFewBlogs)).toEqual({
            author: listWithOneBlog[0].author,
            blogs: 2
        })
    })
})

describe('most likes', () => {

    test('of empty list is undefined', () => {
        expect(list.favoriteBlog([])).toBe(undefined)
    })

    test('of list with one blog has on the author of that blog', () => {
        expect(list.mostLikes(listWithOneBlog)).toEqual({
            author: listWithOneBlog[0].author,
            likes: 5
        })
    })

    test('of a bigger list is calculated right', () => {
        expect(list.mostLikes(listWithFewBlogs)).toEqual({
            author: listWithFewBlogs[1].author,
            likes: 7
        })
    })
})