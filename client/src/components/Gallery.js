import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadGallery } from '../actions/galleryActions';

class Gallery extends Component {
  componentDidMount() {
    this.props.loadGallery();
  }

  render() {
    const { photos } = this.props;
    return (
      <div className="gallery row">
        { photos.map(photo => (
          <div className="col-md-4">
            <img src={photo.urls.regular} alt="" />
          </div>
        )) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.gallery.photos,
});

export default connect(mapStateToProps, { loadGallery })(Gallery);
