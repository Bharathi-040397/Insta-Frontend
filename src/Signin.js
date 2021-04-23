import React,{useState,useContext} from 'react'
import Card from 'react-bootstrap/Card'
import './Signin.css'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css';
import {UserContext} from './App'


function Signin() {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const postData = () => {
         fetch("/signin",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    
                })
        
            }).then(response=> response.json())
             .then(data => {
                console.log(data)
                if (data.error)
                {  
                    M.toast({ html: data.error, classes: '#bf360c deep-orange darken-4 ' });
                }
                else
                {
                
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({
                        type: "USER",
                        payload:data.user
                    })
                    M.toast({ html: "signedin successfully", classes: 'green darken-2' });
                    history.push('/loginhome')
                    }
            }).catch(error => {
            console.log(error)
        })
    }
    
    return (
        <div>
            <Card className='signcard' style={{ width: '25rem' }}>
           <Card.Header className="signcard_title" style={{margin:'auto',backgroundColor:'white',border:'none'}}>Instagram</Card.Header>
                <Card.Body className='signcard_body' >
                    <input type='text'
                        className='input_field'
                        placeholder='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        
                    />
                    <input type="password"
                        className='input_field'
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                   
                </Card.Body>
                <Card.Footer style={{ margin: 'auto', backgroundColor: 'white', border: 'none' }}> <button className="btn btn-primary" onClick={()=>postData()}>Signin</button>
                <Link to="/signup" style={{textDecorationLine:'none'}}>  <h6 style={{ marginTop: '2rem', cursor: "pointer" }}>Don't have an Account?</h6></Link>
                </Card.Footer>
            </Card>
            
        </div>
    )

}

export default Signin
