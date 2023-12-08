import Nav from './components/General/Nav';
import Footer from './components/Footer';
import General from './components/General/General';
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <header className="App-header">
        <General></General>
      </header>
      <Footer></Footer>
    </div>
  );
}

export default App;
