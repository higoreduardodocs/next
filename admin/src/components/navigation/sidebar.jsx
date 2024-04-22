import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

import Store from '../icons/store'
import House from '../icons/house'
import Box from '../icons/box'
import Bullets from '../icons/bullets'
import List from '../icons/list'
import Gear from '../icons/gear'
import Logout from '../icons/logout'

const Sidebar = ({ showSidebar }) => {
  const router = useRouter()
  const { pathname } = router

  const inactiveLink = 'flex gap-1 p-2'
  const activeLink = `${inactiveLink} bg-white text-blue-900 rounded-l-lg`

  const getClassName = (path) =>
    pathname.includes(path) ? activeLink : inactiveLink
  const logout = async () => {
    await router.push('/')
    await signOut()
  }

  return (
    <aside
      className={`p-2 md:pr-0 text-white md:w-auto md:static fixed w-full h-full bg-blue-900 transition-all ${
        showSidebar ? 'left-0' : '-left-full'
      }`}
    >
      <Link href="/" className="flex gap-1 mb-4 mr-4">
        <Store />
        Ecommerce Admin
      </Link>

      <nav className="flex flex-col gap-2">
        <Link href="/" className={pathname === '/' ? activeLink : inactiveLink}>
          <House />
          Dashboard
        </Link>

        <Link href="/products" className={getClassName('/products')}>
          <Box />
          Products
        </Link>

        <Link href="/categories" className={getClassName('/categories')}>
          <Bullets />
          Categories
        </Link>

        <Link href="/orders" className={getClassName('/orders')}>
          <List />
          Orders
        </Link>

        <Link href="/settings" className={getClassName('/settings')}>
          <Gear />
          Settings
        </Link>

        <button onClick={logout} className={inactiveLink}>
          <Logout />
          Logout
        </button>
      </nav>
    </aside>
  )
}
export default Sidebar
