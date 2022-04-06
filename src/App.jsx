import { useState, useEffect } from "react"
import EditBlog from "./components/EditBlog"
import Blog from "./components/Blog"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [blogs, setBlogs] = useState([])
    const [allBlogs, setAllBlogs] = useState([])
    const [author, setAuthor] = useState("All")
    const [toggle, setToggle] = useState(false)
    const [text, setText] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`https://6239ddb128bcd99f02763cfe.mockapi.io/blogs?limit=${limit}&page=${page}`)
            const json = await data.json()
            setBlogs(json)
            setAllBlogs(json)
            return json
            }
            fetchData()
        }, [limit, page])

    const filterAuthor = () => {
        if(author === "All") {
            setBlogs(allBlogs)
        }
        else {
            const authorsBlog = blogs.filter(blog => {
                return blog.author === author
            })
            setBlogs(authorsBlog)
        }
    }

    const changeToggle = () => {
        setToggle(prevState => !prevState)
    }

    const submitUpdate = (id) => {
        const mappedBlog = allBlogs.map(blog => {
            const updatedBlog = blog
            if(blog.id === id) {
                updatedBlog.text = text
            } 
            return updatedBlog
        })
        setAllBlogs(mappedBlog)
    }

    const changeText = e => {
        setText(e.target.value)
    }

    return (
        <div className='App'>

            <div className="filter">
                <label>Filter by Author:</label>
                <select onChange={ e => setAuthor(e.target.value) } value={ author }>
                    <option value="All">All</option>
                    { blogs.map(blog => {
                        return <option key={ blog.id } value={ blog.author }>{ blog.author }</option>
                    }) }
                </select>
                <button onClick={ filterAuthor }>Filter</button>
                { blogs.length === 1
                ? <button onClick={ changeToggle }>Edit</button>
                : ""
                }
            </div>

            <div className="inputs">
                { blogs.length > 1
                ? (
                    <>
                        <label>Limit: </label>
                        <input type="number" value={ limit } onChange={ e => setLimit(e.target.value) }/>
                        <label>Page: </label>
                        <input type="number" value={ page } onChange={ e => setPage(e.target.value) }/>
                    </>
                )
                : (
                    <></>
                )}
            </div>

            
            { blogs.map(blog => {
                return <Blog
                key={ blog.id }
                blogsProp={ blog }
                />
            }) }

            { toggle === true
                ? <EditBlog
                    blogsProp={ blogs[0] }
                    changeTextProp={ changeText }
                    submitUpdateProp={ submitUpdate }
                />
                : ""
            }

        </div>
    )
}

export default App