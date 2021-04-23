import React ,{useReducer,useEffect,createContext,useContext} from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,Switch,useHistory } from 'react-router-dom'
import Navbar1 from './Navbar1'
import Signup from './Signup'
import Signin from './Signin'
import Profile from './Profile'
import LoginNavbar from './LoginNavbar'
import Home from './Home'
import LoginHome from './LoginHome'
import Createpost from './Createpost'
import Userprofile from './Userprofile'
import Myfollowingposts from './Myfollowingposts'
import { reducer, initialState } from './reducer'
import Editprofilepic from './Editprofilepic';
import Editprofile from './Editprofile'


export const UserContext = createContext();
  
const Routing = () => {
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
   if (!user)
   {
     history.push('/');
   }
   else
   {
     
    dispatch({
      type: "USER",
      payload:user,
    })
    history.push('/loginhome');
     }
  }, []) 
 
  // const userId = req.params.id;
  return (
    <Switch>
       
      <Route path='/' exact>
      <Navbar1 />
        <Home />
      </Route>
      <Route exact path='/profile'>
        <LoginNavbar />
        <Profile />
      </Route>
      <Route path="/profile/:userid">
        <LoginNavbar />
        <Userprofile />
      </Route>
      <Route path='/createpost'>
        <LoginNavbar />
        <Createpost />
      </Route>
      <Route path='/loginhome'>
        <LoginNavbar />
        <LoginHome />
      </Route>
      <Route path='/signup'>
      <Navbar1 />
        <Signup />
       </Route>
      <Route path='/signin'>
      <Navbar1 />
      <Signin />
      </Route>
      <Route path='/myfollowingposts'>
        <LoginNavbar />
        <Myfollowingposts />
      </Route>
      
      <Route path='/editprofilepic'>
        <LoginNavbar />
        <Editprofilepic/>
      </Route>
      <Route path='/editprofile'>
        <LoginNavbar />
        <Editprofile/>
      </Route>
      
     
      </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <Router>
      <Routing />
      </Router>
      </UserContext.Provider>
  );
}

export default App;
