import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [blogs, setBlogs] = useState([])
    const [allBlogs, setAllBlogs] = useState([])
    const [author, setAuthor] = useState("All")

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
            </div>

            
            { blogs.map(blog => {
                return <Blog
                key={ blog.id }
                blogsProp={ blog }
                />
            }) }

            <input type="number" value={ limit } onChange={ e => setLimit(e.target.value) }/>
            <input type="number" value={ page } onChange={ e => setPage(e.target.value) }/>

        </div>
    )

}

export default App