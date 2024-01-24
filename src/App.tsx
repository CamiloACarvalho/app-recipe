import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route
        path="/meals/*"
        element={
          <>
            <Header />
            <Footer />
          </>
        }
      />
      <Route
        path="/drinks/*"
        element={
          <>
            <Header />
            <Footer />
          </>
        }
      />
      <Route path="/meals/:id/*" />
      <Route path="/drinks/:id/*" />
      <Route path="/meals/:id/in-progress/*" />
      <Route path="/drinks/:id/in-progress/*" />
      <Route
        path="/profile"
        element={
          <>
            <Header />
            <Footer />
          </>
        }
      />
      <Route path="/done-recipes" element={ <Header /> } />
      <Route path="/favorite-recipes" element={ <Header /> } />
    </Routes>
  );
}

export default App;
