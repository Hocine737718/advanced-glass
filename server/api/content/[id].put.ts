import { UpdateContentDto } from '../../dto/content/update-content.dto'
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
  
  const body = await readBody(event)
  const dto = UpdateContentDto.parse(body)
  
  // If slug is being updated, check for uniqueness
  if (dto.slug) {
    const existing = await ContentService.findBySlug(dto.slug)
    if (existing && existing.id !== id) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Slug already exists' 
      })
    }
  }
  
  const content = await ContentService.update(id, dto)
  
  return content
})