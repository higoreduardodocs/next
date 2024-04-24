import { Post } from '@prisma/client'

import { prisma } from '@/libs/prisma'
import Trending from './(home)/trending'

async function getPosts() {
  const posts = await prisma.post.findMany({})

  const formattedPosts = await Promise.all(
    posts.map(async (item) => {
      const imageModule = require(`../../public${item.image}`)
      return {
        ...item,
        image: imageModule,
      }
    })
  )

  return formattedPosts
}

export default async function Home() {
  const posts = await getPosts()

  const formatPosts = () => {
    const trendingPosts: Array<Post> = []
    const techPosts: Array<Post> = []
    const travelPosts: Array<Post> = []
    const otherPosts: Array<Post> = []

    posts.forEach((item: Post, i: number) => {
      if (item.category === 'Business') trendingPosts.push(item)
      else if (item.category === 'Tech') techPosts.push(item)
      else if (item.category === 'Travel') travelPosts.push(item)
      else if (item.category === 'Interior Design') otherPosts.push(item)
    })

    return [trendingPosts, techPosts, travelPosts, otherPosts]
  }

  const [trendingPosts, techPosts, travelPosts, otherPosts] = formatPosts()

  return (
    <main className="px-10 py-4 leading-7">
      <Trending trendingPosts={trendingPosts} />
    </main>
  )
}
