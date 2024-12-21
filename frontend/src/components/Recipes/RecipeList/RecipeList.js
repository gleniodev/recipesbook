import { useState, useEffect } from 'react'

import { Link, useLocation, useParams } from 'react-router-dom'
import { Skeleton } from '../../Skeleton/Skeleton'
import { Title } from '../../Title/Title'

import { RecipeItem } from '../RecipeItem/RecipeItem'

import './RecipeList.css'

export const RecipeList = ({ search }) => {
  const location = useLocation()
  const params = useParams()
  const SKELETON_SIZE = 12
  const [isLoading, setLoading] = useState(true)
  const [isMyRecipes, setMyRecipes] = useState(false)

  const [recipes, setRecipes] = useState([])
  const [category, setCategory] = useState([])

  const [searchedRecipes, setSearchedRecipes] = useState([])

  useEffect(() => {
    const getSearchRecipes = async () => {
      const recipesFromServer = await fetchSearchedRecipes()
      setSearchedRecipes(recipesFromServer)
    }

    const getRecipesByCategory = async () => {
      setLoading(true)
      const recipesFromServer = await fetchRecipesByCategory()
      setSearchedRecipes(recipesFromServer)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    const getCategoryById = async () => {
      const categoryFromServer = await fetchCategoryById()
      setCategory(categoryFromServer)
    }

    if (location.pathname === '/') {
      getRecipes()
    } else if (location.pathname.includes('/recipes/categories')) {
      getRecipesByCategory()
      getCategoryById()
    } else {
      getSearchRecipes()
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [search])

  const getRecipes = async () => {
    setLoading(true)
    setMyRecipes(false)
    const recipesFromServer = await fetchRecipes()
    setRecipes(recipesFromServer)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const getMyRecipes = async () => {
    setLoading(true)
    setMyRecipes(true)
    const recipesFromServer = await fetchMyRecipes()
    setRecipes(recipesFromServer)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const fetchSearchedRecipes = async () => {
    if (search === undefined) return

    const res = await fetch(
      `http://localhost:3000/receitas/filtrar?titulo=${search}`,
    )

    return await res.json()
  }

  const fetchRecipes = async () => {
    const res = await fetch('http://localhost:3000/receitas')

    console.log(document.cookie)
    return await res.json()
  }

  const fetchMyRecipes = async () => {
    const user_id = JSON.parse(localStorage.getItem('user')).id

    const res = await fetch(`http://localhost:3000/receitas/filtrar/usuario`)

    const data = await res.json()

    setRecipes(data)

    return data
  }

  const fetchRecipesByCategory = async () => {
    const { id } = params

    if (!id) return

    const res = await fetch(`http://localhost:3000/receitas/categorias/${id}`)

    return await res.json()
  }

  const fetchCategoryById = async () => {
    const { id } = params

    if (!id) return

    const res = await fetch(`http://localhost:3000/categorias/buscar/${id}`)

    return await res.json()
  }

  return (
    <div>
      {location.pathname.includes('/recipes/categories') ? (
        <div className="section-title">
          <Title backTo="/categories" title={category.descricao} />
        </div>
      ) : (
        <span></span>
      )}
      <div className="popular-menu segments">
        {location.pathname === '/' ? (
          <div className="container">
            <div className="section-title">
              <span
                onClick={getRecipes}
                className={
                  'see-all-link ' + (isMyRecipes ? '' : 'see-all-link-selected')
                }
              >
                All Recipes
              </span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <span
                onClick={getMyRecipes}
                className={
                  'see-all-link ' + (isMyRecipes ? 'see-all-link-selected' : '')
                }
              >
                My Recipes
              </span>
              <h3>
                <Link to="/categories" className="see-all-link">
                  See Categories
                </Link>
              </h3>
            </div>
          </div>
        ) : (
          <span></span>
        )}

        <div className="container">
          <div className="row justify-content-md-center justify-content-lg-start">
            {isLoading ? (
              <div className="skeleton">
                {[...Array(SKELETON_SIZE)].map((e) => (
                  <span key={e} className="skeleton-element">
                    <Skeleton />
                  </span>
                ))}
              </div>
            ) : location.pathname === '/' ? (
              recipes.length ? (
                recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="col col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
                  >
                    <RecipeItem recipe={recipe} />
                  </div>
                ))
              ) : (
                <div>
                  <span>Hello, add your first recipe on "+" button!</span>
                  <div className="empty-icon-container">
                    <img className="empty-icon" src={'/images/bowl.svg'} />
                  </div>
                </div>
              )
            ) : searchedRecipes.length ? (
              searchedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="col col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
                >
                  <RecipeItem recipe={recipe} />
                </div>
              ))
            ) : (
              <div>
                <span>We haven't find any result!</span>
                <div className="empty-icon-container">
                  <img className="empty-icon" src={'/images/bowl.svg'} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
