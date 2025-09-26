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
    <main
      className={cn(
        "flex min-h-screen flex-col-reverse",
        "md:gap-4 lg:h-screen lg:flex-row",
        !switchSides && "lg:flex-row-reverse",
      )}
    >
      {/* Content Section */}
      <section className="flex flex-1 justify-center lg:items-center">
        <div className="w-full max-w-md sm:max-w-lg">
          <div className={`relative h-[10rem]`}>
            <Link
              className="absolute top-4 left-4 z-10 transition-transform hover:scale-105 hover:animate-pulse"
              href={`/`}
            >
              <Image
                width={84}
                height={84}
                src={"/images/skicom.svg"}
                alt="logo"
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-[84px] md:w-[84px]"
              />
            </Link>
            <Image
              width={742}
              height={900}
              className="absolute inset-0 h-full w-full bg-gradient-to-r from-black/70 to-black/50 object-cover object-top"
              src={
                switchSides
                  ? "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641977/skicom/qhyhxofrhhj0rnvhm75j.png"
                  : "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641981/skicom/eeh7fkzdeb9zubwirbts.png"
              }
              alt="model"
              priority
            />
          </div>
          <div className={`p-4`}>{children}</div>
        </div>
      </section>

      {/* Logo and Image Section */}
      <section className="relative hidden flex-1 md:min-h-[50vh] lg:block lg:h-screen">
        <Link
          className="absolute top-4 left-4 z-10 transition-transform hover:scale-105 hover:animate-pulse"
          href={`/`}
        >
          <Image
            width={84}
            height={84}
            src={"/images/skicom.svg"}
            alt="logo"
            className="h-16 w-16 sm:h-20 sm:w-20 md:h-[84px] md:w-[84px]"
          />
        </Link>
        <Image
          width={742}
          height={900}
          className="h-full w-full object-cover object-top"
          src={
            switchSides
              ? "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641977/skicom/qhyhxofrhhj0rnvhm75j.png"
              : "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641981/skicom/eeh7fkzdeb9zubwirbts.png"
          }
          alt="model"
          priority
        />

        {/* Footer - Responsive positioning */}
        <p className="text-primary absolute right-4 bottom-4 hidden text-sm font-semibold md:block lg:text-base">
          &copy; {new Date().getFullYear()} Skicom Inc.
        </p>
      </section>
    </main>
  );
}
