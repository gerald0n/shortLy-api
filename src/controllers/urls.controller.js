import { nanoid } from 'nanoid'
import jwt from 'jsonwebtoken'
import { db } from '../database/db.database.js'

export const newURLshortened = async (req, res) => {
   const { url } = req.body

   try {
      const { authorization } = req.headers
      const token = authorization?.replace('Bearer', '').trim()

      const shortUrl = nanoid(10)

      if (!token) return res.sendStatus(401)

      const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
         jwt.verify(token, process.env.SECRET_KEY).email
      ])

      if (user.rowCount === 0) return res.sendStatus(401)

      const checkContainsUrl = await db.query(
         `SELECT * FROM urls WHERE "idUser" = $1 AND url = $2`,
         [user.rows[0].id, url]
      )

      if (checkContainsUrl.rowCount > 0) return res.status(409).send('URL já encurtada!')

      await db.query(`INSERT INTO urls ("idUser", "shortUrl", url) VALUES ($1, $2, $3)`, [
         user.rows[0].id,
         shortUrl,
         url
      ])

      const countUrls = await db.query(`SELECT * FROM urls WHERE "idUser" = $1`, [user.rows[0].id])
      await db.query(`UPDATE users SET "linksCount" = $1 WHERE id = $2`, [
         countUrls.rowCount,
         user.rows[0].id
      ])

      const shortenedUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl])

      res.status(201).send({ id: shortenedUrl.rows[0].id, shortUrl })
   } catch (error) {
      res.status(500).send(error)
   }
}

export const getShortenedURLWhyID = async (req, res) => {
   const { id } = req.params

   //buscar URL por ID...
   //se não existir? res.sendStatus(404)
   //se existir? res.status(200).send(objeto da URL com id, url e shortenedURL)
}

export const openShortenedURL = async (req, res) => {
   const { shortUrl } = req.params

   //procurar no banco se existe uma URL que seja igual à shortUrl passada no params;
   //se existir? res.redirect('URL completa')
   //se não existir? res.statusCode(404)
}

export const deleteShortenedURL = async (req, res) => {
   const { id } = req.params

   try {
      const { authorization } = req.header
      const token = authorization?.replace('Bearer', '')

      if (token) return res.sendStatus(401)

      //verificar se tem alguma URL encurtada com o ID informado...
      //se não tiver? res.status(401).send('O ID informado não pertence a nenhuma URL.')
      //se tiver? segue...

      //verificar se o ID da URL verificada é igual o ID do user que está solicitando // APÓS A CRIAÇÃO DE UM NOVO TOKEN, ENVIAR TOKEN GERADO COMO ID DO USUÁRIO

      //se não for igual? res.status(401).send("Não autorizado!")
      //se for igual? deletar URL do banco // DELETE e res.sendStatus(200)
   } catch (error) {
      res.status(500).send(error)
   }
}

export const getDataUser = async (req, res) => {
   try {
      const { authorization } = req.header
      const token = authorization?.replace('Bearer', '')

      if (!token) return res.sendStatus(401)

      // TOKEN é o ID do usuário

      //pesquisar no banco pelo TOKEN e retornar os dados atrelados a ele...
      // DADOS:
      // ID do usuário,
      // name
      // contador de visitas: essa é a soma de views de todas as URLs do user

      // URLS:
      // id, shortURL, URL original, visitCount

      //se tudo der certo? res.status(200).send(todo o conteúdo mencionado acima)
   } catch (error) {
      res.status(500).send(error)
   }
}

export const getRanking = async (req, res) => {
   //retornar do banco todas as URLs encurtadas e ordenadas por número de views em seus links
   // mostrar apenas os 10 primeiros
}
