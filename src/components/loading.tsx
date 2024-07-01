import { Loader2 } from 'lucide-react'

export default function AdminLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="size-12 animate-spin" />
    </div>
  )
}
