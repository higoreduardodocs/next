import styled from 'styled-components'

import SearchIcon from './icons/search-icon'

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  width: 250px;

  > svg {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  @media screen and (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    width: 352px;
  }
`
const InputField = styled.input`
  padding: 10px 16px;
  background-color: var(--bg-secondary);
  border: none;
  border-radius: 8px;
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;

  &::placeholder {
    color: var(--text-dark);
  }

  @media screen and (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    font-size: 14px;
  }
`

interface InputProps {
  value: string
  handleChange: (value: string) => void
}

export default function Input(props: InputProps) {
  return (
    <InputContainer>
      <InputField
        onChange={(e) => props.handleChange(e.target.value)}
        placeholder="Procurando por algo específico?"
      />
      <SearchIcon />
    </InputContainer>
  )
}
