import { styled } from 'styled-components'

import Center from '@/components/ui/center'

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`

const CheckoutSuccess = () => {
  return (
    <main>
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1>Thanks for your order!</h1>
            <p>We will email you when your order will be sent.</p>
          </Box>
        </ColumnsWrapper>
      </Center>
    </main>
  )
}
export default CheckoutSuccess
