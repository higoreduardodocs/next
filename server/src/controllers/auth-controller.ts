import { RequestHandler } from 'express'

import { signInSchema } from '../types/types'
import { createToken, validatePassword } from '../utils/helper'

export const signIn: RequestHandler = async (req, res) => {
  const body = signInSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  if (!validatePassword(body.data.password))
    res.status(403).json({ error: 'Acesso negado' })

  return res.status(200).json({ token: createToken() })
}
