import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals/*" element={ <Header /> } />
      <Route path="/drinks/*" element={ <Header /> } />
      <Route path="/meals/:id/*" />
      <Route path="/drinks/:id/*" />
      <Route path="/profile" element={ <Header /> } />
      <Route path="/done-recipes" element={ <Header /> } />
      <Route path="/favorite-recipes" element={ <Header /> } />
    </Routes>
  );
}

export default App;
