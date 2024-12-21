import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthSignUp } from '../AuthSignUp'

import * as yup from 'yup'

const CreateUserFormSchema = yup.object().shape({
  nome: yup.string().min(3).max(100).required(),
  email: yup.string().email().required(),
  senha: yup.string().required(),
  confirmacao_senha: yup
    .string()
    .oneOf([yup.ref('senha'), null], 'Senhas não conferem'),
})

const SignUpUserLogic = ({ onSubmit }) => {
  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(CreateUserFormSchema),
  })

  const handleSubmit = async (data) => {
    await onSubmit(data)
      .then(() => form.reset(data))
      .catch((err) => console.error(err))
  }

  return <AuthSignUp form={form} onSubmit={handleSubmit} />
}

export default SignUpUserLogic
