import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Recipes from './components/Recipes';

function App() {
  return (
    <Routes>
      {/* colocar página de detalhes nessa rota. Ela está improvisada para fazer a cobertura */}
      <Route path="/meals/:id" element={ <div> test </div> } />
      <Route path="/" element={ <Login /> } />
      <Route
        path="/meals"
        element={
          <>
            <Header />
            <Recipes />
            <Footer />
          </>
        }
      />
      <Route
        path="/drinks/*"
        element={
          <>
            <Header />
            <Recipes />
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
