'use client'

import styled from 'styled-components'

import { useProducts } from '@/hooks/use-product'
import ProductCard from './product-card'

const ProductGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
`

export default function ProductList() {
  const { data: products } = useProducts()

  return (
    <ProductGrid>
      {products?.length &&
        products.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            image={item.image_url}
            title={item.name}
            price={item.price_in_cents}
          />
        ))}
    </ProductGrid>
  )
}
