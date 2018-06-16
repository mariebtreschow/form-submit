import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router';
import RegisteredUser from './RegisteredUser';
import { FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import { Container} from 'reactstrap';
import generateMessage from '../lib/error-handler';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory'
const history = createHistory();

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
      if (response.data.success) {
        history.push(`/users/${response.data.timestamp}`, { timestamp: response.data.timestamp });
        window.location.reload();
        return Swal('You are now registered!');
      }
      if (response.data.type === 'unique violation') {
        return Swal({
          type: 'error',
          title: 'Validation issues',
          text: response.data.message,
        });
      }

    }).catch((error) => {
      this.setState({
        error: error.response
      });
      if (error.response && error.response.data.error) {
        const message = error.response.data.error.message;
        const listErrors = _.map(error.response.data.error.extra, values => values);
        return Swal({
          type: 'error',
          title: 'Oops, take another look',
          html: generateMessage(message, listErrors),
        });
      }
    });
  }

  render = () => {
    return (
        <Container>
          <form className="col-6 offset-3" onSubmit={this.handleFormSubmit}>
             <FormGroup bsSize="large">
             <ControlLabel className="username">Username:</ControlLabel>
               <FormControl
                 type="text"
                 name="username"
                 value={this.state.value}
                 placeholder="Username"
               />
             <ControlLabel className="company">Company:</ControlLabel>
               <FormControl
                 type="text"
                 name="company"
                 value={this.state.value}
                 placeholder="Company"
               />
             <ControlLabel className="country">Country:</ControlLabel>
               <FormControl
                 type="text"
                 name="country"
                 value={this.state.value}
                 placeholder="Country"
               />
             </FormGroup>
          <Button className="button btn btn-primary btn-lg btn-block" type="submit">Register</Button>
       </form>
     </Container>
    );
  }
}
