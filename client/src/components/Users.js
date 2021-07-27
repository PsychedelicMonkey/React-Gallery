import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch('/api/users')
    .then(res => res.json())
    .then(data => this.setState({ users: data, }));
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Name</th>
              <th>Photo Count</th>
            </tr>
          </thead>
          <tbody>
            { users.map(user => (
              <tr>
                <td><img src={user.profile_image.medium} alt="" /></td>
                <td><a href={user.links.html}>{user.username}</a></td>
                <td>{user.name}</td>
                <td>{user.photos.length}</td>
              </tr>
            )) }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Users;