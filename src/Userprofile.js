import React ,{useEffect,useState,useContext} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Profile.css'
import Button from 'react-bootstrap/Button'

import {useParams} from 'react-router-dom'
import { UserContext } from './App';


function Userprofile() {
    const { state, dispatch } = useContext(UserContext);
    const [userprofile, setProfile] = useState(null)
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(state);
    const { userid } = useParams();
    const [showfollow, setShowfollow] = useState(state?!state.following.includes(userid):true);
    
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },

            
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                setProfile(result);
                
            })
    }, [])
    
    const follow = () => {
        fetch('/follow', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId:userid
            })
          
        }).then(response => response.json())
            .then(result => {
                // console.log(result);
                
                dispatch({
                    type: "UPDATE",
                    payload: { following: result.following, followers: result.followers },
                
                })
                localStorage.setItem("user", JSON.stringify(result))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers:[...prevState.user.followers,result._id]
                        }
                    }
                })
     
                setShowfollow(false);
            }).catch(err => {
                console.log(err);
        })
    }
    

    const unfollow = () => {
        fetch('/unfollow', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId:userid
            })
          
        }).then(response => response.json())
            .then(result => {
                // console.log(result);
                
                dispatch({
                    type: "UPDATE",
                    payload: { following: result.following, followers: result.followers },
                
                })
                localStorage.setItem("user", JSON.stringify(result))
                setProfile((prevState) => {
                    const newfollower = prevState.user.followers.filter(item=>item != result._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers:newfollower
                        }
                    }
                })
                console.log(userprofile);
                setShowfollow(true);  
            }).catch(err => {
                console.log(err);
        })
  }

    return (
        <>
            {!userprofile ? <h2 style={{fontFamily: 'Tangerine',fontSize:'45px',fontWeight:'800',padding:'2rem'}}>Loading.....!</h2>
                :

                <div className='whole_page'>

                <div className="details">
                    <div className='img_box'>
                        <Avatar src={userprofile.user.pic} style={{ height: '150px', width: '150px', objectFit: 'contain', borderStyle:'solid',borderColor:'#b0bec5'}} />
                    </div>
                    <div className="content">
                            <h2>{userprofile.user.name}</h2>
                            <h3>{userprofile.user.about ? userprofile.user.about : userprofile.user.email}</h3>
                        <div className="followers">
                                <p><span>{userprofile.posts.length}</span>Post</p>
                                <p><span>{userprofile.user.followers.length}</span>Followers</p>
                                <p><span>{userprofile.user.following.length}</span>Following</p>
                            </div>
                            
                            {showfollow?
                                  
                                <Button className='edit' variant="outline-primary" onClick={() => follow()}>Follow</Button>  
                                :
                                <Button className='edit' variant="outline-primary" onClick={() => unfollow()}>Unfollow</Button>
                             }
                            
                        
                         
                    </div>
                </div>
                <div className="stories">
                        <h2>Highlights</h2>
                        
                    <div className="highlights">
                    <Avatar alt="" src='https://images.unsplash.com/photo-1543726969-a1da85a6d334?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1107&q=80' style={{ height: '70px', width: '70px' ,marginRight:'0.8rem',borderStyle:"solid" ,borderColor:'#f06292'}} />
                    <Avatar alt="" src="https://images.unsplash.com/photo-1554177255-61502b352de3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" style={{ height: '70px', width: '70px',marginRight:'0.8rem',borderStyle:"solid" ,borderColor:'#f06292' }} />
                    <Avatar alt="" src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" style={{ height: '70px', width: '70px',marginRight:'0.8rem',borderStyle:"solid" ,borderColor:'#f06292' }} />
                        <Avatar alt="" src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80" style={{ height: '70px', width: '70px', marginRight: '0.8rem', borderStyle: "solid", borderColor: '#f06292' }} />
                        </div>
                    </div>
                    {userprofile.posts.length>0 ? <h2>Posts</h2> : ""}
                    <div className="posts">
                        {
                           
                    userprofile.posts.map(item => {
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

export default Userprofile
