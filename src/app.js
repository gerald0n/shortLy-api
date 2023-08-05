import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes/index.route.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

/* import jwt from 'jsonwebtoken' */
/* import bcrypt from 'bcrypt' */
/*CRIAR O TOKEN JWT const token = jwt.sign({nome: 'Geraldo'}, process.env.SECRET_KEY, {expiresIn: '1y', subject: '1'}) */
/*ENCRIPTAR SENHA const password_encrypted = bcrypt.hashSync('senhaDoUser', 10) */
/*COMPARAR SENHA INFORMADA COM A SENHA CRIPTOGRAFADA bcrypt.compareSync(senhaInformada, senhaCriptografada) */


const PORT = process.env.port || 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
