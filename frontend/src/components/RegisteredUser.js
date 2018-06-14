import React from 'react';
import axios from 'axios';
import _ from 'lodash';

export default class RegisteredUser extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidMount = () => {
    axios.get(`${process.env.BACKEND_HOST}/users/${this.props.match.params.id}`)
    .then((user) => {
      let userInDb = user.data;

      if (userInDb.message) {
        this.setState({
          message : user.data.message
        });
      }
      this.setState({ user : userInDb });

    }).catch((error) => {
      console.log(error)
    });
  }

  render = () => {
    return (
      <div className="user">
        {this.state.user ? this.state.user.country : this.state.message}
      </div>
    );
  }
}
