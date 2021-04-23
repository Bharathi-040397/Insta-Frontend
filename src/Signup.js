import {Link,useHistory} from 'react-router-dom'
import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import './Signup.css'
import M from 'materialize-css'


function Signup() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [about, setAbout] = useState("");
    useEffect(() => {
        if (url) {
            fetch("/signup",
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        about,
                        pic: url,
                        password,
                
                    })
    
                }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.error) {
                        M.toast({ html: data.error, classes: 'deep-orange darken-4' });
                    }
                    else {
                        
                        M.toast({ html: "Welcome", classes: 'green darken-2' });
                        
                        history.replace('/signin');
                    }
                })
        }

    },[url] )
    const postData = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Insta-users");
        data.append("cloud-name", "bharathi-clone")
        fetch("https://api.cloudinary.com/v1_1/bharathi-cloud/image/upload", {
            method: "post",
            body: data
        }).then(response => response.json())
            .then(data => {
            
                if (data.error) {
                    M.toast({ html: "Please fill all requirement field", classes: 'deep-orange darken-4' });
                }
                else {
                    setUrl(data.url)
                }
            })
            .catch(err => {
                console.log(err);
            })

           
    }
 
    return (
        <div className='signup'>
            <Card className='signcard' style={{ width: '25rem' }}>
           <Card.Header className="signcard_title" style={{margin:'auto',backgroundColor:'white',border:'none'}}>Instagram</Card.Header>
                <Card.Body className='signcard_body' >

                
                <input type='text'
                        className='input_field'
                        placeholder='name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        
                    />
                    <input type='text'
                        className='input_field'
                        placeholder='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        
                    />
                    <input type='text'
                        className='input_field'
                        placeholder='about your self'
                        value={about}
                        onChange={(e)=>setAbout(e.target.value)}
                        
                    />
                   
                    <input type="password"
                        className='input_field'
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <input type='file'
                        className='user_input_field'
                        placeholder='image'
                        onChange={(e)=>setImage(e.target.files[0])}
                        
                    />
                   
                </Card.Body>
                <Card.Footer style={{ margin: 'auto', backgroundColor: 'white', border: 'none' }}> <button className="btn btn-primary" onClick={()=>postData()}>Signup</button>
                <Link to="/signin" style={{textDecorationLine:'none'}}>  <h6 style={{ marginTop: '2rem', cursor: "pointer" }}>Already have an Account?</h6></Link></Card.Footer>
       </Card>
        </div>
    )
}

export default Signup
