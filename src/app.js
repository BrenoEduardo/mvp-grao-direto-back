const express = require('express');
const cors = require('cors')

const AuthController = require('./controller/AuthController')
const AdminController = require('./controller/AdminController')

const autheticateMiddleware = require('./middlewares/autheticate')

const app = express();

app.use(cors())
app.use(express.json());
app.use("/auth", AuthController)
app.use("/admin", autheticateMiddleware ,AdminController)


const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`App online port`, PORT)
})