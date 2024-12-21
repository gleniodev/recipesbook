import { Link } from 'react-router-dom'
import './CategoryItem.css'

export const CategoryItem = ({ category }) => {
  return (
    <div className="content">
      <Link to={`/recipes/categories/${category.id}`}>
        <img src={category.url_imagem} alt="" />
        <div className="mask"></div>
        <div className="title">
          <h4>{category.descricao}</h4>
        </div>
      </Link>
    </div>
  )
}
