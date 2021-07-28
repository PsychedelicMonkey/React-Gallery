import React, { Component } from 'react'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import Login from './modals/auth/Login';
import Search from './modals/Search';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="light" light expand="md" fixed="top">
        <Container>
          <NavbarBrand tag={Link} to="/">Gallery</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <Search />
              <NavItem>
                <NavLink tag={Link} to="/users">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/PsychedelicMonkey/React-Gallery">GitHub</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <Login />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AppNavbar;
