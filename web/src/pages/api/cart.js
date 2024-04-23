import { mongooseConnect } from '@/libs/mongoose'
import { Product } from '@/models/product-model'

export default async function handler(req, res) {
  await mongooseConnect()

  const ids = req.body.ids
  return res.status(200).json({ products: await Product.find({ _id: ids }) })
}
