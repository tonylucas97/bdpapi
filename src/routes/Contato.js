
const express = require("express");
const Router = express.Router();
const Contato = require("../models/Contato");
const bcrypt = require("bcrypt");
const autenticacao = require("../config/Autenticacao");
const authUser = require("../config/AuthUsuario");

Router.get("/", authUser || autenticacao, async (req, res) => {
    const contato = await Contato.findAll({ where: { idUser: req.query.usuarioId } });
    if (contato) {
        res.json({ success: true, contato: contato })
    } else {
        res.json({ success: false, message: "Nenhum contato cadastrado" })
    }
})

Router.post("/", authUser, async (req, res) => {
    const contato = await Contato.create({ ddd: req.body.ddd, numero: req.body.numero ,idUser:req.body.usuarioId});
    if (contato) {
        res.json({ success: true, contato: contato })
    } else {
        res.json({ success: false, message: "Ocorreu um erro" })
    }
})

module.exports = Router;