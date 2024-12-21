import React from 'react'

import { Header } from '../Header/Header'
import { Home } from '../Home/Home'
import { Navbar } from '../Navbar/Navbar'

export const Main = () => {
  return (
    <div id="app">
      <div className="view view-main view-init ios-edges" data-url="/">
        <div className="page page-home">
          <div className="page-content">
            <Header />
            <Home />
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  )
}
