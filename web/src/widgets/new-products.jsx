import { styled } from 'styled-components'

import Center from '@/components/ui/center'
import ProductGrid from '@/components/ui/product-grid'

const Title = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  margin: 30px 0 20px 0;
`

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductGrid products={products} />
    </Center>
  )
}
