const express = require("express");
const Router = express.Router();
const Mercadoria = require("../models/Mercadoria");
const autenticacao = require("../config/Autenticacao");
const authUser = require("../config/AuthUsuario");
const sequelize = require("../config/database");
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const multerS3 = require('multer-s3')
const aws = require("aws-sdk")
var multer = require('multer')

const fs = require("fs")

var s3 = new aws.S3({
    accessKeyId: "AKIAZKUNCRPIK4FMD2TD",
    secretAccessKey: "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",
    region: "sa-east-1"
})

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'baldosplasticosimgss',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname)
        }
    })
})



Router.get("/", async (req, res) => {
    const mercadorias = await Mercadoria.findAll();
    res.json({ success: true, mercadorias: mercadorias })
})

Router.get('/busca/:nome/:token', authUser || autenticacao, async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findAll({ where: { nome: { [Op.like]: req.params.nome + '%' } } });
        res.json({ mercadorias: mercadoria, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
})

Router.get("/porid", authUser || autenticacao, async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findOne({ where: { id: req.query.id } });
        if (mercadoria) {
            res.json({ sucess: true, mercadoria: mercadoria })
        } else {
            res.json({ success: false })
        }
    } catch (error) {
        res.json({ erro: error })
    }
})

Router.get("/porcodigolike", authUser || autenticacao, async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findAll({ where: { codigoBarras: { [Op.like]: req.query.codigoBarras + '%' } } })
        if (mercadoria) {
            res.json({ sucess: true, mercadoria: mercadoria })
        } else {
            res.json({ success: false })
        }
    } catch (error) {
        res.json({ erro: error })
    }
})

Router.get("/limite", async (req, res) => {
    const mercadorias = await sequelize.query("SELECT * FROM mercadorias LIMIT 10 OFFSET " + req.query.pulos);
    res.json({ mercadorias: mercadorias })
})

Router.post("/", upload.single("img"), async (req, res) => {

    try {
        if (req.file) {
            const mercadoria = await Mercadoria.create({ nome: req.body.nome, precoCompra: req.body.precoCompra, precoVenda: req.body.precoVenda, nomeImg: req.file.originalname });
            if (mercadoria) {
                res.json({ success: true, mercadoria: mercadoria })
            } else {
                res.json({ success: false })
            }
        } else {
            const mercadoria = await Mercadoria.create({ nome: req.body.nome, precoCompra: req.body.precoCompra, precoVenda: req.body.precoVenda });
            if (mercadoria) {
                res.json({ success: true, mercadoria: mercadoria })
            } else {
                res.json({ success: false })
            }
        }
    } catch (error) {
        res.json({ erro: error.message })
    }

})

Router.post("/alterarItem", autenticacao, upload.single("img"), async (req, res) => {
    if (req.file) {
        const mercadoria = await Mercadoria.findOne({ where: { id: req.body.id } });
        if (mercadoria) {
            const mercadoriaUpdate = await mercadoria.update({
                nome: req.body.nome,
                precoCompra: req.body.precoCompra,
                precoVenda: req.body.precoVenda,
                nomeImg: req.file.originalname
            })
            if (mercadoriaUpdate) {
                res.json({ success: true, message: "Item alterado com sucesso" })
            } else {
                res.json({ success: false })
            }
        }

    } else {
        const mercadoria = await Mercadoria.findOne({ where: { id: req.body.id } });
        if (mercadoria) {
            const mercadoriaUpdate = await mercadoria.update({
                nome: req.body.nome,
                precoCompra: req.body.precoCompra,
                precoVenda: req.body.precoVenda,
                nomeImg: req.body.nomeImg
            })
            if (mercadoriaUpdate) {
                res.json({ success: true, message: "Item alterado com sucesso" })
            } else {
                res.json({ success: false })
            }
        }

    }
})

Router.delete("/:id", autenticacao, async (req, res) => {
    const mercadoria = await Mercadoria.findOne({ where: { id: req.params.id } });
    if (mercadoria) {
        if (mercadoria.nomeImg) {
            var params = {
                Bucket: "baldosplasticosimgss",
                Key: mercadoria.nomeImg,

            };
            s3.deleteObject(params, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else console.log(data);           // successful response
                
            }); 
        }
        const deleteMercadoria = await Mercadoria.destroy({ where: { id: req.params.id } });
        if (deleteMercadoria) {
            res.json({ success: true, message: "Item deletado com successo" });
        } else {
            res.json({ success: false })
        }
    } else {
        res.json({ success: false, message: "Item nao encontrado" })
    }
})

module.exports = Router;
