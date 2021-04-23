
import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import './Createpost.css'
import M from 'materialize-css'


function Createpost() {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [describe, setDescribe] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (url) {
            fetch("/createpost",
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        title,
                        describe,
                        pic: url
                    })
    
                }).then(response => response.json())
                .then(data => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: 'deep-orange darken-4' })
                    }
                    else {
                        console.log(data);
                
                        M.toast({ html: 'Posted Successfully', classes: 'light-blue' })
                        history.replace('/loginhome')
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [url])   
    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Insta-clone");
        data.append("cloud-name", "bharathi-clone")
        fetch("https://api.cloudinary.com/v1_1/bharathi-cloud/image/upload", {
            method: "post",
            body: data
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err);
            })

           
    }
    return (
      <div className="createpost">
        <div className="card">
                <input className="post_input_field"
                    placeholder='title'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)} />
                <input className="post_input_field"
                    placeholder="Describe post"
                    value={describe}
                    onChange={(e)=>setDescribe(e.target.value)}/>
            <div className='upload'>
                
                    <input className="post_input_field1"
                        type='file'
                        style={{ marginTop: '1.5rem' }}
                        onChange={(e)=>setImage(e.target.files[0])}
                    placeholder="Upload"/>
                </div>
                <button className='btn btn-primary' onClick={()=>postDetails()}>Upload</button>
            </div>  
            </div>
    )
}

export default Createpost
