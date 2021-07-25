import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container } from 'reactstrap';

import AppNavbar from './components/AppNavbar';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <h1>Home</h1>
      </Container>
    </div>
  );
}

export default App;
