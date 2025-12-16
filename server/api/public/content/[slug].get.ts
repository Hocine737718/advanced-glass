import { ContentService } from '../../../services/content.service'

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug
  
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }
  
  const content = await ContentService.findBySlug(slug)
  
  if (!content || content.status !== 'published') {
    throw createError({ statusCode: 404, statusMessage: 'Content not found' })
  }
  
  return content
})