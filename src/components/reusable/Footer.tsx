import { CopyrightIcon } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-slate-100 flex flex-row items-center justify-center">
      <p>
        Made by AsyncStack and the chat.
        <CopyrightIcon width={10} className="inline-block" />
        2025
      </p>
    </footer>
  )
}

export default Footer
