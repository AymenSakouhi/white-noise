import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createFileRoute } from '@tanstack/react-router'

import Layout from '@/components/reusable/Layout'
import { Button } from '@/components/ui/button'
import { contactSchema } from '@/schemas/contact'
import { ContactSchemaType } from '@/types'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactSchemaType) => {
    console.log(data)
  }
  return (
    <Layout>
      <div className="p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            {...register('firstName')}
            id="firstName"
            name="firstName"
            placeholder="John"
          />
          {errors?.firstName?.message && (
            <p className="text-red-700 mb-4">{errors.firstName?.message}</p>
          )}
          <label htmlFor="secondName">Second Name</label>
          <input
            {...register('secondName')}
            type="text"
            id="secondName"
            name="secondName"
            placeholder="Smith"
          />
          {errors?.secondName?.message && (
            <p className="text-red-700 mb-4">{errors.secondName?.message}</p>
          )}
          <label htmlFor="email">email</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            name="email"
            placeholder="John@123.com"
          />
          {errors?.email?.message && (
            <p className="text-red-700 mb-4">{errors.email?.message}</p>
          )}
          <label htmlFor="message">Message</label>
          <textarea
            {...register('message')}
            id="message"
            name="message"
            placeholder="Your message"
          />
          {errors?.message?.message && (
            <p className="text-red-700 mb-4">{errors.message?.message}</p>
          )}
          <Button type="submit">send</Button>
        </form>
      </div>
    </Layout>
  )
}
