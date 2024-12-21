import * as moment from 'moment'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CreateRecipeLogic from './CreateRecipeLogic'

import { toast } from 'react-toastify'

export const CreateRecipe = () => {
  const [data, setData] = useState({})
  const [editMode, setEditMode] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  let defaultValues = {
    id: data?.id,
    titulo: data?.titulo,
    tempo_preparo: data?.tempo_preparo,
    rendimento: data?.rendimento,
    ingredientes: data?.ingredientes,
    modo_preparo: data?.modo_preparo,
    observacoes: data?.observacoes,
    url_imagem: data?.url_imagem,
    id_categoria: data?.id_categoria,
    id_usuario: data?.id_usuario,
    url_video: data?.url_video,
    data: data?.data,
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      const { id } = params

      const dataFromServer = await fetch(
        `http://localhost:3000/receitas/buscar/${id}`,
      )

      const data = await dataFromServer.json()
      setData(data)
    }

    if (location.pathname.includes('/recipes/edit')) {
      setEditMode(true)
      fetchRecipe()
    } else {
      setEditMode(false)
    }
  }, [])

  const handleSubmit = async (data) => {
    const submitData = {
      ...data,
      id: params.id,
      id_usuario: 9,
      data: moment().format('YYYY-MM-DD'),
    }

    if (!editMode) {
      delete submitData['id']
    }

    Object.keys(submitData).map((key) => {
      if (submitData[key] == '' && key !== 'id') {
        delete submitData[key]
      }
    })
    // return async function to submit data to backend
    return fetch(
      `http://localhost:3000/receitas/${
        editMode ? `editar/${params.id}` : 'cadastrar'
      }`,
      {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw Error(response)
        }

        return response.json()
      })
      .then(() => {
        if (editMode) {
          toast.success('Edição realizada com sucesso!')
        } else {
          toast.success('Cadastro realizado com sucesso!')
        }
        navigate('/')
      })
  }

  return (
    <CreateRecipeLogic
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isEditMode={editMode}
    />
  )
}
