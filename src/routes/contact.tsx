import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { createFileRoute } from '@tanstack/react-router'

import Layout from '@/components/reusable/Layout'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const schema = z.object({
  firstName: z.string().min(1, { message: 'This field has to be filled.' }),
  secondName: z.string().min(1, { message: 'This field has to be filled.' }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
})

type schemaType = z.infer<typeof schema>

function Contact() {
  return (
    <Layout>
      <div className="p-2">
        <Formik
          initialValues={{
            firstName: '',
            secondName: '',
            email: '',
          }}
          validationSchema={toFormikValidationSchema(schema)}
          onSubmit={(
            values: schemaType,
            { setSubmitting }: FormikHelpers<schemaType>,
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
            <label htmlFor="secondName">Second Name</label>
            <Field id="secondName" name="secondName" placeholder="Smith" />
            <label htmlFor="email">First Name</label>
            <Field id="email" name="email" placeholder="John@123.com" />
            <button type="submit">send</button>
          </Form>
        </Formik>
      </div>
    </Layout>
  )
}
