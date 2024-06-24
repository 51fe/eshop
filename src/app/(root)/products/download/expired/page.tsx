import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'

export default function Expired() {
  return (
    <Alert variant="destructive">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Download link expired</AlertTitle>
      <AlertDescription>
        <Button
          asChild
          size="lg"
        >
          <Link href="/orders">Get New Link</Link>
        </Button>
      </AlertDescription>
    </Alert>
  )
}
