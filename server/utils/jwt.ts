import jwt, { type SignOptions } from 'jsonwebtoken'
import type { JwtPayloadDto } from '../dto/auth/jwt-payload.dto'

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET as string

const signOptions: SignOptions = {
  expiresIn: (process.env.JWT_EXPIRES_IN ?? '1d') as SignOptions['expiresIn'],
}

export function signJwt(payload: JwtPayloadDto): string {
  return jwt.sign(payload, JWT_SECRET, signOptions)
}


export function verifyJwt(token: string): JwtPayloadDto {
  const decoded = jwt.verify(token, JWT_SECRET)

  if (typeof decoded !== 'object' || decoded === null) {
    throw new Error('Invalid JWT payload')
  }

  // Runtime shape validation
  if (
    typeof decoded.sub !== 'number' &&
    typeof decoded.sub !== 'string'
  ) {
    throw new Error('Invalid JWT subject')
  }

  if (typeof decoded.email !== 'string') {
    throw new Error('Invalid JWT email')
  }

  if (typeof decoded.role !== 'string') {
    throw new Error('Invalid JWT role')
  }

  return {
    sub: Number(decoded.sub),
    email: decoded.email,
    role: decoded.role,
  }
}
