import React, { Component, Fragment } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavItem,
  NavLink,
} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',

      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = e => {
    e.preventDefault();

    alert(JSON.stringify(this.state));
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.toggle} href="#">Log In</NavLink>
        </NavItem>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Log In</ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">Log In</Button>
              <Button onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default Login;
