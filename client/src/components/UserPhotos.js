import React, { Component } from 'react'

export default class UserPhotos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      photos: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    
    fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({ user: data, photos: data.photos });
    });
  }

  render() {
    const { user, photos } = this.state;
    return (
      <div>
        <h1>{user.first_name}'s photos</h1>
        <div className="gallery row">
        { photos.map(photo => (
          <div className="col-md-4">
            <img src={photo.urls.regular} />
          </div>
        )) }
        </div>
      </div>
    )
  }
}
