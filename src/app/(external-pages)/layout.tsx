import { Footer } from "@/components/shared/footer/footer";
import { Navbar } from "@/components/shared/navbar";
import React from "react";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar className={`bg-white px-4 lg:mt-7 lg:rounded-full lg:px-7`} />
      <div>{children}</div>
      <Footer />
    </section>
  );
}
