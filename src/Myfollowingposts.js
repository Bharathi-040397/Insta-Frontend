import React, { useEffect, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import './LoginHome.css'
import {UserContext} from './App'
import { Avatar } from '@material-ui/core';
import ClearAllIcon from '@material-ui/icons/ClearAll';



function Myfollowingposts() {
    const { state, dispatch } = useContext(UserContext); 
    const [data, setData] = useState([]);
    

    useEffect(() => {
        fetch("/getsubscribe", {
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                setData(result.posts);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const likepost = (id) => {
        fetch('/like', {
            method:"put",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId:id,
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                const newData = data.map(item => {
                    if (item._id === result._id)
                    {
                        
                        return result;
                        
                        
                    }
                    else {
                        
                        return item;
                    }
                   
                })
                setData(newData);
            }).catch(err => {
                console.log(err);
        })
    }
    
    const unlikepost = (id) => {
        fetch('/unlike', {
            method:"put",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId:id,
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                const newData = data.map(item => {
                    if (item._id === result._id)
                    {
                        
                        return result;
                        
                    }
                    else {
                        
                        return item;
                    }
                })
                setData(newData);
            }).catch(err => {
                console.log(err);
        })
    }
    
    const commentpost = (text,postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text,
                postId,
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                const newData = data.map(item => {
                    if (item._id === result._id)
                    {
                        return result
                    }
                    else
                    {
                        return item
                     }
                })
                setData(newData)
            }).catch(err => {
            console.log(err)
        })
    }


    const deletepost = (id) => {
        fetch(`/deletepost/${id}`, {
            method: "delete",
            headers: {
                
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },

        }).then(response => response.json())
            .then(result => {
                const newData = data.filter(item => {
                    return item._id !== result._id;
                })
                setData(newData)
            }).catch(err => {
                console.log(err);
        })
}

    
    
    return (
        <div className="login_home"> 
            {
                data.map(item => {
                    
                    return (
                        <div className="card" >
                            {item.postedBy._id === state._id &&
                                <div className='clear'>
                                <ClearAllIcon onClick={()=>deletepost(item._id)} style={{cursor:'pointer'}}  />
                                </div>
                            }
                            
                        <div className='card-title'>
                                <h5 ><Link to ={item.postedBy._id !== state._id?'/profile/'+item.postedBy._id:'/profile'} style={{display:'flex',alignItems:'center'}} ><Avatar src={item.postedBy.pic} style={{ height: '35px', width: '35px', marginRight: '8px' }}></Avatar>{item.postedBy.name}</Link></h5>
                                
                                
                                
                        </div>
                        <div className="card-body">
                            <img alt="" src={item.pic} />
                        </div>
                            <div className="card-footer">
                                <h6 className='post_title'>{item.title}</h6>
                                <p > {item.describe}</p>
                                <div className="btn_group">
                                    <div>
                                        
                                        
                                        {item.likes.includes(state._id)
                                    
                                            ?
                                            [
                                            <i className="material-icons" id="unlike" >favorite</i>,
                                         <i className="material-icons" id="unlike" onClick={()=>{unlikepost(item._id)}} >thumb_up</i>
                                            ]
                                            :
                                            [
                                        <i className="material-icons ">favorite</i>,
                                        <i className="material-icons"  onClick={() => { likepost(item._id) }}  >thumb_up</i>  
                                            ]
                                            }
                                        
                                        </div>
                                    <div >
                                <i className="material-icons" id='bookmark' >bookmark_border</i>
                    
                                    </div>
                                    
                                </div>
                
                                <h6>{item.likes.length} likes</h6>
                                
                                
                                {
                                    item.comments.map(comment => {
                                        return(
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',marginBottom:'0.2rem' }}>
                                                <div style={{  display: 'flex', alignItems: 'center' }}><Link to ={comment.postedBy._id !== state._id?'/profile/'+comment.postedBy._id:'/profile'}style={{ display: "flex", alignItems: 'center', textDecoration: "none" }}><Avatar src={comment.postedBy.pic} style={{ height: '15px', width: '15px', marginRight: '3px',marginTop:'-4px' }}></Avatar><span style={{ fontSize: '13px',marginTop:'-4px' }}>{comment.postedBy.name}</span></Link><span style={{ fontWeight: '400', fontSize: '10px' }}>{comment.text}</span></div>
                                                
                                            </div>
                                        )
                                    })
                                    }
                                 
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                 commentpost(e.target[0].value, item._id)
                                }}>
                            <input
                                className="comment"
                                placeholder='Add a comment' />
                              </form>
                        </div>
                    </div>
                    )
                    
              })
                        
                    
                         
            }
            
        </div>
    )
}

export default Myfollowingposts
