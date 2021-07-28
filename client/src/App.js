import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { checkUser } from './actions/authActions';

import store from './store';
import AppNavbar from './components/AppNavbar';
import Gallery from './components/Gallery';
import Users from './components/Users';
import UserPhotos from './components/UserPhotos';

class App extends Component {
  componentDidMount() {
    store.dispatch(checkUser());
  }
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Container>
              <Route exact path="/" component={Gallery} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/:id" component={UserPhotos} />
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
