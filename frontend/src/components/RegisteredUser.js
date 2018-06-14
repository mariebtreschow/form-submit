import React from 'react';
import axios from 'axios';

export default class RegisteredUser extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user : []
    };
  }

  componentDidMount = () => {
    axios.get(`${process.env.BACKEND_HOST}/users/${this.props.match.params.id}`)
    .then((user) => {
      if (user.data.message) {
        this.setState(() => {
          this.state.user.push(user.data.message);
        });
      }
      this.setState(() => {
        state.user.push(user.data);
      });

    }).catch((error) => {
      console.log(error)
    });
  }

  render = () => (
      <div>
        {this.state.user}
      </div>
    );

}
