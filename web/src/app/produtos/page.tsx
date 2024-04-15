/* eslint-disable @next/next/no-img-element */
'use client'

import styled from 'styled-components'

import { useProduct } from '@/hooks/use-product'
import { formatPrice } from '@/utils/format'
import DefaultLayout from '@/layouts/default-layout'
import BackButton from '@/components/back-button'
import CartIcon from '@/components/icons/cart-icon'

const WrapperPage = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }

  img {
    width: 100%;
  }

  @media screen and (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    flex-direction: row;

    img {
      max-width: 640px;
      width: 50%;
    }
  }
`

const ProductInfo = styled.div`
  span {
    display: block;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--text-black);
  }

  span:nth-of-type(2) {
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: var(--text-shapes);
  }

  span:nth-of-type(3) {
    font-size: 12px;
    line-height: 18px;
    margin: 24px 0 58px 0;
  }

  h2 {
    font-size: 32px;
    font-weight: 300;
    line-height: 48px;
    color: var(--text-black);
    margin: 12px 0 4px 0;
  }

  h3 {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: var(--text-black);
  }
`

const ShopButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border: none;
  background-color: var(--blue);
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;

  svg path {
    stroke: #fff;
  }

  @media screen and (min-width: ${(props) => props.theme.mobileBreakpoint}) {
    font-size: 16px;
  }
`

export default function ProdutoPage({
  searchParams,
}: {
  searchParams: { id: string }
}) {
  const { data } = useProduct(searchParams.id)

  const handleAddToCart = () => {
    const valueStr = localStorage.getItem('cart-items')
    if (!valueStr)
      return localStorage.setItem(
        'cart-items',
        JSON.stringify([{ ...data, quantity: 1, id: searchParams.id }])
      )

    const value = JSON.parse(valueStr)
    const findIndex = value.findIndex(
      (item: { id: string }) => item.id === searchParams.id
    )

    if (findIndex !== -1) value[findIndex].quantity += 1
    else value.push({ ...data, quantity: 1, id: searchParams.id })
    localStorage.setItem('cart-items', JSON.stringify(value))
  }

  return (
    <DefaultLayout>
      <BackButton navigate="/" />
      <WrapperPage>
        <img src={data?.image_url} alt={data?.name} />
        <div>
          <ProductInfo>
            <span>{data?.category}</span>
            <h2>{data?.name}</h2>
            <span>{formatPrice(data?.price_in_cents || 0)}</span>
            <span>
              *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de
              R$900,00.
            </span>
            <h3>Descrição</h3>
            <p>{data?.description}</p>
          </ProductInfo>
          <ShopButton onClick={handleAddToCart}>
            <CartIcon />
            Adicionar ao carrinho
          </ShopButton>
        </div>
      </WrapperPage>
    </DefaultLayout>
  )
}
