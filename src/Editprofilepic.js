
import {useHistory} from 'react-router-dom'
import React,{useState,useEffect, useContext} from 'react'
import Card from 'react-bootstrap/Card'
import './Signup.css'
import { UserContext } from './App'


function Editprofilepic() {
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        if (url) {
            fetch("/updatepic",
                {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " +localStorage.getItem('jwt')
                    },
                    body: JSON.stringify({
                        
                        pic: url,
                
                
                    })
    
                }).then(response => response.json())
                .then(result => {
                    localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                    dispatch({
                        type: "UPDATEPIC",
                        payload:result.pic,
                    })
      
                        
                    history.replace('/profile');
                    
                       
    
                })
                
        }

    },[url] )
    const updatepic = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Insta-users");
        data.append("cloud-name", "bharathi-clone")
        fetch("https://api.cloudinary.com/v1_1/bharathi-cloud/image/upload", {
            method: "post",
            body: data
        }).then(response => response.json())
            .then(data => {
                setUrl(data.url)
                           })
            .catch(err => {
                console.log(err);
            })

           
    }
 
    return (
        <div>
            <Card className='signcard' style={{ width: '25rem' }}>
           <Card.Header className="signcard_title" style={{margin:'auto',backgroundColor:'white',border:'none'}}>Instagram</Card.Header>
                <Card.Body className='signcard_body' >

                
                    <input type='file'
                        className='user_input_field'
                        placeholder='image'
                        onChange={(e)=>setImage(e.target.files[0])}
                        style={{ padding:'auto',paddingBottom:'3rem'}}
                    />
                   
                </Card.Body>
                <Card.Footer style={{ margin: 'auto', backgroundColor: 'white', border: 'none' }}> <button className="btn btn-primary" onClick={updatepic()} >Update</button></Card.Footer>
               
       </Card>
        </div>
    )
}

export default Editprofilepic
