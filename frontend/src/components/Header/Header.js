import { Link } from 'react-router-dom'

import './Header.css'

export const Header = () => {
  return (
    <div className="main-header">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="logos">
              <img src="images/logo-recipes-horiz.svg" alt="" />
            </div>
          </div>
          <div className="col-2">
            <div className="icon-search">
              <Link to="/recipes/search">
                <i className="ti-search"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
