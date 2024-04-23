import { mongooseConnect } from '@/libs/mongoose'
import { Product } from '@/models/product-model'
import Featured from '@/widgets/featured'

export default function Home({ featuredProduct, newProducts }) {
  return (
    <main>
      <Featured product={featuredProduct} />
    </main>
  )
}

export async function getServerSideProps() {
  await mongooseConnect()
  const featuredProduct = await Product.findOne({ featured: true })
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  })

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  }
}
