import { Title } from '../../Title/Title'
import './AuthSignUp.css'

export const AuthSignUp = ({ form, onSubmit }) => {
  const { formState, register, handleSubmit } = form
  return (
    <div className="page">
      <Title backTo={'/signin'} title={'Sign Up'} />
      <div className="page-content">
        <div className="register segments-page">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="list">
              <div className="item-input-wrap">
                <input
                  type="text"
                  placeholder="Full Name*"
                  {...register('nome')}
                  required
                />
              </div>
              <div className="item-input-wrap">
                <input
                  type="email"
                  placeholder="Email*"
                  {...register('email')}
                  required
                />
              </div>
              <div className="item-input-wrap">
                <input
                  type="password"
                  placeholder="Password*"
                  {...register('senha')}
                  required
                />
              </div>
              <div className="item-input-wrap">
                <input
                  type="password"
                  placeholder="Confirm Password*"
                  {...register('confirmacao_senha')}
                  required
                />
              </div>
              <button className="button">
                <i className="ti-user"></i>Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
