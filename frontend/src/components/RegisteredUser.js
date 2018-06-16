import React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import _ from 'lodash';

const validateUser = (user) => {
  if(user.username && user.company && user.country && user.createdAt) {
    return true;
  }
  return false;
};

export default class RegisteredUser extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidMount = () => {
    axios.get(`${process.env.BACKEND_HOST}/users/${this.props.timestamp ? this.props.timestamp : this.props.match.params.id}`)
    .then((user) => {
      let userInDb = user.data;
      if (userInDb.message) {
        this.setState({
          message : userInDb.message
        });
      }
      if (validateUser(userInDb)){
        this.setState({ user : userInDb });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render = () => {
    return (
      <Container className="userInfo">
        <Row>
          <Col sm={{ size: 6,  offset: 3 }}
            >
            <h4>Username:</h4>
            {this.state.user ? this.state.user.username : this.state.message}
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h4>Company:</h4>
            {this.state.user ? this.state.user.company : this.state.message}
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h4>Country:</h4>
            {this.state.user ? this.state.user.country : this.state.message}
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h4>CreatedAt:</h4>
            {this.state.user ? this.state.user.createdAt : this.state.message}
          </Col>
        </Row>
      </Container>
    );
  }
}
