import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Blog(props) {
    return (
        <div className='App'>

            <div className='card'>
                <div className='card-body'>
                    <h4 className='card-title'> Title: { props.blogsProp.title }</h4>
                    <p className="card-text">{ props.blogsProp.text }</p>
                    <p className="card-text">Author: { props.blogsProp.author }</p>
                </div>
            </div>

        </div>
    )
}

export default Blog