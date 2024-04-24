import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const CarrouselProduct = ({ images }) => {
  return (
    <div className="sticky top-[80px] w-full">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.length > 0 &&
          images.map((item) => (
            <img
              key={item.id}
              src={item?.attributes?.url}
              alt={item?.attributes?.name}
            />
          ))}
      </Carousel>
    </div>
  )
}
export default CarrouselProduct
