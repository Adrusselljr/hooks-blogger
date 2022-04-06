import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function EditBlog(props) {
    return (
        <div className='App'>

            <div className='card'>
                <div className='card-body'>
                    <h4 className='card-title'> Title: { props.blogsProp.title }</h4>
                    <textarea onChange={ props.changeTextProp } style={{ width: "1000px" }} className="card-text" cols="30" rows="10">{ props.blogsProp.text }</textarea>
                    <p className="card-text">Author: { props.blogsProp.author }</p>
                </div>
            </div>

            <button onClick={() => props.submitUpdateProp(props.blogsProp.id) }>Submit</button>
        
        </div>
    )
}

export default EditBlog