import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import './Login.css';

class Login extends Component {

  constructor(){
    super();

    this.state = {
      grant_type: 'password',
      client_id: '32f92bf1-3125-45d4-8db9-428e3b46c753',
      username: '',
      password: '',
      redirectToReferrer: false
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    if(this.state.username && this.state.password){
      PostData('login',this.state).then((result) => {
        let responseJson = result;
        if(responseJson.userData){
          sessionStorage.setItem('userData',JSON.stringify(responseJson));
          this.setState({redirectToReferrer: true});
        }
      });
      var formData  = new FormData();

      for(var name in this.state) {
        formData.append(name, this.state[name]);
      }

      (new Promise((resolve, reject) =>{
        fetch('http://dev-tesvasslatam.pantheonsite.io/oauth/token', {
          method: 'POST',
          body: formData
        })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });

      })).then((result) => {
        let responseJson = result;
        sessionStorage.setItem('access_token',responseJson.access_token);
        this.setState({redirectToReferrer: true});
      });
    }
   }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }


  render() {

     if (this.state.redirectToReferrer && sessionStorage.getItem('access_token')) {
      return (<Redirect to={'/home'}/>)
    }

    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'}/>)
    }

     return (
      <div className="row" id="Body">
        <div className="medium-5 columns left">
        <h4>Login</h4>
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
        <label>Password</label>
        <input type="password" name="password"  placeholder="Password" onChange={this.onChange}/>
        <input type="submit" className="button success" value="Login" onClick={this.login}/>
        </div>
      </div>
    );
  }
}

export default Login;
