import Layout from '@/components/reusable/Layout'
import { createFileRoute } from '@tanstack/react-router'
import { Field, Form, Formik, FormikHelpers } from 'formik'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

type Values = {
  firstName: string
}

function Contact() {
  return (
    <Layout>
      <div className="p-2">
        <Formik
          initialValues={{
            firstName: '',
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>,
          ) => {
            setTimeout(() => {
              alert(values.firstName)
              setSubmitting(false)
            }, 1000)
          }}
        >
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="John" />
            <button type="submit">send</button>
          </Form>
        </Formik>
      </div>
    </Layout>
  )
}
