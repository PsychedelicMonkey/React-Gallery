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
import { connect } from 'react-redux';

import Login from './modals/auth/Login';
import Logout from './modals/auth/Logout';
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
    const { isAuthenticated } = this.props;
    return (
      <Navbar color="light" light expand="md" fixed="top">
        <Container>
          <NavbarBrand tag={Link} to="/">Gallery</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              { isAuthenticated ? <Search /> : null }
              <NavItem>
                <NavLink tag={Link} to="/users">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/PsychedelicMonkey/React-Gallery">GitHub</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              { isAuthenticated ? <Logout /> : <Login /> }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(AppNavbar);
