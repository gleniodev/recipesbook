import { useNavigate } from 'react-router-dom'
import SignUpUserLogic from './SignUpUserLogic'

import { toast } from 'react-toastify'

export const SignUpUser = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    // return async function to submit data to backend

    try {
      const response = await fetch('http://localhost:3000/usuarios/cadastrar', {
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
        navigate('/signin')
        toast.success('Cadastrado com sucesso!')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return <SignUpUserLogic onSubmit={handleSubmit} />
}
