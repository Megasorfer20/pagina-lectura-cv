import Nav from './components/General/Nav';
import Footer from './components/Footer';
import General from './components/General/General';
import Filtro from './components/Filtro';
import Cards from './components/Cards';
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <header className="App-header">
        <General></General>
        <br></br>
        <Filtro></Filtro>
        <Cards></Cards>
      </header>
      <Footer></Footer>
    </div>
  );
}

export default App;
