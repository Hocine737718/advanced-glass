import { createHandler } from '../../utils/baseHandler'
import { MediaService } from '../../services/media.service'
import { readMultipartFormData } from 'h3'

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf'
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

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
  
  // Validate file size
  if (filePart.data.length > MAX_FILE_SIZE) {
    throw createError({
      statusCode: 413,
      statusMessage: `File too large (max ${MAX_FILE_SIZE / 1024 / 1024}MB)`
    })
  }
  
  // Validate file type
  if (!ALLOWED_MIME_TYPES.includes(filePart.type as string)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`
    })
  }
  
  // Sanitize filename
  const sanitizedName = filePart.filename
    ? filePart.filename.replace(/[^a-zA-Z0-9.-]/g, '_')
    : 'upload'
  
  const user = event.context.user
  
  const media = await MediaService.uploadFile(
    {
      name: sanitizedName,
      data: filePart.data,
      size: filePart.data.length,
      //type: filePart.type
    },
    user?.sub
  )
  
  return {
    success: true,
    media,
    url: media.path,
    message: 'File uploaded successfully'
  }
})

export default createHandler(handler, { auth: true, admin: true })