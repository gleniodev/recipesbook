import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import './RecipeItem.css'

export const RecipeItem = ({ recipe }) => {
  const [recipeCategory, setRecipeCategory] = useState({})
  const [user, setRecipeUser] = useState({})

  useEffect(() => {
    const getRecipeCategory = async () => {
      const recipeCategoryFromServer = await fetchRecipeCategory()
      await setRecipeCategory(recipeCategoryFromServer)
    }

    const getRecipeUser = async () => {
      const userFromServer = await fetchRecipeUser()
      await setRecipeUser(userFromServer)
    }

    getRecipeCategory()
    getRecipeUser()
  }, [])

  const fetchRecipeCategory = async () => {
    const res = await fetch(
      `http://localhost:3000/categorias/buscar/${recipe.id_categoria}`,
    )
    const data = await res.json()

    return data
  }

  const fetchRecipeUser = async () => {
    const res = await fetch(
      `http://localhost:3000/usuarios/buscar/${recipe.id_usuario}`,
    )
    const data = await res.json()

    return data
  }

  return (
    <Link to={`/recipes/${recipe.id}`}>
      <div className="content">
        <div
          className="fig"
          style={{ backgroundImage: `url(${recipe.url_imagem})` }}
        ></div>
        <div className="text">
          <h4 className="recipe-title">{recipe.titulo}</h4>

          <span className="recipe-category">
            <i className="ti-book"></i>&nbsp; {recipeCategory.descricao}
          </span>
          <p className="price">
            <i className="ti-timer">&nbsp;</i>
            {recipe.tempo_preparo} Min&nbsp;&nbsp;&nbsp;
            <i className="ti-server">&nbsp;</i>
            {recipe.rendimento} Servings <br />
            <i className="ti-user"></i>&nbsp;&nbsp;Autor: {user.nome}
          </p>
        </div>
      </div>
    </Link>
  )
}
