import { prisma } from '../utils/prisma'
import { ensureUploadDir, generateUniqueFilename, getMimeType } from '../utils/upload'
import { randomBytes } from 'crypto'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'

export const MediaService = {
  async uploadFile(
    file: { name: string; data: Buffer; size: number },
    userId?: number
  ) {
    await ensureUploadDir()
    
    const uniqueName = generateUniqueFilename(file.name)
    const filePath = path.join('public/uploads', uniqueName)
    
    // Save file
    await writeFile(filePath, file.data)
    
    // Create database record
    const media = await prisma.media.create({
      data: {
        filename: uniqueName,
        originalName: file.name,
        mimeType: getMimeType(path.extname(file.name)),
        size: file.size,
        path: `/uploads/${uniqueName}`,
        uploadedById: userId
      }
    })
    
    return media
  },
  
  async deleteFile(id: number) {
    const media = await prisma.media.findUnique({
      where: { id }
    })
    
    if (!media) {
      throw new Error('Media not found')
    }
    
    // Delete file from disk
    try {
      const filePath = path.join('public', media.path)
      await unlink(filePath)
    } catch (error) {
      console.warn('Failed to delete file from disk:', error)
    }
    
    // Delete from database
    await prisma.media.delete({
      where: { id }
    })
    
    return true
  },
  
  async listFiles(options?: {
    skip?: number
    take?: number
    orderBy?: 'asc' | 'desc'
  }) {
    return prisma.media.findMany({
      skip: options?.skip || 0,
      take: options?.take || 50,
      orderBy: { createdAt: options?.orderBy || 'desc' },
      include: {
        uploadedBy: {
          select: {
            id: true,
            email: true
          }
        }
      }
    })
  },
  
  async getFile(id: number) {
    return prisma.media.findUnique({
      where: { id },
      include: {
        uploadedBy: {
          select: {
            id: true,
            email: true
          }
        }
      }
    })
  }
}