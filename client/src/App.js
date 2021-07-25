import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container } from 'reactstrap';

import AppNavbar from './components/AppNavbar';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <Gallery />
      </Container>
    </div>
  );
}

export default App;
