const { Usuario } = require('../models')
const bcrypt = require('bcrypt')

const controller = {
  //LOGIN USUÁRIO
  auth: async (req, res) => {
    const { email, senha } = req.body
    const usuarioSalvo = await Usuario.findOne({ where: { email } })
    if (usuarioSalvo) {
      if (await bcrypt.compare(senha, usuarioSalvo.senha)) {
        //SALVANDO USUARIO NA SESSION
        req.session.usuario = usuarioSalvo
        res.cookie('usuario', usuarioSalvo, { httpOnly: false })
        res.json(usuarioSalvo)
      } else {
        res.status(400).json({ message: 'Dados de login inválidos!' })
      }
    } else {
      res.status(400).json({ message: 'E-mail não cadastrado!' })
    }
  },
}

module.exports = controller
