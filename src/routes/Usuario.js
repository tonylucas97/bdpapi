const express = require("express");
const Router = express.Router();
const Usuario = require("../models/Usuario");
const autenticacao = require("../config/Autenticacao");
const sequelize = require("../config/database");
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');


Router.get("/:id", autenticacao, async (req, res) => {
    const usuarios = await Usuario.findOne({ where: { id: req.params.id } });
    if(usuarios){
        res.json({success:true,usuarios:usuarios})
    }else{
        res.json({success:false,message:"Usuario nao existe"})
    }
})

Router.post("/cadastro", async (req, res) => {
    const usuario = await Usuario.findOne({ where: { email: req.body.email } });
    if(usuario){
        res.json({success:false,message:"Usuario ja cadastrado!"})
    }else{
        const hash = bcrypt.hashSync(req.body.senha, 8);
        const createUser = await Usuario.create({ nome:req.body.nome ,senha: hash, email: req.body.email });
        if(createUser){
            res.json({success:true,usuario:createUser})
        }else{
            res.json({success:false,message:"Ocorreu um erro"})
        }
    }
})


module.exports = Router;
