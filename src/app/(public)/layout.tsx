import { SiteFooter } from "@/components/shared/site-footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  );
}
