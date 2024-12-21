import { Link } from 'react-router-dom'

import './Navbar.css'

export const Navbar = () => {
  return (
    <div className="navbar navbar-home">
      <div className="navbar-inner">
        <div className="block">
          <div className="row">
            <div className="col-3">
              <Link to="/menu" className="link">
                <i className="ti-menu"></i>
              </Link>
            </div>
            <div className="col-3">
              <Link to="/" className="link">
                <i className="ti-home"></i>
              </Link>
            </div>
            <div className="col-3">
              <Link to="/recipes/search" className="link">
                <i className="ti-search"></i>
              </Link>
            </div>
            <div className="col-3">
              <Link to="/recipes/new-recipe" className="link">
                <i className="ti-plus"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
