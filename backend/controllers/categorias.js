const { Categoria } = require('../models');


const controller = {
    //LISTAR TODAS AS CATEGORIAS
    index: async (req, res, next) => {
        const categorias = await Categoria.findAll();
        res.json(categorias)
    },
    //LISTAR CATEGORIAS POR ID
    show: async (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).send("Categoria não informada!")
        }
        const categoriaId = await Categoria.findByPk(id)
        if (categoriaId) {
            res.send(categoriaId)
        } else {
            res.status(404).send("Categoria não encontrado!")
        }
    },
}

module.exports = controller