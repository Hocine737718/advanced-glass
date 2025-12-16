import { ContentService } from '../../../services/content.service'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  const language = (query.language as string) || 'en'
  
  const contents = await ContentService.getPublishedContent(language)
  
  return contents
})