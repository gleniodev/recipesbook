const { Receita, Sequelize } = require('../models')
const op = Sequelize.Op

const controller = {
  //LISTAR TODAS RECEITAS
  index: async (req, res, next) => {
    const receitas = await Receita.findAll()
    res.json(receitas)
  },
  //LISTAR RECEITAS POR ID
  show: async (req, res, next) => {
    const { id } = req.params
    if (!id) {
      res.status(400).send('Receita não informada!') //VERIFICAR NECESSIDADE
    }
    const receitaId = await Receita.findByPk(id)
    if (receitaId) {
      res.json(receitaId)
    } else {
      res.status(404).send('Receita não encontrada!')
    }
  },
  //LISTAR RECEITAS POR ID DA CATEGORIA
  categorias: async (req, res, next) => {
    const { id } = req.params
    const receitasPorCategoria = await Receita.findAll({
      where: {
        id_categoria: id,
      },
    })
    if (receitasPorCategoria) {
      res.json(receitasPorCategoria)
    } else {
      res.status(404).send('Categoria de receita não encontrada!') //ESTÁ TRAZENDO UM ARRAY VAZIO AO INVÉS DA MENSAGEM
    }
  },
  //LISTAR TODAS AS RECEITAS DO USUARIO
  usuario: async (req, res, next) => {
    const receitas = await Receita.findAll({
      where: { id_usuario: 1 },
    })
    res.json(receitas)
  },
  //LISTAR RECEITAS POR TÍTULO (VERIFICAR IMPLEMENTAÇÃO)
  titulo: async (req, res, next) => {
    const { titulo } = req.query
    const receitasPorTitulo = await Receita.findAll({
      where: { titulo: { [op.like]: `%${titulo}%` } },
    })

    if (receitasPorTitulo) {
      res.json(receitasPorTitulo)
    }
  },
  //CADASTRAR RECEITAS
  add: async (req, res, next) => {
    const {
      titulo,
      tempo_preparo,
      rendimento,
      ingredientes,
      modo_preparo,
      observacoes,
      url_imagem,
      id_categoria,
      data,
      url_video,
    } = req.body
    const novaReceita = await Receita.create({
      titulo,
      tempo_preparo,
      rendimento,
      ingredientes,
      modo_preparo,
      observacoes,
      url_imagem,
      id_usuario: 1,
      id_categoria,
      data,
      url_video,
    })
    if (novaReceita) {
      res.json(novaReceita)
    } else {
      res.status(404).send('Receita não cadastrada!')
    }
  },
  edit: async (req, res, next) => {
    const { id } = req.params
    const {
      titulo,
      tempo_preparo,
      rendimento,
      ingredientes,
      modo_preparo,
      observacoes,
      url_imagem,
      id_categoria,
      data,
      url_video,
    } = req.body
    const buscarReceita = await Receita.findByPk(id)
    if (buscarReceita) {
      if (buscarReceita.id_usuario === 1) {
        const receitaEditada = await Receita.update(
          {
            titulo,
            tempo_preparo,
            rendimento,
            ingredientes,
            modo_preparo,
            observacoes,
            url_imagem,
            id_usuario: 1,
            id_categoria,
            data,
            url_video,
          },
          { where: { id } },
        )
        if (receitaEditada) {
          res.json(await Receita.findByPk(id))
        } else {
          res.status(404).send('Receita não atualizada!')
        }
      } else {
        res
          .status(404)
          .send('Este usuário não tem permissão para editar esta receita!')
      }
    } else {
      res.status(404).send('Receita não encontrada!')
    }
  },
  //EXCLUIR RECEITAS
  delete: async (req, res, next) => {
    console.log('excluir')
    const { id } = req.params
    const receitaExcluida = await Receita.findByPk(id)
    if (receitaExcluida) {
      await Receita.destroy({ where: { id } })
      res.send('Receita excluída com sucesso!')
    } else {
      res.status(404).send('Receita não encontrada!')
    }
  },
}

module.exports = controller
