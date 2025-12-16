import { randomBytes } from 'crypto'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const UPLOAD_DIR = 'public/uploads'

// Ensure upload directory exists
export async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }
}

export function generateUniqueFilename(originalName: string): string {
  const ext = path.extname(originalName)
  const base = path.basename(originalName, ext)
  const unique = randomBytes(8).toString('hex')
  return `${base}-${unique}${ext}`
}

export function getMimeType(ext: string): string {
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
  return mimeTypes[ext.toLowerCase()] || 'application/octet-stream'
}