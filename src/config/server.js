const express = require("express");
const app = express();
require("../models/Associations")
const bodyParser = require("body-parser")
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')
const multer = require("multer")
require("dotenv").config();

const adminRoute = require("../routes/Admin");
const mercadoriaRoutes = require("../routes/Mercadoria");
const loginRoute = require("../routes/Login");
const notasRoutes = require("../routes/Nota");
const vendasRoutes = require("../routes/Venda");
const usuarioRoutes = require("../routes/Usuario");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/admin", adminRoute)
app.use("/mercadoria", mercadoriaRoutes)
app.use("/login", loginRoute)
app.use("/notas", notasRoutes)
app.use("/vendas", vendasRoutes)
app.use("/usuario", usuarioRoutes)
app.listen(process.env.PORT || 3333);