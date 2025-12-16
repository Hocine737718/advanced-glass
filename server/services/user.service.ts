import { prisma } from '../../server/utils/prisma'

export const UserService = {
  findByEmail(email: string) {
    return prisma.userAccount.findUnique({ where: { email } })
  },

  create(data: {
    email: string
    password_hash: string
    role?: string
  }) {
    return prisma.userAccount.create({ data })
  },
}
