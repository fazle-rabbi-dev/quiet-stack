import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { LoginForm } from "@/components/private/admin/login-form"

export const metadata: Metadata = {
  title: "Admin login - Inkwell",
  description: "Sign in to Inkwell admin dashboard.",
}

export default function AdminLoginPage() {
  return (
    <main className="max-body flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center py-10">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      <LoginForm />
    </main>
  )
}
