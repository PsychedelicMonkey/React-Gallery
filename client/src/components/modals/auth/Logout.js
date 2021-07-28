import React, { Component, Fragment } from 'react'
import {
  NavItem,
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

class Logout extends Component {
  logout = () => {
    this.props.logoutUser();
  }
  
  render() {
    return (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.logout} href="#">Log Out</NavLink>
        </NavItem>
      </Fragment>
    );
  }
}

export default connect(null, { logoutUser })(Logout);
