import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Main } from './components/Main/Main'
import { Menu } from './components/Menu/Menu'
import { Search } from './components/Search/Search'
import { NotFound } from './components/NotFound/NotFound'
import { RecipeList } from './components/Recipes/RecipeList/RecipeList'
import { RecipeDetail } from './components/Recipes/RecipeDetail/RecipeDetail'
import { CategoryList } from './components/Categories/CategoryList/CategoryList'
import { CreateRecipe } from './components/Recipes/RecipeAdd/_domain/CreateRecipe'
import { SignUpUser } from './components/Auth/AuthSignUp/_domain/SignUpUser'
import { SignInUser } from './components/Auth/AuthSignIn/_domain/SignInUser'
import { Header } from './components/Header/Header'
import { Home } from './components/Home/Home'
import { Navbar } from './components/Navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div id="app">
              <div className="view view-main view-init ios-edges" data-url="/">
                <div className="page page-home">
                  <div className="page-content">
                    <Header />
                    <Home />
                  </div>
                </div>
                <Navbar />
              </div>
            </div>
          }
        />
        <Route path="/signin" exact element={<SignInUser />} />
        <Route path="/signup" exact element={<SignUpUser />} />
        <Route path="/menu" exact element={<Menu />} />
        <Route path="/categories" exact element={<CategoryList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/edit/:id" exact element={<CreateRecipe />} />
        <Route path="/recipes/categories/:id" exact element={<RecipeList />} />
        <Route path="/recipes/new-recipe" exact element={<CreateRecipe />} />
        <Route path="/recipes/search" exact element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
