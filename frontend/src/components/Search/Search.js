import React, { useState } from 'react'
import { CategoryList } from '../Categories/CategoryList/CategoryList'
import { RecipeList } from '../Recipes/RecipeList/RecipeList'

import { Title } from '../Title/Title'

import './Search.css'

export const Search = () => {
  const [searchInput, setSearchInput] = useState('')

  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
  }
  return (
    <div className="page">
      <Title title="Search" backTo={'/'} />
      <div className="container">
        <form className="list">
          <div className="item-input-wrap">
            <input
              type="text"
              placeholder="Type a search..."
              required
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="row justify-content-md-center justify-content-lg-start">
            <RecipeList search={searchInput} />
          </div>
        </div>
      </div>
    </div>
  )
}
