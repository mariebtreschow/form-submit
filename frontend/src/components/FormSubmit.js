import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import RegisteredUser from './RegisteredUser';
import { FormGroup, Button, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Container} from 'reactstrap';
import _ from 'lodash';
import generateMessage from '../lib/error-handler';

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
        const message = error.response.data.error.message;
        const listErrors = _.map(error.response.data.error.extra, values => values);
        return Swal({
          type: 'error',
          title: 'Validation issues',
          html: generateMessage(message, listErrors),
        });
      }
    });
  }

  render = () => {
    if (this.state.timestamp) {
      return (
        <RegisteredUser timestamp={this.state.timestamp}/>
      );
    }
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
             <FormControl.Feedback />
          </FormGroup>
          <Button className="button btn btn-primary btn-lg btn-block" type="submit">Register</Button>
       </form>
     </Container>
    );
  }
}
