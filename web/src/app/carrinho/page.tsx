'use client'

import styled from 'styled-components'

import { ProductInCart } from '@/types/product-type'
import { formatPrice } from '@/utils/format'
import useLocalStorage from '@/hooks/use-localStorage'
import DefaultLayout from '@/layouts/default-layout'
import BackButton from '@/components/back-button'
import ProductCart from '@/components/product-cart'
import Divider from '@/components/divider'

const WrapperPage = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: space-between;
  color: var(--text-black);

  @media screen and (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    flex-direction: row;
  }
`

const CartDetail = styled.div`
  flex: 1 1 730px;
  h2 {
    font-size: 24px;
    font-weight: 500;
    line-height: 36px;
    text-transform: uppercase;
    margin: 24px 0 6px 0;
  }

  p {
    font-size: 16px;
    line-height: 24px;
    font-weight: 300;

    span {
      font-weight: 600;
    }
  }
`

const CartItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`

const CartInfo = styled.div`
  background-color: #fff;
  padding: 16px 24px;
  width: 100%;
  flex: 1 1 350px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: var(--text-black);
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: var(--text-dark);
    text-transform: uppercase;
    text-decoration: underline;
    cursor: pointer;

    display: block;
    &:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
`

const CartInfoItem = styled.div<{ isBold: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  p {
    font-size: 16px;
    font-weight: ${(props) => (props.isBold ? '600' : '400')};
    line-height: 24px;
    color: var(--text-black);
  }
`

const CheckoutButton = styled.button`
  width: 100%;
  border-radius: 4px;
  padding: 16px 0;
  text-align: center;
  border: none;
  cursor: pointer;

  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  background-color: var(--green-color);
  color: var(--light-color);
  text-transform: uppercase;
  margin-top: 40px;
`

export default function CarrinhoPage() {
  const { value, updateValue } = useLocalStorage<ProductInCart[]>(
    'cart-items',
    []
  )
  const cartSubTotal = value.reduce(
    (acc, cur) => acc + cur.quantity * cur.price_in_cents,
    0
  )
  const shippingFee = 4000
  const handleUpdateCart = (id: string, quantity: number) => {
    const newValue = value.map((item) => {
      if (item.id === id) item.quantity = quantity
      return item
    })
    updateValue(newValue)
  }
  const handleDelete = (id: string) => {
    const newValue = value.filter((item) => item.id !== id)
    updateValue(newValue)
  }

  return (
    <DefaultLayout>
      <WrapperPage>
        <CartDetail>
          <BackButton navigate="/" />
          <h2>Carrinho</h2>
          <p>
            Total ({value.length} produtos){' '}
            <span>{formatPrice(cartSubTotal)}</span>
          </p>
          <CartItemList>
            {value.map((item) => (
              <ProductCart
                key={item.id}
                cartItem={item}
                handleUpdateQuantity={handleUpdateCart}
                handleDelete={handleDelete}
              />
            ))}
          </CartItemList>
        </CartDetail>
        <CartInfo>
          <div>
            <h3>Resumo do pedido</h3>
            <CartInfoItem isBold={false}>
              <p>Subtotal de produtos</p>
              <p>{formatPrice(cartSubTotal)}</p>
            </CartInfoItem>
            <CartInfoItem isBold={false}>
              <p>Entrega</p>
              <p>{formatPrice(shippingFee)}</p>
            </CartInfoItem>
            <Divider />
            <CartInfoItem isBold>
              <p>Total</p>
              <p>{formatPrice(cartSubTotal + shippingFee)}</p>
            </CartInfoItem>
            <CheckoutButton>Finalizar compra</CheckoutButton>
          </div>
          <div>
            <a>Ajuda</a>
            <a>Reembolsos</a>
            <a>Entregas e fretes</a>
            <a>Trocas e devoluções</a>
          </div>
        </CartInfo>
      </WrapperPage>
    </DefaultLayout>
  )
}
