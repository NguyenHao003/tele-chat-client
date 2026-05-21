import { Link } from 'react-router-dom'

import { ROUTES } from '@/enums/routes'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-background px-4 text-center">
      <section className="max-w-sm">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Duong dan nay khong ton tai trong ung dung.
        </p>
        <Button asChild className="mt-5">
          <Link to={ROUTES.CHAT}>Back to chat</Link>
        </Button>
      </section>
    </main>
  )
}
