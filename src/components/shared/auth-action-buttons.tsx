import { Button } from "../ui/button";
import { LogOutIcon, PenLine, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { getAuthUser, logoutAction } from "@/lib/actions/auth.action";

const AuthActionButtons = async () => {
  const user = await getAuthUser();
  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    // reason to use a tag: Link tag does triggure client side navigation and prevent this page from refreshing it's jsx after redirect happens from proxy.ts to /admin/dashboard
    return (
      <a href="/admin/login">
        <Button
          className="btn-primary text-white"
          size="lg"
          nativeButton={false}
          render={<span>Login</span>}
        />
      </a>
    );
  }

  return (
    <>
      <Link href="/admin/dashboard">
        <Button
          variant="outline"
          size="icon-lg"
          aria-label="Display settings"
          className="hidden rounded-xl sm:inline-flex"
          nativeButton={false}
          render={
            <span>
              <SlidersHorizontal className="size-4" />
            </span>
          }
        />
      </Link>

      <Link
        href="/admin/dashboard/new-post"
        className="btn-primary hidden rounded-xl px-5 py-2 sm:flex"
      >
        <PenLine className="size-4" />
        Write
      </Link>

      <form action={logoutAction}>
        <Button
          variant="destructive"
          size="icon-lg"
          aria-label="Logout"
          className="hidden rounded-xl xsm:inline-flex"
          type="submit"
        >
          <LogOutIcon />
        </Button>
      </form>
    </>
  );
};

export default AuthActionButtons;
