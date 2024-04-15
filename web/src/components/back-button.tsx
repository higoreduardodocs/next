import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import BackIcon from './icons/back-icon'

interface ButtonProps {
  navigate: string
}

const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: var(--text-gray);
  cursor: pointer;
  border: none;
  background-color: transparent;
`

export default function BackButton({ navigate }: ButtonProps) {
  const router = useRouter()
  const handleNavigate = () => router.push(navigate)

  return (
    <Container onClick={handleNavigate}>
      <BackIcon />
      Voltar
    </Container>
  )
}
