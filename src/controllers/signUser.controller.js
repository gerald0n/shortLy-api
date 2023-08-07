import { db } from '../database/db.database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
   const { name, email, password } = req.body
   const password_encrypted = bcrypt.hashSync(password, 10)

   try {
      const checkContainsEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

      if (checkContainsEmail.rows[0]) return res.status(409).send('E-mail já cadastrado!')

      await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [
         name,
         email,
         password_encrypted
      ])

      res.sendStatus(201)
   } catch (error) {
      res.status(500).send(error)
   }
}

export const signIn = async (req, res) => {
   const { email, password } = req.body

   try {
      const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

      if (user.rowCount === 0 || bcrypt.compareSync(password, user.rows[0].password) === false)
         return res.status(401).send('E-mail ou Senha inválidos!')

      const token = jwt.sign({ email }, 'skljaksdj9983498327453lsldkjf', {
         expiresIn: '1y',
         subject: '1'
      })

      res.status(200).send({ token })
   } catch (error) {
      res.status(500).send(error)
   }
}
