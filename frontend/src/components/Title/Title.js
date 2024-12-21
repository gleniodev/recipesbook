import React from 'react'

import { Link } from 'react-router-dom'

import './Title.css'

export const Title = ({ title, backTo }) => {
  return (
    <div className="title-header">
      <div className="container">
        <div className="row">
          <div className="icon-search">
            <Link to={backTo}>
              <i className="ti-arrow-left"></i>
            </Link>
          </div>
          <div className="col">
            <div className="title-header-text">
              <div className="title">{title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Title.defaultProps = {
  title: 'Title Here',
  backTo: '/',
}
