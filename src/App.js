import './App.css';
import Pesquisa from './pages/Pesquisa';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/transferencias' exact element={<Pesquisa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
