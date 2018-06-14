import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import RegisteredUser from './RegisteredUser';
import _ from 'lodash';

export default class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      error: '',
      timestamp: ''
    }
  }

  handleFormSubmit = (e) => {
    console.log(this)
    e.preventDefault();
    const country = e.target.elements.country.value.trim();
    const company = e.target.elements.company.value.trim();
    const username = e.target.elements.username.value.trim();

    axios.post(`${process.env.BACKEND_HOST}/users`, {
      username: username,
      company: company,
      country: country
    })
    .then((response) => {
      this.setState({
        timestamp: response.data.timestamp
      });

      if (response.data.type === 'unique violation') {
        return Swal({
          type: 'error',
          title: 'Validation issues',
          text: response.data.message,
        });
      }
      if (response.data.success) {
        return Swal('You are now registered!');
      }

    }).catch((error) => {
      this.setState({
        error: error.response
      });

      if (error.response && error.response.data.error) {
        const listErrors = _.map(error.response.data.error.extra, values => values);
        return Swal({
          type: 'error',
          title: 'Validation issues',
          text: error.response.data.error.message,
          text: `${listErrors}`
        });
      }
    });
  }

  render = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <form className="col-6 offset-3 pt-3" onSubmit={this.handleFormSubmit}>
            <label className="username" for="username">Username:</label>
            <div className="form-group">
              <input className="form-control" type="text" name="username" />
            </div>
            <label className="company" for="company">Company:</label>
            <div className="form-group">
              <input className="form-control" type="text" name="company" />
            </div>
            <label className="country" for="country">Country:</label>
            <div className="form-group">
              <input className="form-control" type="text" name="country" />
            </div>
            <button className="button btn btn-primary btn-lg btn-block">Register</button>
          </form>
        </div>
      </div>
    );
  }
}
