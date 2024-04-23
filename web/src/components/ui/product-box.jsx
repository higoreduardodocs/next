import { useContext } from 'react'
import { styled } from 'styled-components'
import { toast } from 'react-toastify'
import Link from 'next/link'

import { CartContext } from '@/contexts/cart-context'
import Button from './button'
import Cart from '../icons/cart'

const WhiteBoxLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  height: 150px;

  img {
    max-width: 100%;
    max-height: 150px;
  }
`
const TitleLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: normal;
  margin: 0;
  color: inherit;
  text-decoration: none;
`
const ProductInfo = styled.div`
  margin-top: 20px;
`
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`
const Price = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`

const ProductBox = ({ _id, title, description, images, price }) => {
  const { addProduct } = useContext(CartContext)

  const addProductToCart = (productId) => {
    addProduct(productId)
    toast.success('Product Add to Cart', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  return (
    <div>
      <WhiteBoxLink href={`/products/${_id}`}>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/public/${images[0]}`}
          alt={title}
        />
      </WhiteBoxLink>

      <ProductInfo>
        <TitleLink href={`/products/${_id}`}>{title}</TitleLink>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary={1} onClick={() => addProductToCart(_id)}>
            <Cart />
          </Button>
        </PriceRow>
      </ProductInfo>
    </div>
  )
}
export default ProductBox
