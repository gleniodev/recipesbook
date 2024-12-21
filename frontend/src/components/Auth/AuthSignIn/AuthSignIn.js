import { Link } from 'react-router-dom'

import './AuthSignIn.css'

export const AuthSignIn = ({ form, onSubmit }) => {
  const { formState, register, handleSubmit } = form
  return (
    <div className="page">
      <div className="page-content">
        <div className="login segments-page">
          <div className="container">
            <div className="logos">
              <div className="image">
                <img src="images/logo-recipes.svg" alt="" />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="list">
              <div className="item-input-wrap">
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  required
                />
              </div>
              <div className="item-input-wrap no-mb">
                <input
                  type="password"
                  {...register('senha')}
                  placeholder="Password"
                  required
                />
              </div>

              <br />
              <button className="button">
                <i className="ti-shift-right"></i>Sign In
              </button>
            </form>

            <div className="register-link">
              <Link to="/signup">Or Sign Up Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
