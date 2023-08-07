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
         jwt.verify(token, 'skljaksdj9983498327453lsldkjf').email
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

   const shortUrl = await db.query(`SELECT * FROM urls WHERE id = $1`, [id])

   if (shortUrl.rowCount === 0) return res.sendStatus(404)

   delete shortUrl.rows[0].idUser
   delete shortUrl.rows[0].visitCount
   delete shortUrl.rows[0].createdAt

   res.status(200).send(...shortUrl.rows)
}

export const openShortenedURL = async (req, res) => {
   const { shortUrl } = req.params

   const URL = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl])

   if (URL.rowCount === 0) return res.sendStatus(404)

   await db.query(`UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`, [
      URL.rows[0].visitCount + 1,
      shortUrl
   ])

   res.redirect(URL.rows[0].url)
}

export const deleteShortenedURL = async (req, res) => {
   const { id } = req.params

   try {
      const { authorization } = req.headers
      const token = authorization?.replace('Bearer', '').trim()

      if (!token) return res.sendStatus(401)

      const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
         jwt.verify(token, 'skljaksdj9983498327453lsldkjf').email
      ])

      if (user.rowCount === 0) return res.sendStatus(401)

      const shortUrl = await db.query(`SELECT * FROM urls WHERE id = $1`, [id])

      if (shortUrl.rowCount === 0) return res.status(404).send('URL inexistente!')

      if (user.rows[0].id !== shortUrl.rows[0].idUser) return res.sendStatus(401)

      await db.query(`DELETE FROM urls WHERE id = $1`, [shortUrl.rows[0].id])

      res.status(204).send('shortUrl deletada!')
   } catch (error) {
      res.status(500).send(error)
   }
}

export const getDataUser = async (req, res) => {
   try {
      const { authorization } = req.headers
      const token = authorization?.replace('Bearer', '').trim()

      if (!token) return res.sendStatus(401)

      const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
         jwt.verify(token, 'skljaksdj9983498327453lsldkjf').email
      ])

   } catch (error) {
      res.status(500).send(error)
   }
}

export const getRanking = async (req, res) => {
   //retornar do banco todas as URLs encurtadas e ordenadas por número de views em seus links
   // mostrar apenas os 10 primeiros
}
