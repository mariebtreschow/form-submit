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
      //handle response save timestamp to render user from database and render other component

    })
    .catch((error) => {
      console.log(error);
    });

  }
  //add error information if provided wrong country etc, add dropdown for country?

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <form className="col-6 offset-3 pt-3" onSubmit={this.handleFormSubmit}>
            <label for="username">Username:</label>
            <div className="form-group">
              <input className="form-control" type="text" name="username" />
            </div>
            <label for="company">Company:</label>
            <div className="form-group">
              <input className="form-control" type="text" name="company" />
            </div>
            <label for="Country">Country:</label>
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
