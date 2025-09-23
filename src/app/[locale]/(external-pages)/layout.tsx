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
      <Navbar />
      <div>{children}</div>
      <Footer />
    </section>
  );
}
