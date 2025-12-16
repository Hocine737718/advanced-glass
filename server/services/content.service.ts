import { prisma } from '../utils/prisma'
import type { CreateContentDtoType } from '../dto/content/create-content.dto'
import type { UpdateContentDtoType } from '../dto/content/update-content.dto'

export const ContentService = {
  async create(data: CreateContentDtoType & { authorId?: number }) {
    return prisma.content.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        type: data.type,
        status: data.status,
        language: data.language,
        featured: data.featured,
        order: data.order,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords,
        featuredImage: data.featuredImage,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        authorId: data.authorId,
      },
    })
  },

  async update(id: number, data: UpdateContentDtoType) {
    const updateData: any = { ...data }
    
    if (data.publishedAt !== undefined) {
      updateData.publishedAt = data.publishedAt ? new Date(data.publishedAt) : null
    }
    
    return prisma.content.update({
      where: { id },
      data: updateData,
    })
  },

  async delete(id: number) {
    return prisma.content.delete({
      where: { id },
    })
  },

  async findById(id: number) {
    return prisma.content.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })
  },

  async findBySlug(slug: string) {
    return prisma.content.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })
  },

  async findAll(
    filters: {
      type?: string
      status?: string
      language?: string
      featured?: boolean
    } = {},
    options: {
      skip?: number
      take?: number
      orderBy?: Record<string, 'asc' | 'desc'>
    } = {}
  ) {
    return prisma.content.findMany({
      where: {
        ...(filters.type && { type: filters.type }),
        ...(filters.status && { status: filters.status }),
        ...(filters.language && { language: filters.language }),
        ...(filters.featured !== undefined && { featured: filters.featured }),
      },
      skip: options.skip,
      take: options.take || 50,
      orderBy: options.orderBy || { order: 'asc', createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })
  },

  async getPublishedContent(language: string = 'en') {
    return prisma.content.findMany({
      where: {
        status: 'published',
        language,
      },
      orderBy: { order: 'asc' },
    })
  },
}