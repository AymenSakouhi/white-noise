import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from 'formik'
import { createFileRoute } from '@tanstack/react-router'

import Layout from '@/components/reusable/Layout'
import { Button } from '@/components/ui/button'
import { contactSchema } from '@/schemas'
import { ContactSchemaType } from '@/types'

export const Route = createFileRoute('/contact')({
  component: Contact,
})
//TODO switch to react-hook-form
function Contact() {
  return (
    <Layout>
      <div className="p-2">
        <Formik
          initialValues={{
            firstName: '',
            secondName: '',
            email: '',
            message: '',
          }}
          validationSchema={toFormikValidationSchema(contactSchema)}
          onSubmit={(
            values: ContactSchemaType,
            { setSubmitting }: FormikHelpers<ContactSchemaType>,
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              // to mock a state change
              setSubmitting(false)
            }, 1000)
          }}
        >
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="John" />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-sm"
            />
            <label htmlFor="secondName">Second Name</label>
            <Field id="secondName" name="secondName" placeholder="Smith" />
            <ErrorMessage
              name="secondName"
              component="div"
              className="text-red-500 text-sm"
            />
            <label htmlFor="email">email</label>
            <Field id="email" name="email" placeholder="John@123.com" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
            <label htmlFor="message">Message</label>
            <Field
              id="message"
              name="message"
              placeholder="Your message"
              as="textarea"
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-red-500 text-sm"
            />
            <Button type="submit">send</Button>
          </Form>
        </Formik>
      </div>
    </Layout>
  )
}
