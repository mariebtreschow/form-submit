import React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
import _ from 'lodash';

const validateUser = (user) => {
  return (user.username && user.company && user.country && user.createdAt) ? true : false;
};

const formatDate = (date) => {
  return (new Date(date)).toUTCString();
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

      if (validateUser(userInDb)){
        this.setState({ user : userInDb });
      }
      if (userInDb.message) {
        this.setState({ message : userInDb.message });
      }
    }).catch((error) => {
      this.setState({
        message : `Something happened while retrieving the user!`
      });
    });
  }

  handleClick = () => {
    history.push(`/users`, { timestamp: null });
    window.location.reload();
  }

  render = () => {
    if (this.state.user) {
    return (
        <Container className="userInfo">
          <Row>
            <Col className="col__username" sm={{ size: 6,  offset: 3 }}>
              <h4>Username:</h4>
              {this.state.user.username}
            </Col>
          </Row>
          <Row>
            <Col className="col__company" sm={{ size: 6, offset: 3 }}>
              <h4>Company:</h4>
              {this.state.user.company}
            </Col>
          </Row>
          <Row>
            <Col className="col__country" sm={{ size: 6, offset: 3 }} >
              <h4>Country:</h4>
              {this.state.user.country}
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <h4>Created at:</h4>
              {formatDate(this.state.user.createdAt)}
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <Button onClick={this.handleClick} className="btn-lg">Go Back</Button>
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <Container className="userNotFound">
        <Row>
          <Col sm={{ size: 6,  offset: 3 }}>
            <p>Sorry! {this.state.message}...</p>
          </Col>
        </Row>
        <Button onClick={this.handleClick}>Go Back</Button>
      </Container>
    );
  }
}
