import { LoginDto } from '../../dto/auth/login.dto'
import { AuthService } from '../../services/auth.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const dto = LoginDto.parse(body)

  let result
  try {
    result = await AuthService.login(dto)
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  setCookie(event, 'auth', result.token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  return {
    id: result.id,
    email: result.email,
    role: result.role,
  }
})
