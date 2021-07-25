import React, { Component } from 'react'

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    };
  }

  componentDidMount() {
    fetch('/api/photos')
    .then(res => res.json())
    .then(data => this.setState({ photos: data }));
  }

  render() {
    const { photos } = this.state;
    return (
      <div className="gallery row">
        { photos.map(photo => (
          <div className="col-md-4">
            <img src={photo.urls.regular} alt="" />
          </div>
        )) }
      </div>
    )
  }
}

export default Gallery;
