import { useContext } from 'react'
import { styled } from 'styled-components'
import { toast } from 'react-toastify'

import { CartContext } from '@/contexts/cart-context'
import Center from '@/components/ui/center'
import ButtonLink from '@/components/ui/button-link'
import Button from '@/components/ui/button'
import Cart from '@/components/icons/cart'

const StyledSection = styled.section`
  background-color: #222;
  padding: 50px 0;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
  gap: 40px;

  img {
    max-width: 100%;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;

    div:nth-child(1) {
      order: 2;
    }
  }
`
const Title = styled.h1`
  margin: 0;
  color: #fff;
  font-weight: normal;
  font-size: 3rem;
`
const Description = styled.p`
  color: #aaa;
  font-size: 0.8rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`
const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`
const WrapperImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Featured = ({ product }) => {
  const { addProduct } = useContext(CartContext)

  const addFeaturedToCart = () => {
    addProduct(product._id)
    toast.success('Product Add to Cart', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  return (
    <StyledSection>
      <Center>
        <Wrapper>
          <div>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>

            <WrapperButton>
              <ButtonLink
                href={`/products/${product._id}`}
                white={1}
                outlined={1}
              >
                Read more
              </ButtonLink>

              <Button white={1} onClick={addFeaturedToCart}>
                <Cart className="w-8 h-8" />
                Add to cart
              </Button>
            </WrapperButton>
          </div>

          <WrapperImage>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/public/${product.images[0]}`}
              alt={product.title}
              className="h-[50px] object-cover"
            />
            {/* <Image
              loader={() => product.images[0]}
              src={product.images[0]}
              width={100}
              height={100}
              alt={product.title}
            /> */}
          </WrapperImage>
        </Wrapper>
      </Center>
    </StyledSection>
  )
}
export default Featured
