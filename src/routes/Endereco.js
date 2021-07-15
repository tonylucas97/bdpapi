
const express = require("express");
const Router = express.Router();
const Endereco = require("../models/Endereco");
const autenticacao = require("../config/Autenticacao");
const authUser = require("../config/AuthUsuario");

Router.get("/", autenticacao || authUser, async (req, res) => {
    const enderecos = await Endereco.findAll({ where: { usuarioId: req.query.usuarioId } })
    if (enderecos) {
        res.json({ success: true, enderecos: enderecos })
    } else {
        res.json({ success: false, message: "Nenhum endereco cadastrado" })
    }
})

Router.post("/", authUser || autenticacao, async (req, res) => {
    const endereco = await Endereco.create({
        logradouro: req.body.logradouro, bairro: req.body.bairro, cidade: req.body.cidade,
        estado: req.body.estado, referencia: req.body.referencia, descricaoEntrega: req.body.descricaoEntrega
    })

    if (endereco) {
        res.json({ success: true, endereco: endereco })
    } else {
        res.json({ success: false })
    }
})

Router.post("/alteraendereco", autenticacao || authUser, async (req, res) => {

})

module.exports = Router;