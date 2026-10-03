import { Suspense } from "react";
import { SiteFooter } from "@/components/shared/site-footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Suspense fallback={<span></span>}>
        <SiteFooter />
      </Suspense>
    </>
  );
}
