import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Recipes from './components/Recipes';
<<<<<<< HEAD
import DoneRecipes from './components/DoneRecipes';
import RecipeDetails from './components/RecipeDetails';
=======
import RecipeInProgress from './components/RecipeInProgress';
>>>>>>> main-group-10-recipe-in-progress

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="done-recipes" element={ <DoneRecipes /> } />
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
        path="/drinks/"
        element={
          <>
            <Header />
            <Recipes />
            <Footer />
          </>
        }
      />
<<<<<<< HEAD
      <Route path="/meals/:id/*" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id/*" element={ <RecipeDetails /> } />
      <Route path="/meals/:id/in-progress/*" />
      <Route path="/drinks/:id/in-progress/*" />
=======
      <Route path="/meals/:id" />
      <Route path="/drinks/:id" />
      <Route
        path="/meals/:id/in-progress"
        element={
          <>
            <Header />
            <RecipeInProgress />
          </>
        }
      />
      <Route
        path="/drinks/:id/in-progress"
        element={
          <>
            <Header />
            <RecipeInProgress />
          </>
        }
      />
>>>>>>> main-group-10-recipe-in-progress
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
