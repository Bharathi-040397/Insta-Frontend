import React ,{useContext,useEffect,useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Profile.css'
import Button from 'react-bootstrap/Button'
import { UserContext } from './App'
import { Link, useHistory } from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';



function Profile() {
    const [post, setPost] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory();
    useEffect(() => {
        fetch("/mypost", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },

            
        }).then(response => response.json())
            .then(result => {
                setPost(result.mine);
            })
    }, [])
    return (
    <>
        {!state ? <h2 style={{ fontFamily: 'Tangerine', fontSize: '45px', fontWeight: '800', padding: '2rem' }}>Loading.....!</h2>
            :
            
                <div className='whole_page'>
        
                    <div className="details">
                        <div className='img_box' >
                            <Avatar src={state.pic} style={{ height: '150px', width: '150px', objectFit: 'contain', borderStyle: 'solid', borderColor: '#b0bec5' }} />
                          <Link to="/editprofilepic">  <div id="profileicon" >
                          <AddCircleOutlineIcon style={{fontSize:'40px'}} className="addicon" />
                            </div>
                            </Link>
                        </div>
                       
                        <div className="content">
                            <h2>{state.name}</h2>
                            <h3>{state.about}</h3>
                            <div className="followers">
                                <p><span>{post.length}</span>Post</p>
                                <p><span>{state.followers.length > 0 ? state.followers.length : "0"}</span>Followers</p>
                                <p><span>{state.following.length > 0 ? state.following.length : "0"}</span>Following</p>
                            </div>
                        
                            <Link to="/editprofile" style={{marginRight:'0.5rem'}}>  <Button className='edit' variant="outline-primary" >Edit Profile</Button></Link>
                              
                        </div>
                    </div>
                    <div className="stories">
                        <h2>Highlights</h2>
                        <div className="highlights">
                            <Avatar alt="" src='https://images.unsplash.com/photo-1543726969-a1da85a6d334?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1107&q=80' style={{ height: '70px', width: '70px', marginRight: '0.8rem', borderStyle: "solid", borderColor: '#f06292' }} />
                            <Avatar alt="" src="https://images.unsplash.com/photo-1554177255-61502b352de3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" style={{ height: '70px', width: '70px', marginRight: '0.8rem', borderStyle: "solid", borderColor: '#f06292' }} />
                            <Avatar alt="" src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" style={{ height: '70px', width: '70px', marginRight: '0.8rem', borderStyle: "solid", borderColor: '#f06292' }} />
                            <Avatar alt="" src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80" style={{ height: '70px', width: '70px', marginRight: '0.8rem', borderStyle: "solid", borderColor: '#f06292' }} />
                        </div>
                    </div>
                    {post.length > 0 ? <h2>Posts</h2> : ''}
                    <div className="posts">
                        {
                            post.map(item => {
                                return (
                                    <img alt="" src={item.pic} />
                                )
                            })
                        }
                
                
                    </div>
                    
    
                       
                </div>
            
}
            
</>
    )
            
}

export default Profile
