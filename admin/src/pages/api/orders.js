import { isAdminRequest } from './auth/[...nextauth]'
import { mongooseConnect } from '@/libs/mongoose'
import { Order } from '@/models/order-model'

export default async function handler(req, res) {
  await isAdminRequest(req, res)
  await mongooseConnect()

  try {
    return res
      .status(200)
      .json({ orders: await Order.find({}).sort({ createdAt: -1 }) })
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
