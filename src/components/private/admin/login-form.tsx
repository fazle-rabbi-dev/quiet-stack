"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Feather, Loader2, Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginAction, type LoginState } from "@/lib/actions/auth.action";
import { useAuthStore } from "@/store/useAuthStore";

const initialState: LoginState = { ok: false, error: undefined };

export function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const res = await loginAction(_prev, formData);
      if (res.ok) {
        setIsLoggedIn(true);
        router.push("/admin/dashboard");
      }
      return res;
    },
    initialState
  );

  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg dark:border-white/10">
      <CardHeader className="space-y-4 text-center">
        <div className="primary-gradient mx-auto flex-center size-12 justify-center rounded-2xl">
          <Feather className="size-6 text-white" />
        </div>
        <div className="space-y-1.5">
          <CardTitle className="heading-3 text-center">Admin login</CardTitle>
          <CardDescription className="text-center text-sm">
            Sign in to manage content
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                name="username"
                autoComplete="username"
                placeholder="admin username"
                required
                aria-invalid={!!state.error}
                className="h-10 pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                required
                aria-invalid={!!state.error}
                className="h-10 pr-10 pl-10"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                {show ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {state.error && (
            <Alert variant="destructive" className="animate-in fade-in">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="btn-primary h-10 w-full rounded-xl text-white"
          >
            {pending && <Loader2 className="size-4 animate-spin" />}
            {pending ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
