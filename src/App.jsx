import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                `https://6239ddb128bcd99f02763cfe.mockapi.io/blogs?limit=${limit}&page=${page}`
            )
            const json = await data.json()
            setBlogs(json)
            return json
            }
            fetchData()
        }, [limit, page])

    return (
        <div className='App'>

            <h1>Hello World!</h1>

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