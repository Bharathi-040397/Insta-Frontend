import React,{useContext,useState,useRef,useEffect} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav";
import { Link, useHistory } from 'react-router-dom'
import './LoginNavbar.css'
import Avatar from '@material-ui/core/Avatar';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleIcon from '@material-ui/icons/People';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import SearchIcon from '@material-ui/icons/Search';
import { UserContext } from './App'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import M from 'materialize-css'





function LoginNavbar() {
    const searchModal = useRef(null);
    const [search, setSearch] = useState('')
    const [userdetail, setUserdetail] = useState([]);
    const { state, dispatch } = useContext(UserContext)
    const user = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();
    useEffect(() => {
      M.Modal.init(searchModal.current)  
    }, [])
    
    const fetchUser = (query) => {
        setSearch(query);
        fetch('/searchUser', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                query
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                    setUserdetail(result);
            })
        
        
    }
    
    return (
        <div>
            <Navbar className="lognavbar" bg="light" expand="lg">
            <Navbar.Brand className="lognav_brand"><Link to={state?"/loginhome":"/"} style={{ textDecorationLine: 'none' }}>Instagram</Link></Navbar.Brand>
                
                <Navbar.Toggle className="toggler" style={{backgroundColor:'white'}}aria-controls="collapse" />
                  <Navbar.Collapse   id="#collapse">

                   <Nav className="lognav_item">
                   <Nav.Link className="lognav_link "><SearchIcon className="modal-trigger" data-target="modal1" style={{ fontSize: 32 }} color='primary' /></Nav.Link>
                   <Nav.Link className="lognav_link"><Link to="/loginhome" style={{ textDecorationLine: 'none' }}><HomeOutlinedIcon style={{ fontSize: 32 }} color='primary' /></Link></Nav.Link>
                    <Nav.Link className="lognav_link"><Link to="/myfollowingposts" style={{ textDecorationLine: 'none' }}><PeopleIcon style={{ fontSize: 30 }} color='primary' /></Link></Nav.Link>
                    <Nav.Link className="lognav_link"><Link to="/createpost" style={{ textDecorationLine: 'none' }}><AddBoxOutlinedIcon style={{fontSize:30}} color='primary'/></Link></Nav.Link>
                        <Nav.Link className="lognav_link" onClick={() => {
                            localStorage.clear();
                            dispatch({
                                type: "CLEAR",
                                
                            })
                            history.push('/signin');
                        }}> <ExitToAppIcon style={{ fontSize: 30 }} color='primary' /></Nav.Link>
                        <Nav.Link className="lognav_link"><Link to="/profile" style={{ textDecorationLine: 'none' }}> <Avatar src={state? state.pic : "/static/images/avatar/1.jpg"} style={{ marginTop: '10px', borderStyle: "solid", borderColor: '#b0bec5', height: '50px', width: '50px' }}></Avatar></Link></Nav.Link>
                    
               </Nav>
                </Navbar.Collapse>
                
                <div id="modal1" className="modal" ref={searchModal} style={{maxWidth:'50%',height:'auto',WebkitOverflowScrolling:'auto',fontSize:'35px',fontWeight: '800' }}>
                    <div className="modal-content">
                    <input type='text'
                        className='input_field'
                        placeholder="search profile"
                        value={search}
                        onChange={(e)=>fetchUser(e.target.value)}
                        
                        />
                        
                        {userdetail.length === 0 ? <h2 style={{ fontFamily: 'Tangerine', fontSize: '25px', fontWeight: '800', padding: '2rem' }}>No user found</h2>
                            :
                                
                                userdetail.map(item => {
                        
                                    return <h5 style={{ fontSize: '16px' }} onClick={() => {
                                        return M.Modal.getInstance(searchModal.current).close(),
                                            setSearch("")
                                            
                                
                                    }}><Link to={item._id == state._id ? '/profile' : `/profile/${item._id}`} style={{ display: 'flex', alignItems: 'center' }}
                                    ><Avatar src={item.pic} style={{ height: '35px', width: '35px', marginRight: '8px' }}></Avatar>{item.name}</Link></h5>
                            
                                    
                                       
                                    
                                })
                        }
                        
                        
                        

                                
   


                                                </div>
                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat"  onClick={() =>setSearch("")}>close</button>
                    </div>
                </div>
                            
          
        
      </Navbar>
            
        </div>
    )
}

export default LoginNavbar
