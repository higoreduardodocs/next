import { styled } from 'styled-components'
import Link from 'next/link'

import { ButtonStyle } from './button'

const StyledLink = styled(Link)`
  ${ButtonStyle}
`

const ButtonLink = (props) => {
  return <StyledLink {...props} />
}
export default ButtonLink
