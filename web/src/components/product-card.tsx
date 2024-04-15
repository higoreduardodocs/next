/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import { formatPrice } from '@/utils/format'
import Divider from './divider'

interface CardProps {
  id: string
  image: string
  title: string
  price: number
}

const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;

  > img {
    width: 100%;
    object-fit: cover;
    height: 300px;
  }

  > div {
    padding: 8px 12px;

    > h3 {
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: var(--text-dark);
    }

    > span {
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      color: var(--text-black);
    }
  }
`

export default function ProductCard(props: CardProps) {
  const router = useRouter()
  const handleNavigate = () => router.push(`/produtos?id=${props.id}`)

  return (
    <CardContainer onClick={handleNavigate}>
      <img src={props.image} title={props.title} />
      <div>
        <h3>{props.title}</h3>
        <Divider />
        <span>{formatPrice(props.price)}</span>
      </div>
    </CardContainer>
  )
}
