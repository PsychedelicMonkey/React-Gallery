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
  Spinner,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addToGallery } from '../../actions/galleryActions';
import { searchPhotos } from '../../actions/searchActions';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      page: 1,

      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.search = this.search.bind(this);
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
    
    this.search();
  }
  
  addToGallery = id => {
    this.props.addToGallery(id);
  }
  
  search = () => {
    this.props.searchPhotos(JSON.stringify({ query: this.state.query, page: this.state.page, perPage: 30 }));
    this.setState({ page: this.state.page + 1 });
  }

  render() {
    const { photos, isLoading } = this.props.search;
    const { isAuthenticated, gallery } = this.props;
    return (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.toggle} href="#">Search</NavLink>
        </NavItem>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} autoFocus={false} size="lg">
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
              <Button type="submit" color="primary" disabled={isLoading}>
                { isLoading ? <Spinner size="sm" className="mr-2" /> : null }
                { isLoading ? 'Loading' :  'Search Photos' }
              </Button>
              <Button onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
          { photos ?
            <div className="gallery row">
              { photos.map(photo => (
                <div className="col-md-4" key={photo.id}>
                  <img src={photo.urls.regular} alt="" />
                  { isAuthenticated ? (
                    gallery.find(p => p.unsplashId === photo.id) ?
                    <Button className="mt-2" block disabled>In Gallery</Button> :
                    <Button onClick={this.addToGallery.bind(this, photo.id)} className="mt-2" block>Add to Gallery</Button>
                  )  
                  : null }
                </div>
              )) }
              <div className="col-md-12">
                <Button block onClick={this.search}>Load More</Button>
              </div>
            </div> : null }
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  gallery: state.gallery.photos,
  search : state.search,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { searchPhotos, addToGallery })(Search);
