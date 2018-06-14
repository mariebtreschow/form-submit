import React from 'react';
import axios from 'axios';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit(e) {
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
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <form className="col-6 offset-3 pt-3" onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <input className="form-control" type="text" name="username" />
            </div>
            <div className="form-group">
              <input className="form-control" type="text" name="company" />
            </div>
            <div className="form-group">
              <input className="form-control" type="text" name="country" />
            </div>
            <button className="button btn btn-primary btn-lg">Register</button>
          </form>
        </div>
      </div>
    );
  }
}
