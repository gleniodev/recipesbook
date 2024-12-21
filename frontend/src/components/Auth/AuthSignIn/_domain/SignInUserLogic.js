import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import { AuthSignIn } from '../AuthSignIn'

const SignInUserFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().required(),
})

const SignInUserLogic = ({ onSubmit }) => {
  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(SignInUserFormSchema),
  })

  const handleSubmit = async (data) => {
    await onSubmit(data)
      .then(() => form.reset(data))
      .catch((err) => console.error(err))
  }

  return <AuthSignIn form={form} onSubmit={handleSubmit} />
}

export default SignInUserLogic
