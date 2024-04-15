import { useState } from 'react'
import styled from 'styled-components'

import { FilterPriorityType } from '@/types/filter-type'
import useFilter from '@/hooks/use-filter'
import ArrowIcon from './icons/arrow-icon'

const FilterContainer = styled.div`
  position: relative;
  widht: 176px;
`

const FilterDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  cursor: pointer;

  > span {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
    color: var(--text-dark);
  }
`

const FilterList = styled.ul`
  position: absolute;
  top: 30px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: 0 4px 12px #0000001a;
  background-color: #fff;
  width: 176px;
`

const FilterItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  text-align: left;
  cursor: pointer;
`

export default function FilterPriority() {
  const [open, setOpen] = useState(false)
  const { setPriority } = useFilter()

  const handleOpen = () => setOpen(!open)
  const handlePriority = (value: FilterPriorityType) => {
    setPriority(value)
    handleOpen()
  }

  return (
    <FilterContainer>
      <FilterDrop onClick={handleOpen}>
        <span>Organizar por</span>
        <ArrowIcon />
      </FilterDrop>
      {open && (
        <FilterList>
          <FilterItem onClick={() => handlePriority(FilterPriorityType.NEWS)}>
            Novidades
          </FilterItem>
          <FilterItem
            onClick={() => handlePriority(FilterPriorityType.MINOR_PRICE)}
          >
            Preço: Maior - Menor
          </FilterItem>
          <FilterItem
            onClick={() => handlePriority(FilterPriorityType.BIGGEST_PRICE)}
          >
            Preço: Menor - Maior
          </FilterItem>
          <FilterItem
            onClick={() => handlePriority(FilterPriorityType.POPULARITY)}
          >
            Mais vendidos
          </FilterItem>
        </FilterList>
      )}
    </FilterContainer>
  )
}
