import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { login } from '@/api/user'

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().min(8, { message: 'has to be filled' }),
})

type loginSchemaType = z.infer<typeof loginSchema>

const LoginForm: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })
  const mutation = useMutation({
    mutationFn: (data: loginSchemaType) => {
      const { email, password } = data
      return login({ email, password })
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(['user'])
    },
  })
  const onSubmit = (data: loginSchemaType) => {
    alert(JSON.stringify(data, null, 2))
    mutation.mutate(data)
  }

  return (
    <div>
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register('email')}
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  {errors?.email?.message && (
                    <p className="text-red-700 mb-4">{errors.email?.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    required
                  />
                  {errors?.password?.message && (
                    <p className="text-red-700 mb-4">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {/*                   <Button variant="outline" className="w-full">
                  Login with Google
                  </Button> */}
              </div>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginForm
