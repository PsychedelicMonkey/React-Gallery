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

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',

      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggle = () => {
    this.setState({
      query: '',
      isOpen: !this.state.isOpen,
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = e => {
    e.preventDefault();

    alert(JSON.stringify({ query: this.state.query }));
  }

  render() {
    return (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.toggle} href="#">Search</NavLink>
        </NavItem>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.toggle}>Search</ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>Search</Label>
                <Input
                  type="text"
                  id="query"
                  name="query"
                  placeholder="Search query"
                  value={this.state.query}
                  onChange={this.onChange}
                  autoFocus={true}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">Search Photos</Button>
              <Button onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default Search;
