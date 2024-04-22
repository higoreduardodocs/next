import Link from 'next/link'

import Store from '../icons/store'

const Logo = () => {
  return (
    <Link href="/" className="flex gap-1">
      <Store />
      Ecommerce Admin
    </Link>
  )
}
export default Logo
