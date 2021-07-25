import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import store from './store';
import AppNavbar from './components/AppNavbar';
import Gallery from './components/Gallery';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <Container>
            <Route exact path="/" component={Gallery} />
          </Container>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
