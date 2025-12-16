import { createHandler } from '../../utils/baseHandler'
import { MediaService } from '../../services/media.service'
import { readMultipartFormData } from 'h3'

const handler = defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  
  if (!parts || parts.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file uploaded'
    })
  }
  
  const filePart = parts.find(part => part.name === 'file')
  
  if (!filePart || !filePart.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File is required'
    })
  }
  
  const user = event.context.user
  
  const media = await MediaService.uploadFile(
    {
      name: filePart.filename || 'upload',
      data: filePart.data,
      size: filePart.data.length
    },
    user?.sub
  )
  
  return {
    success: true,
    media,
    url: media.path
  }
})

export default createHandler(handler, { auth: true, admin: true })