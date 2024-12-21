import { useState, useEffect } from 'react'
import { Title } from '../../Title/Title'

import { CategoryItem } from '../CategoryItem/CategoryItem'

import './CategoryList.css'

export const CategoryList = () => {
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
      <Title backTo={'/'} title={'Categories'} />

      <div className="page-content">
        <div className="categories segments-page">
          <div className="container">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
