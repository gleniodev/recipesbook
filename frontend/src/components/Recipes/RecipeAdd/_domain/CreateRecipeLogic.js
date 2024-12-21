import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RecipeAdd } from '../RecipeAdd'
import * as yup from 'yup'
import { useEffect } from 'react'

const CreateRecipeFormSchema = yup.object().shape({
  titulo: yup.string().min(3).max(100).required(),
  tempo_preparo: yup.number().min(1).max(1000).required(),
  rendimento: yup.number().min(1).max(1000).required(),
  ingredientes: yup.string().min(1).max(1000).required(),
  modo_preparo: yup.string().min(1).max(1000).required(),
  id_categoria: yup.number().required(),
  observacoes: yup.string().min(0).max(200),
  url_imagem: yup.string().max(500),
  url_video: yup.string().max(500),
})

const CreateRecipeLogic = ({ defaultValues, onSubmit, isEditMode }) => {
  const form = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(CreateRecipeFormSchema),
  })

  useEffect(() => {
    form.setValue('titulo', defaultValues.titulo)
    form.setValue('id_categoria', defaultValues.id_categoria)
    form.setValue('tempo_preparo', defaultValues.tempo_preparo)
    form.setValue('rendimento', defaultValues.rendimento)
    form.setValue('ingredientes', defaultValues.ingredientes)
    form.setValue('modo_preparo', defaultValues.modo_preparo)
    form.setValue('url_imagem', defaultValues.url_imagem)
    form.setValue('url_video', defaultValues.url_video)
  }, [defaultValues])

  const handleSubmit = async (data) => {
    await onSubmit(data)
      .then(() => form.reset(data))
      .catch((err) => console.error(err))
  }

  return (
    <RecipeAdd form={form} onSubmit={handleSubmit} isEditMode={isEditMode} />
  )
}

export default CreateRecipeLogic
