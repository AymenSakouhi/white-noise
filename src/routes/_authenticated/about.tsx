import { createFileRoute } from '@tanstack/react-router'
import Layout from '@/components/reusable/Layout'

export const Route = createFileRoute('/_authenticated/about')({
  component: About,
})

function About() {
  return (
    <Layout>
      <div className="py-2">
        <p className="text-slate-200 px-2">
          StudyWithMe is a sleek and intuitive white noise app designed to help
          students eliminate distractions and stay focused while studying. With
          a carefully curated selection of ambient sounds—including rain, ocean
          waves, soft wind, and classic white noise—FocusFlow creates the
          perfect environment for deep concentration.
        </p>
      </div>
    </Layout>
  )
}
