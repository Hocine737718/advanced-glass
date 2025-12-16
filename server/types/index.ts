declare module 'h3' {
  interface H3EventContext {
    user?: {
      sub: number
      email: string
      role: string
    }
  }
}

export {}