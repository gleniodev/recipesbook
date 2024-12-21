import { useEffect, useState } from 'react'
import { Title } from '../../Title/Title'
import './RecipeAdd.css'

export const RecipeAdd = ({ form, onSubmit, isEditMode }) => {
  const { formState, register, handleSubmit } = form
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const categoriaFromServer = await fetchCategories()
      setCategories(categoriaFromServer)
    }

    getCategories()
  }, [])

  const fetchCategories = async () => {
    const res = await fetch('http://localhost:3000/categorias')
    const data = await res.json()

    return data
  }

  return (
    <div className="page">
      <Title title={isEditMode ? 'Edit Recipe' : 'Add New Recipe'} />

      <div className="page-content">
        <div className="reservation segments-page">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="list">
              <div className="item-input-wrap">
                <input
                  type="text"
                  placeholder="Title*"
                  {...register('titulo')}
                />
              </div>
              <div className="item-input-wrap input-dropdown-wrap">
                <select placeholder="Category" {...register('id_categoria')}>
                  <option value="" defaultValue={-1}>
                    Select a category*
                  </option>
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.descricao}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="item-input-wrap">
                <input
                  type="text"
                  placeholder="Cook (minutes)*"
                  {...register('tempo_preparo')}
                />
              </div>
              <div className="item-input-wrap">
                <input
                  type="text"
                  placeholder="Servings (yield/quantity)*"
                  {...register('rendimento')}
                />
              </div>
              <div className="item-input-wrap">
                <input
                  type="text"
                  placeholder="Ingredients*"
                  {...register('ingredientes')}
                />
              </div>
              <div className="item-input-wrap">
                <textarea
                  rows={5}
                  placeholder="Directions (steps)*"
                  {...register('modo_preparo')}
                />
              </div>

              <div className="item-input-wrap">
                <textarea
                  rows={5}
                  placeholder="Cook's Notes (observations)"
                  {...register('observacoes')}
                />
              </div>
              <div className="item-input-wrap">
                <input
                  type="text"
                  placeholder="Image URL"
                  {...register('url_imagem')}
                />
              </div>
              <div className="item-input-wrap">
                <input
                  type="text"
                  placeholder="Video URL"
                  {...register('url_video')}
                />
              </div>

              <button type="submit" className="button">
                <i className="ti-clipboard"></i>
                {isEditMode ? 'Edit Recipe' : 'Save Recipe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
