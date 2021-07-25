import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { loadGallery } from '../actions/galleryActions';

class Gallery extends Component {
  componentDidMount() {
    this.props.loadGallery();
  }

  render() {
    const { photos, searchResults } = this.props;
    return (
      <Fragment>
        { searchResults ? 
          <Fragment>
            <div className="gallery row">
            { searchResults.map(res => (
              <div className="col-md-4">
                <img src={res.urls.regular} alt="" />
              </div>
            )) }
          </div>
          <hr />
        </Fragment> : null }
        <div className="gallery row">
          { photos.map(photo => (
            <div className="col-md-4">
              <img src={photo.urls.regular} alt="" />
            </div>
          )) }
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.gallery.photos,
  searchResults: state.search.photos,
});

export default connect(mapStateToProps, { loadGallery })(Gallery);
