import { useSession } from 'next-auth/react'
import { useState } from 'react'

import Auth from '@/widgets/auth'
import Sidebar from '@/components/navigation/sidebar'
import Logo from '@/components/ui/logo'
import Bars from '@/components/icons/bars'

export default function Layout({ children }) {
  const { data: session } = useSession()
  const [showSidebar, setShowSidebar] = useState(false)

  if (!session) return <Auth />

  return (
    <section className="min-h-screen bg-blue-900 flex">
      <Sidebar showSidebar={showSidebar} />

      <div className="bg-white flex-grow m-2 md:ml-0 rounded-lg p-4">
        <div className="flex gap-2 mb-2 p-4 md:hidden">
          <button onClick={() => setShowSidebar(true)}>
            <Bars />
          </button>

          <div className="flex items-center justify-center flex-grow mr-6">
            <Logo />
          </div>
        </div>

        <section>{children}</section>
      </div>
    </section>
  )
}
