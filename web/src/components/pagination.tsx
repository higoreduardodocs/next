'use client'

import styled from 'styled-components'

import useFilter from '@/hooks/use-filter'
import RightArrowIcon from './icons/right-arrow-icon'
import LeftArrowIcon from './icons/left-arrow-icon'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 32px;
`

const WrapperButton = styled.div<{ isArrow: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isArrow ? '4px' : '2px')};
`

const Button = styled.button<{ isActive: boolean }>`
  display: inline-block;
  width: 32px;
  height: 32px;
  padding: 4px;
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? '600' : '400')};
  line-height: 24px;
  text-align: center;
  border-radius: 8px;
  background-color: ${(props) =>
    props.isActive ? 'var(--light-color)' : 'var(--shapes-light)'};
  color: ${(props) =>
    props.isActive ? 'var(--orange-low)' : 'var(--text-dark)'};
  cursor: pointer;
  border: ${(props) =>
    props.isActive ? '1px solid var(--orange-low)' : '1px solid transparent'};

  &:hover {
    font-weight: 600;
    background-color: var(--light-color);
    color: var(--orange-low);
    border: 1px solid var(--orange-low);
  }
`

export default function Pagination() {
  const { page, setPage, perPage, totalCount } = useFilter()
  const totalButton = Math.ceil(totalCount / perPage)

  return (
    <Wrapper>
      <WrapperButton isArrow={false}>
        {Array.from({ length: totalButton }, (_, k) => k + 1).map((item, i) => (
          <Button
            key={i}
            isActive={page === item}
            onClick={() => setPage(item)}
          >
            {item}
          </Button>
        ))}
      </WrapperButton>
      <WrapperButton isArrow>
        <Button
          isActive={false}
          onClick={() => {
            if (page === 1) return
            setPage(page - 1)
          }}
        >
          <LeftArrowIcon />
        </Button>
        <Button
          isActive={false}
          onClick={() => {
            if (page === totalButton) return
            setPage(page + 1)
          }}
        >
          <RightArrowIcon />
        </Button>
      </WrapperButton>
    </Wrapper>
  )
}
