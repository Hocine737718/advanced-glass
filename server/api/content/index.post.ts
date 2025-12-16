// Import prisma at the end
import { prisma } from '../../utils/prisma'
import { requireAdmin } from '../../utils/auth'
import { CreateContentDto } from '../../dto/content/create-content.dto'

export default defineEventHandler(async (event) => {
  const user = requireAdmin(event) // Get user after auth check
  
  const body = await readBody(event)
  const dto = CreateContentDto.parse(body)
  
  // Simple logic
  const existing = await prisma.content.findUnique({
    where: { slug: dto.slug }
  })
  
  if (existing) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Slug already exists' 
    })
  }
  
  return prisma.content.create({
    data: {
      ...dto,
      authorId: user.sub
    }
  })
})

