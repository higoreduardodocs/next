import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import useLocalStorage from '@/hooks/use-localStorage'
import CartIcon from './icons/cart-icon'

const CartContainer = styled.button`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
`

const CountSpan = styled.span`
  position: absolute;
  right: -10px;
  top: 15px;
  width: 20px;
  height: 20px;
  background-color: var(--delete-color);
  border-radius: 50%;

  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  color: #fff;
`

export default function CartControl() {
  const router = useRouter()
  const { value } = useLocalStorage('cart-items', [])

  return (
    <CartContainer onClick={() => router.push('/carrinho')}>
      <CartIcon />
      <CountSpan>{value?.length}</CountSpan>
    </CartContainer>
  )
}
