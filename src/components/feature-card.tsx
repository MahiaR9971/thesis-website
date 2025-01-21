import Link from 'next/link'
import { BookOpen, Map, CheckSquare, LucideIcon } from 'lucide-react'

const iconMap = {
  BookOpen,
  Map,
  CheckSquare,
} as const

type IconName = keyof typeof iconMap

interface FeatureCardProps {
  name: string
  description: string
  href: string
  icon: string
}

export default function FeatureCard({ name, description, href, icon }: FeatureCardProps) {
  const Icon = iconMap[icon as IconName]

  return (
    <div className="flex flex-col items-start">
      <div className="rounded-lg bg-gray-50 p-2 ring-1 ring-gray-900/10">
        {Icon && <Icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />}
      </div>
      <dt className="mt-4 font-semibold text-gray-900">{name}</dt>
      <dd className="mt-2 leading-7 text-gray-600">{description}</dd>
      <div className="mt-4">
        <Link
          href={href}
          className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}