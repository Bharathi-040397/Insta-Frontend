import {Link,useHistory} from 'react-router-dom'
import React,{useContext, useState} from 'react'
import Card from 'react-bootstrap/Card'
import './Signup.css'
import M from 'materialize-css'
import { UserContext } from './App'


function Editprofile() {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);
    const [name, setName] = useState(state? state.name:'' );
    
    const [email, setEmail] = useState(state?state.email:'' );

    const [about, setAbout] = useState( state?state.about:'' );
    const postData = () => {
        fetch("/updateprofile",
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " +localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    name,
                    email,
                    about,
                
                })

            }).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    M.toast({ html: data.error, classes: 'deep-orange darken-4' });
                }
                else {
                    localStorage.setItem("user", JSON.stringify({ ...state, name: data.name, email: data.email, about: data.about }))
                    dispatch({
                        type: "UPDATEPROFILE",
                        payload:{name:data.name,about:data.about,email:data.email}
                    })
                    M.toast({ html: "updated successfully", classes: 'green darken-2' });
                
                    history.replace('/profile');
                }
            })
    }


 
    return (
        <div className='signup'>
            <Card className='signcard' style={{ width: '25rem' }}>
           <Card.Header className="signcard_title" style={{margin:'auto',backgroundColor:'white',border:'none'}}>Instagram</Card.Header>
                <Card.Body className='signcard_body' >

                
                <input type='text'
                        className='input_field'
                        placeholder={state?state.name:""}
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        
                    />
                    <input type='text'
                        className='input_field'
                        placeholder={state?state.email:''}
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                       
                        
                    />
                    <input type='text'
                        className='input_field'
                        placeholder={state?state.about:""}
                        value={about}
                        onChange={(e)=>setAbout(e.target.value)}
                        
                    />
                   
                     
                   
                </Card.Body>
                <Card.Footer style={{ margin: 'auto', backgroundColor: 'white', border: 'none' }}> <button className="btn btn-primary" onClick={()=>postData()}>update</button>
                </Card.Footer>
       </Card>
        </div>
    )
}

export default Editprofile
