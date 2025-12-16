import bcrypt from 'bcrypt'
import { prisma } from '../utils/prisma'
import { signJwt } from '../utils/jwt'
import type { LoginDtoType } from '../dto/auth/login.dto'
import type { LoginResponseDto } from '../dto/auth/login-response.dto'

export const AuthService = {
  async login(dto: LoginDtoType): Promise<LoginResponseDto & { token: string }> {
    const user = await prisma.userAccount.findUnique({
      where: { email: dto.email },
    })

    if (!user || !user.is_active) {
      throw new Error('INVALID_CREDENTIALS')
    }

    const ok = await bcrypt.compare(dto.password, user.password_hash)
    if (!ok) {
      throw new Error('INVALID_CREDENTIALS')
    }

    const token = signJwt({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      token,
      id: user.id,
      email: user.email,
      role: user.role,
    }
  },
}
