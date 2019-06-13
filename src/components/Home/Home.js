import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';

import {GetData} from '../../services/GetData';

import UserFeed from "../UserFeed/UserFeed";

import '../../styles/react-confirm-alert.css';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      data:[],
      userFeed: '',
      redirectToReferrer: false,
      name:'',
    };

    this.getUserFeed = this
      .getUserFeed
      .bind(this);

    this.logout = this.logout.bind(this);
  }

  componentWillMount() {

   if(sessionStorage.getItem("access_token")){
    this.getUserFeed();
   }

   else{
    this.setState({redirectToReferrer: true});
   }
  }

  getUserFeed() {
    GetData('api/quiz/result').then((result) => {
        let responseJson = result;
        this.setState({data: responseJson.data});
        console.log(this.state);
      });
  }

  onChange(e){
    this.setState({userFeed:e.target.value});
   }
   logout(){
     sessionStorage.setItem("access_token",'');
     sessionStorage.clear();
     this.setState({redirectToReferrer: true});
   }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div className="row" id="Body">
        <div className="medium-12 columns">
        <a href="#" onClick={this.logout} className="logout">Logout</a>
        <UserFeed feedData = {this.state.data}/>
        </div>
      </div>
    );
  }
}

export default Home;
