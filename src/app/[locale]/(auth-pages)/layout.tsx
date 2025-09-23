"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const switchSides = pathname.includes("signup");
  return (
    <main className={cn("xl: flex h-screen flex-col gap-4 xl:flex-row", !switchSides && "xl:flex-row-reverse")}>
      {/* Content Section */}
      <section className="flex flex-1 items-center justify-center p-4">{children}</section>
      {/* Logo and Image Section */}
      <section className="relative h-[15rem] flex-1 xl:h-screen">
        <Link className="absolute top-4 left-4 hover:animate-pulse" href={`/`}>
          <Image width={84} height={84} src={"/images/skicom.svg"} alt="logo" />
        </Link>
        <Image
          width={742}
          height={900}
          className="h-full w-full object-cover"
          src={
            switchSides
              ? "https://res.cloudinary.com/kingsleysolomon/image/upload/v1758641977/skicom/qhyhxofrhhj0rnvhm75j.png"
              : "https://res.cloudinary.com/kingsleysolomon/image/upload/v1758641981/skicom/eeh7fkzdeb9zubwirbts.png"
          }
          alt="model"
          priority
        />
      </section>

      {/* Footer */}
      <p className="text-primary absolute right-4 bottom-4 hidden font-semibold xl:block">
        &copy; {new Date().getFullYear()} Skicom Inc.
      </p>
    </main>
  );
}
