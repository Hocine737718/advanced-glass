import { ContentService } from '../../services/content.service'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  
  if (!user || user.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  
  const id = Number(event.context.params?.id)
  
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }
  
  await ContentService.delete(id)
  
  return { message: 'Content deleted successfully' }
})