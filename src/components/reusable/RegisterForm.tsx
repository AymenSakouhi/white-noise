import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'

import { useMutation } from '@tanstack/react-query'
import { register as registerApi } from '@/api/user'
import { registerSchema } from '@/schemas/register'
import { RegisterSchemaType } from '@/types'

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

const RegisterForm: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
  ...props
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (data: RegisterSchemaType) => {
      const { name, email, password } = data
      return registerApi({ name, email, password })
    },
    onSuccess: () => {
      navigate({
        to: '/login',
      })
    },
  })
  const onSubmit = (data: RegisterSchemaType) => {
    mutation.mutate(data)
  }

  return (
    <div>
      <div className="flex flex-col gap-6" {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your email below to make an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">name</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    type="name"
                    placeholder="John"
                    required
                  />
                  {errors?.name?.message && (
                    <p className="text-red-700 mb-4">{errors.name?.message}</p>
                  )}
                </div>
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
                  Sign up
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Have an account?{' '}
                <Link to="/login" className="underline underline-offset-4">
                  login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RegisterForm
