import Layout from '@/components/reusable/Layout'
import { createFileRoute } from '@tanstack/react-router'
import { Field, Form, Formik, FormikHelpers } from 'formik'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

type Values = {
  firstName: string
  secondName: string
  email: string
}

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
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>,
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
