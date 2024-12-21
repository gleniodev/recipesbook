const express = require("express");
const router = express.Router();
const acessoController = require("../controllers/acesso");

//ROTAS DE LOGIN
router.post("/login", acessoController.auth);

module.exports = router;

