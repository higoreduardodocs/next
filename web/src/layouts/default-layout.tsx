'use client'

import styled from 'styled-components'

const DefaultLayout = styled.main`
  padding: 34px 40px;
  min-height: 100vh;
  background-color: var(--bg-primary);

  @media screen and (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    padding: 34px 160px;
  }
`
export default DefaultLayout
