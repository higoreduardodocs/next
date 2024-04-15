import styled from 'styled-components'

import useFilter from '@/hooks/use-filter'
import { FilterType } from '@/types/filter-type'

interface FilterItemProps {
  selected: boolean
}

const FilterList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;

  @media screen and (min-width: ${(props) => props.theme.mobileBreakpoint}) {
    gap: 40px;
    flex-wrap: no-wrap;
  }
`

const FilterItem = styled.li<FilterItemProps>`
  font-family: inherit;
  font-size: 12px;
  font-weight: ${(props) => (props.selected ? '600' : '400')};
  line-height: 22px;
  color: ${(props) =>
    props.selected ? 'var(--text-black)' : 'var(--text-dark)'};
  text-transform: uppercase;
  padding: 4px 0;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.selected ? '4px solid var(--orange-low)' : ''};

  @media screen and (min-width: ${(props) => props.theme.mobileBreakpoint}) {
    font-size: 16px;
  }
`

export default function FilterByType() {
  const { type, setType } = useFilter()

  return (
    <FilterList>
      <FilterItem
        selected={type == FilterType.ALL}
        onClick={() => setType(FilterType.ALL)}
      >
        Todos os produtos
      </FilterItem>
      <FilterItem
        selected={type == FilterType.SHIRT}
        onClick={() => setType(FilterType.SHIRT)}
      >
        Camisetas
      </FilterItem>
      <FilterItem
        selected={type == FilterType.MUG}
        onClick={() => setType(FilterType.MUG)}
      >
        Canecas
      </FilterItem>
    </FilterList>
  )
}
