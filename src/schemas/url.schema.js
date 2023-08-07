import Joi from "joi";

export const newUrlSchema = Joi.object({
  url: Joi.string().uri().required()
})