'use client'

import styled from 'styled-components'

import FilterByType from './filter-type'
import FilterPriority from './filter-priority'

const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;

  @media screen and (min-width: ${(props) => props.theme.mobileBreakpoint}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export default function FilterBar() {
  return (
    <FilterBarContainer>
      <FilterByType />
      <FilterPriority />
    </FilterBarContainer>
  )
}
