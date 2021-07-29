import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addToGallery } from '../actions/galleryActions';

class AllUserPhotos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      page: 1,
    };

    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    const { username } = this.props.match.params;

    fetch('/api/users/search/username/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, page: this.state.page, perPage: 30 }),
    })
    .then(res => res.json())
    .then(data => this.setState({ 
      photos: this.state.photos.concat(data.response.results), 
      page: this.state.page + 1 
    }));
  }

  add = id => {
    this.props.addToGallery(id);
  }

  render() {
    const { photos } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <div className="gallery row">
        { photos.map(photo => (
          <div className="col-md-4" key={photo.id}>
            <img src={photo.urls.regular} alt="" />
            { isAuthenticated ? <Button block className="mt-2" onClick={this.add.bind(this, photo.id)}>Add</Button> : null }
          </div>
        )) }
        <Button onClick={this.load}>Load More</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addToGallery })(AllUserPhotos);
