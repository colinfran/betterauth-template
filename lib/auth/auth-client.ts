import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient()

const { useSession } = createAuthClient()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signOut = async (): Promise<any> => {
  return await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/" // redirect to login page
      },
    },
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signIn = async (email: string, password: string): Promise<any> => {
  return await authClient.signIn.email({
    email,
    password,
    callbackURL: "/dashboard",
    rememberMe: true,
  })
}

const signUp = async (
  name: string,
  email: string,
  password: string,
  redirect: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  return await authClient.signUp.email(
    {
      email,
      password,
      name,
    },
    {
      onSuccess: () => {
        redirect()
      },
    },
  )
}

export { useSession, signIn, signOut, signUp }
