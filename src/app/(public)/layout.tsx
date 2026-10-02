import { SiteFooter } from "@/components/shared/site-footer";
import { Suspense } from "react";

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
