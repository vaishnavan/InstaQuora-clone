import React, {useState} from 'react'
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

function Addpost(props) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    // const [photo, setPhoto] = useState("");

    const getData = JSON.parse(localStorage.getItem('auth'))

    const handlepost = (e) => {
        e.preventDefault();
        const postData = {
            title,
            body
        }
        axios.post("https://myinsta5.herokuapp.com/createpost", postData, {
            headers:{
                "Content-Type":"application/json",
                "Authorization":getData.token
            }
        })
        .then((res) => {
            // console.log(res)
            props.history.push('/home')
            toast.success("Posted successfully")
        })
    }

    const handleEditorChange = (e) => {
        setBody(e.target.getContent())
    }



    return (
        <div className="container mt-5">
            <div className="register_header">
                <h3 style={{textAlign:"center"}}>Create Post</h3>
            </div>
            <form>
                <div className="mb-3">
                    <label  class="form-label">Title</label>
                    <input type="text" class="form-control" onChange={(e) => setTitle(e.target.value)}   />
                </div>
                {/* <div class="mb-3">
                    <label  class="form-label">Post IMG URL</label>
                    <input type="text" class="form-control" onChange={(e) => setPhoto(e.target.value)}  />
                </div> */}
                <div className="mb-3">
                
                    <label  class="form-label">Write your short and crisp story</label>
                    <Editor
                            // onInit={(evt, editor) => editorRef.current = editor}
                            
                            init={{
                            height: 280,
                            menubar: 'insert',
                            placeholder:'Share your story taught here ....',
                            media_dimensions: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onChange={(e)=> handleEditorChange(e)}
                        /><br />
                </div>
                
                {/* <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea rows="5" class="form-control" onChange={} >
                    </textarea>
                </div> */}
                <button onClick={handlepost} type="submit" class="btn btn-primary">Post</button>
            </form>
        </div>
    )
}

export default Addpost
