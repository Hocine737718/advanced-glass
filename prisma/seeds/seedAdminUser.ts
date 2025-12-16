import type { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'


export async function seedAdminUser(prisma: PrismaClient) {
  const email = 'admin@advancedglass.com'
  const plainPassword = 'Admin@123' // CHANGE AFTER FIRST LOGIN

  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const admin = await prisma.userAccount.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password_hash: hashedPassword,
      role: 'ADMIN',
      is_active: true
    }
  })

  console.log('✅ Admin account created:', {
    email: admin.email,
    role: admin.role
  })
}