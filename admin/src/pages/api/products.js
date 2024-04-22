import path from 'path'
import fs from 'fs'

import { isAdminRequest } from './auth/[...nextauth]'
import { mongooseConnect } from '@/libs/mongoose'
import { Product } from '@/models/product-model'

export default async function handler(req, res) {
  await isAdminRequest(req, res)
  await mongooseConnect()

  try {
    const { method } = req

    if (method === 'GET') {
      if (req?.query.id) {
        return res
          .status(200)
          .json({ product: await Product.findById(req?.query.id) })
      }

      return res
        .status(200)
        .json({ products: await Product.find({}).populate('category') })
    }

    if (method === 'POST') {
      const {
        title,
        description,
        price,
        images,
        category,
        properties,
        categoryProperties,
      } = req.body

      const product = await Product.create({
        title,
        description,
        price,
        images,
        category,
        properties,
        categoryProperties,
      })
      return res.status(201).json({ product })
    }

    if (method === 'PUT') {
      const {
        _id,
        title,
        description,
        price,
        images,
        category,
        properties,
        categoryProperties,
      } = req.body
      const product = await Product.updateOne(
        { _id },
        {
          title,
          description,
          price,
          images,
          category,
          properties,
          categoryProperties,
        }
      )
      return res.status(200).json({ product })
    }

    if (method === 'DELETE') {
      if (req?.query.id) {
        const product = await Product.findById(req?.query.id)
        product.images.forEach((item) => {
          const pathname = path.join(__dirname, '../../../../public/' + item)
          if (fs.existsSync(pathname)) {
            fs.unlink(pathname, function (error) {
              if (error) throw 'Image not found'
            })
          }
        })
        await Product.deleteOne({ _id: req?.query.id })
        return res.status(204).json(true)
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
