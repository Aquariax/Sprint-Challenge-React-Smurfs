import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

import { Route } from 'react-router-dom';
import axios from 'axios'
import { NavLink, withRouter } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount(){
    axios.get('http://localhost:3333/smurfs')
    .then((response) =>{
      this.setState(() =>({smurfs: response.data}))
    })
    .catch(err=>console.log(err))
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  postSmurf = smurf =>{
    axios.post('http://localhost:3333/smurfs', smurf)
    .then(res=>{
      console.log(res)
      this.setState({smurfs: res.data})
    })
    .catch(err=> console.log(err))
  }
  render() {
    return (
      <div className="App">
      <div className = 'nav'>
          <NavLink className = 'nav-item'to='/'>Home</NavLink>
          <NavLink className = 'nav-item'to = '/smurf-form'>create smurf</NavLink>
      </div>
        <Route exact path='/' 
        render={props =>(
        <Smurfs smurfs={this.state.smurfs} {...props}/>)}
        />
        <Route path = '/smurf-form'
        render ={props =>(
          <SmurfForm {...props} postSmurf={this.postSmurf}/>
        )}
        />
      </div>
    );
  }
}

export default withRouter(App);
