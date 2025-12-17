import { authClient, SessionType, useSession } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"

type AuthType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signOut: () => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signIn: (email: string, password: string, throwError: any) => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signUp: () => Promise<any>
  useSession: () => Promise<SessionType>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAuth: any = () => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const signOut = async (): Promise<any> => {
    return await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }

  const signIn = async (
    email: string,
    password: string,
    throwError: (err: string) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    return await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: true,
      },
      {
        onError: (ctx) => {
          throwError(ctx.error.message)
        },
        onSuccess: () => {
          router.push("/dashboard")
        },
      },
    )
  }

  const signUp = async (
    name: string,
    email: string,
    password: string,
    throwError: (err: string) => void,
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
          router.push("/dashboard")
        },
        onError: (ctx) => {
          throwError(ctx.error.message)
        },
      },
    )
  }

  return { useSession, signIn, signOut, signUp }
}

export default useAuth
