import { z } from 'zod'

export const CreateContentDto = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  type: z.enum(['page', 'post', 'product', 'service']),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  language: z.string().default('en'),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  featuredImage: z.string().optional(),
  publishedAt: z.string().datetime().optional().nullable(),
})

export type CreateContentDtoType = z.infer<typeof CreateContentDto>