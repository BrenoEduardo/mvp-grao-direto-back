const express = require('express');
const cors = require('cors')

const AuthController = require('./controller/AuthController')
const ColaboratorController = require('./controller/ColaboratorController')
const ClienteController = require('./controller/ClientController')

const autheticateMiddleware = require('./middlewares/autheticate')

const app = express();

app.use(cors())
app.use(express.json());
app.use("/auth", AuthController)
app.use("/colaborator", autheticateMiddleware ,ColaboratorController)
app.use("/client", autheticateMiddleware ,ClienteController)

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`App online port`, PORT)
})