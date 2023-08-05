export const validateSchema = (signSchema) => {
   return (req, res, next) => {
      const validateUserSchema = signSchema.validate(req.body, { abortEarly: false })

      if (validateUserSchema.error) {
         const errors = validateUserSchema.error.details.map((detail) => detail.message)
         return res.status(422).send(errors)
      }

      next()
   }
}
