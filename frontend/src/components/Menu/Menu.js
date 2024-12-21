import { Link, useLocation } from 'react-router-dom'

import { Title } from '../Title/Title'
import './Menu.css'

export const Menu = () => {
  return (
    <div className="page">
      <Title title="Menu" backTo={'/'} />
      <div className="page-content">
        <div className="pages segments-page">
          <div className="container">
            <div className="content">
              <ul>
                <li>
                  <a className="item-content item-link">
                    <div className="item-inner">
                      <div className="item-title">
                        <span>Hello, Eddie!</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <Link to={'/'} className="item-content item-link">
                    <div className="item-inner">
                      <div className="item-title">
                        <i className="ti-home"></i>
                        <span>Home</span>
                        <i className="ti-angle-right"></i>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/recipes/new-recipe'}
                    className="item-content item-link"
                  >
                    <div className="item-inner">
                      <div className="item-title">
                        <i className="ti-plus"></i>
                        <span>New Recipe</span>
                        <i className="ti-angle-right"></i>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to={'/categories'} className="item-content item-link">
                    <div className="item-inner">
                      <div className="item-title">
                        <i className="ti-agenda"></i>
                        <span>Categories</span>
                        <i className="ti-angle-right"></i>
                      </div>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to={'/signin'} className="item-content item-link">
                    <div className="item-inner">
                      <div className="item-title">
                        <i className="ti-shift-left"></i>
                        <span>Logout</span>
                        <i className="ti-angle-right"></i>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
