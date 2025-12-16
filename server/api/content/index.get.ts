import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  return prisma.content.findMany({
    where: {
      status: 'published',
      language: query.lang as string || 'en'
    },
    orderBy: { order: 'asc' },
    take: 100
  })
})