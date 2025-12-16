import { z } from 'zod'

export const UpdateContentDto = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  type: z.enum(['page', 'post', 'product', 'service']).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  language: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().int().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  featuredImage: z.string().optional(),
  publishedAt: z.string().datetime().optional().nullable(),
})

export type UpdateContentDtoType = z.infer<typeof UpdateContentDto>