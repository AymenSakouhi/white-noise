import { createFileRoute } from '@tanstack/react-router'
import { Field, Formik, FormikHelpers } from 'formik'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

type Values = {
  firstName: string
}

function Contact() {
  return (
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
            alert(values)
            setSubmitting(false)
          }, 1000)
        }}
      >
        <form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />
          <button type="submit">send</button>
        </form>
      </Formik>
    </div>
  )
}
