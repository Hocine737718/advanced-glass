import { ContentService } from '../../services/content.service'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }
  
  const content = await ContentService.findById(id)
  
  if (!content) {
    throw createError({ statusCode: 404, statusMessage: 'Content not found' })
  }
  
  return content
})