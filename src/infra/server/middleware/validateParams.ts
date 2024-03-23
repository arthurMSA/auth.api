import { Request, Response } from "express"
import { Schema } from "joi"

export const validateParams = (schema: Schema, paramsType: string) => {
    return (req: Request, res: Response, next) => {
        const { error } = schema.validate(req[paramsType], { abortEarly: false })
        if (error) {
            return res.status(400).send({ error })
        }
        next()
    }
}