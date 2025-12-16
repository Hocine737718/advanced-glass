import { MediaService } from '../../services/media.service'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  
  if (!user || user.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  
  const id = Number(event.context.params?.id)
  
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }
  
  try {
    await MediaService.deleteFile(id)
    
    return {
      success: true,
      message: 'File deleted successfully'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to delete file'
    })
  }
})