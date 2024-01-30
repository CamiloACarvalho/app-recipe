import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DoneRecipes from './components/DoneRecipes';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import RecipeDetails from './components/RecipeDetails';
import Recipes from './components/Recipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route
        path="done-recipes"
        element={
          <>
            <Header />
            <DoneRecipes />
          </>
        }
      />
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
      <Route path="/meals/:id/*" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id/*" element={ <RecipeDetails /> } />
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
