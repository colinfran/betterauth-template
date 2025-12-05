"use client"

import { FC, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"
import LoginForm from "../../components/login"
import { useSession } from "@/lib/auth/auth-client"
import { Button } from "@/components/ui/button"
import SignupForm from "@/components/signup"

const Page: FC = () => {
  const { data: session } = useSession()
  const [login, setLogin] = useState(true)
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {login ? "Welcome back!" : "Nice to meet you!"}
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>{login ? <LoginForm /> : <SignupForm />}</CardContent>
        <div className="flex flex-col justify-center">
          <p className="text-center">
            {login ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button className="h-auto p-0" variant="link" onClick={() => setLogin((state) => !state)}>
            {login ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Page
