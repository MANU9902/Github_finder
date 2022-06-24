import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Users from './components/Users';
import Search from './components/Search';
import UserDetail from './components/UserDetail';

function App() {
const [users, setUsers] = useState([]);
const [user, setUser] = useState({});
const [repos, setRepos] = useState([]);


//   useEffect(async()=> {
//  //axios return a promise => asyncronus operation
//  //The api can be anything ,written by your backend developer r yourself (fullstack)
//  const res = await axios.get('https://api.github.com/users');
//  console.log(res);
//  //update the users state.->[] ->[30 github users]
//  setUsers(res.data);
//   },[])

const searchName = async(name) => {
  const res = await axios.get(`https://api.github.com/search/users?q=${name}`)
  setUsers(res.data.items)
}

const clearUsers = () => {
  setUsers([])
}

//to get details of a individual users
const getDetails = async(login) => {
  const res = await axios.get(`https://api.github.com/users/${login}`)
  setUser(res.data)
}

const getRepo = async(username) => {
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=asc`)
  setRepos(res.data)
}

  return (
    <Route>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" render = {
            props => (
              <>
              <Search searchName={searchName} showClear={users.length > 0 ? true:false} clearUsers={clearUsers} />
              <Users users={users} />
              </>
            )
          }
     />
      <Route path="/about" component={About} exact />
      <Route exact path="/user/:anything" render={
        props => (
          <UserDetail getDetails={getDetails} user={user} {...props} getRepo={getRepo} repos={repos} />
        )
      }  />
      </Switch>
      </div>
    </Route>
  );
}

export default App;
