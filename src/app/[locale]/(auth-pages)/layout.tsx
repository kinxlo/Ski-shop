"use client";

import { Logo } from "@/components/shared/logo";
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
      <section className="flex flex-1 lg:items-center lg:justify-center">
        <div className="w-full">
          <div className={`relative h-[10rem] lg:hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <Link
              className="absolute top-4 left-4 z-10 transition-transform hover:scale-105 hover:animate-pulse"
              href={`/`}
            >
              <Image
                width={500}
                height={500}
                src={"/images/skicom.svg"}
                alt="logo"
                className="w-[70px] rounded-sm bg-white p-1"
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
          </div>
          <div className={`mx-auto max-w-md p-4 sm:max-w-lg`}>
            <div className={`hidden lg:block`}>
              <div className="bg-primary/10 mx-auto w-fit rounded-lg px-8 py-4">
                <Logo width={120} height={40} className="text-primary" />
              </div>
              {/* <Link href={`/`}>
                <Image
                  width={500}
                  height={500}
                  src={"/images/skicom.svg"}
                  alt="logo"
                  className={cn("mx-auto mb-20 w-[150px] rounded-sm bg-white p-1")}
                />
              </Link> */}
            </div>
            {children}
          </div>
          {/* Footer - Responsive positioning */}
          <p className="!text-primary p-10 text-center !text-xs md:block lg:!text-sm">
            &copy; {new Date().getFullYear()} Skicom Inc.
          </p>
        </div>
      </section>

      {/* Logo and Image Section */}
      <section className="relative hidden flex-1 md:min-h-[50vh] lg:block lg:h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        {/* <Link
          className="absolute top-4 left-4 z-10 transition-transform hover:scale-105 hover:animate-pulse"
          href={`/`}
        >
          <Image
            width={500}
            height={500}
            src={"/images/skicom-mini.svg"}
            alt="logo"
            className="w-[30px] rounded-sm bg-white p-1"
          />
        </Link> */}
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
      </section>
    </main>
  );
}
