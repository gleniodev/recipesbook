import { useEffect, useState } from 'react'
import { Title } from '../../Title/Title'
import { useParams, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import './RecipeDetail.css'

export const RecipeDetail = () => {
  const params = useParams()
  const navigate = useNavigate()
  let avoidDelete = false

  const [recipe, setRecipe] = useState({})
  const [category, setRecipeCategory] = useState({})
  const [user, setRecipeUser] = useState({})

  useEffect(() => {
    const getRecipe = async () => {
      const recipeFromServer = await fetchRecipe()
      setRecipe(recipeFromServer)
    }

    const getRecipeCategory = async () => {
      const categoryFromServer = await fetchRecipeCategory()
      setRecipeCategory(categoryFromServer)
    }

    const getRecipeUser = async () => {
      const userFromServer = await fetchRecipeUser()
      setRecipeUser(userFromServer)
    }

    getRecipe()
    getRecipeCategory()
    getRecipeUser()
  }, [category, user])

  const fetchRecipe = async () => {
    const { id } = params

    const res = await fetch(`http://localhost:3000/receitas/buscar/${id}`)

    const data = await res.json()

    return data
  }

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

  const deleteRecipe = async (id) => {
    await fetch(`http://localhost:3000/receitas/excluir/${id}`, {
      method: 'DELETE',
    })

    navigate('/')
  }

  const requestDeleteRecipe = (id) => {
    toast.success(
      <span>
        Exclusão realizada com sucesso!&nbsp;
        <a
          className="delete-link"
          onClick={() => {
            avoidDelete = true
          }}
        >
          {'Clique aqui para desfazer.'}
        </a>
      </span>,
      {
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      },
    )

    setTimeout(async () => {
      if (!avoidDelete) {
        await deleteRecipe(id)
        toast.success('Exclusão realizada com sucesso!')
      } else {
        toast.success('Exclusão desfeita com sucesso!')
      }
      avoidDelete = false
    }, 5000)
  }

  const editRecipe = async (id) => {
    navigate(`/recipes/edit/${id}`)
  }

  return (
    <div className="page">
      <Title backTo={'/'} title={"Recipe's Details"} />
      <div className="page-content">
        <div className="restaurant">
          <div className="container">
            <div className="actions">
              <i
                className="ti-pencil"
                onClick={() => editRecipe(recipe.id)}
              ></i>
              <i
                className="ti-trash"
                onClick={() => requestDeleteRecipe(recipe.id)}
              ></i>
            </div>
            <div className="content">
              <a href="#">
                <img src={recipe.url_imagem} />
                <span className="mask"></span>
                <div className="title">
                  <h4>{recipe.titulo}</h4>
                  <span className="subtitle">
                    <i className="ti-timer"></i>
                    {recipe.tempo_preparo} Min&nbsp;|&nbsp;
                    <i className="ti-server"></i>
                    {recipe.rendimento}
                    {' Servings'} &nbsp;|&nbsp;
                    <i className="ti-book"></i>
                    {category?.descricao}
                    <br />
                  </span>
                  <span className="subtitle">
                    {' '}
                    <i className="ti-user"></i>Autor: {user.nome}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="restaurant-single">
          <div className="container">
            <div className="resto-menu new-menu">
              <div className="wrap-title">
                <h3>
                  <i className="ti-video-camera" />
                  &nbsp;Recipe's Video
                </h3>
              </div>
              <div className="row content-text">
                {recipe.url_video ? (
                  <iframe
                    height={400}
                    src={recipe.url_video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  ></iframe>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>

            <div className="resto-menu new-menu">
              <div className="wrap-title">
                <h3>
                  <i className="ti-apple" />
                  &nbsp;Ingredients
                </h3>
              </div>
              <div className="row">
                <div className="col">
                  <div className="content-text">{recipe.ingredientes}</div>
                </div>
              </div>
            </div>

            <div className="resto-menu new-menu">
              <div className="wrap-title">
                <h3>
                  <i className="ti-menu-alt" />
                  &nbsp;Directions (steps)
                </h3>
              </div>
              <div className="row">
                <div className="col">
                  <div className="content-text">{recipe.modo_preparo}</div>
                </div>
              </div>
            </div>

            <div className="resto-menu new-menu">
              <div className="wrap-title">
                <h3>
                  <i className="ti-receipt" />
                  &nbsp;Cook Notes (observations)
                </h3>
              </div>
              <div className="row">
                <div className="col">
                  {recipe.observacoes ? (
                    <div className="content-text">{recipe.observacoes}</div>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>
            </div>

            <div className="new-menu">
              <div className="container-link wrap-title">
                <h3>
                  <i className="red-icon ti-share" />
                  &nbsp;
                  <a className="share-link" href="">
                    Share Recipe
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
