import { MediaService } from '../../services/media.service'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  
  // Optional: restrict to admins
  // if (!user || user.role !== 'ADMIN') {
  //   throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  // }
  
  const query = getQuery(event)
  
  const files = await MediaService.listFiles({
    skip: query.skip ? Number(query.skip) : 0,
    take: query.take ? Number(query.take) : 50,
    orderBy: (query.orderBy as 'asc' | 'desc') || 'desc'
  })
  
  return files
})