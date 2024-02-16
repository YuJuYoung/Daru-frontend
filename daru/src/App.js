import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Content from './components/content/Content';
import NavbarContainer from './containers/navbar/NavbarContainer';

function App() {
  return (
    <div className="App">
      <NavbarContainer />
      <div className="mt-5">
        <Content />
      </div>
    </div>
  );
}

export default App;
