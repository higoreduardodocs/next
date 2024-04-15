'use client'

import styled from 'styled-components'
import { Saira_Stencil_One } from 'next/font/google'

import useFilter from '@/hooks/use-filter'
import Input from './input'
import CartControl from './cart-control'

const sairaStencilOne = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin'],
})

const TagHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background-color: #fff;

  > div {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  @media screen and (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    padding: 20px 160px;
  }

  @media screen and (min-width: ${(props) => props.theme.mobileBreakpoint}) {
    flex-direction: row;
  }
`
const Logo = styled.a`
  font-size: 40px;
  font-weight: 400;
  line-height: 150%;
  color: var(--logo-color);
  cursor: pointer;
  text-decoration: none;
`

export default function Header() {
  const { search, setSearch } = useFilter()

  return (
    <TagHeader>
      <Logo href="/" className={sairaStencilOne.className}>
        Capputeeno
      </Logo>
      <div>
        <Input value={search} handleChange={setSearch} />
        <CartControl />
      </div>
    </TagHeader>
  )
}
