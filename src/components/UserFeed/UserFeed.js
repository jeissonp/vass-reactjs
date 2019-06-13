import React, {Component} from 'react';
import Linkify from 'react-linkify';
import './UserFeed.css';
import TimeAgo from 'react-timeago';
class UserFeed extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let userFeed = this
      .props
      .feedData
      .map(function (feedData, index) {
        return (
          <div>
              {feedData.date}
              {feedData.title}
              {feedData.response}
          </div>
        )
      }, this);

    return (
      <div>
        {userFeed}
      </div>
    );
  }

}

export default UserFeed;
