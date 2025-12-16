import { prisma } from '../utils/prisma'
import { requireAdmin } from '../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdmin(event) // Just call the function
  
  return prisma.userAccount.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      is_active: true,
    },
  })
})