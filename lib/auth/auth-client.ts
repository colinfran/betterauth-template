import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient()

export const { useSession } = createAuthClient()

export type SessionType = typeof useSession
