import { useNavigate } from 'react-router-dom'
import SignInUserLogic from './SignInUserLogic'

import { toast } from 'react-toastify'

export const SignInUser = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    // return async function to submit data to backend

    try {
      const response = await fetch('http://localhost:3000/acesso/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const payload = await response.json()

      if (!response.ok) {
        const { message } = payload
        throw Error(message)
      } else {
        localStorage.setItem(
          'user',
          JSON.stringify({ id: payload.id, nome: payload.nome }),
        )
        navigate('/')
        toast.success('Bem-vindo(a)!')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return <SignInUserLogic onSubmit={handleSubmit} />
}
