/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components'

import { ProductInCart } from '@/types/product-type'
import { formatPrice } from '@/utils/format'
import DeleteIcon from './icons/delete-icon'

interface CartProps {
  cartItem: ProductInCart
  handleUpdateQuantity(id: string, quantity: number): void
  handleDelete(id: string): void
}

const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  color: var(--text-black);
  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  > div {
    position: relative;
    padding: 16px 32px;
    background-color: #fff;
    width: 100%;

    h4 {
      font-size: 20px;
      font-weight: 300;
      line-height: 30px;
    }

    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      margin: 12px 0 24px 0;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      select {
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        background-color: var(--bg-secondary);
        color: var(--text-dark);
      }

      span {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        color: var(--text-shapes);
      }
    }
  }

  @media screen and (min-width: ${(props) => props.theme.mobileBreakpoint}) {
    flex-direction: row;

    img {
      max-width: 210px;
    }
  }
`

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 32px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`

export default function ProductCart({
  cartItem,
  handleUpdateQuantity,
  handleDelete,
}: CartProps) {
  return (
    <CardWrapper>
      <img src={cartItem.image_url} alt={cartItem.name} />
      <div>
        <DeleteButton onClick={() => handleDelete(cartItem.id)}>
          <DeleteIcon />
        </DeleteButton>
        <h4>{cartItem.name}</h4>
        <p>{cartItem.description}</p>
        <div>
          <select
            value={cartItem.quantity}
            onChange={(ev) =>
              handleUpdateQuantity(cartItem.id, Number(ev.target.value))
            }
          >
            {Array.from({ length: 5 }, (_, k) => k + 1).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <span>{formatPrice(cartItem.price_in_cents)}</span>
        </div>
      </div>
    </CardWrapper>
  )
}
