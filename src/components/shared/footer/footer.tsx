"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

import Apple from "~/images/Apple.png";
import facebook from "~/images/facebook.png";
import instagram from "~/images/instagram.png";
import Playstore from "~/images/Playstore.png";
import Logo from "~/images/skicom.svg";
import twitter from "~/images/twitter.png";
import { NewsLetter } from "./news-letter/news-letter";

export const Footer = () => {
  const getYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <main className="w-full bg-black py-10 md:py-14">
      <Wrapper>
        <section>
          <div>
            <NewsLetter />
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 xl:hidden">
            <a href="" className="rounded-lg border p-2 pr-3 md:flex-none">
              <div className="flex items-center gap-2">
                <Image src={Playstore} alt={"Google Play"} height={30} />
                <div className="text-white">
                  <p className="-mb-1 text-xs">GET IT ON</p>
                  <p className="mt-0 text-sm">Google Play</p>
                </div>
              </div>
            </a>

            <a href="" className="rounded-lg border p-2 md:flex-none">
              <div className="flex items-center gap-2">
                <Image src={Apple} alt={"App Store"} height={30} />
                <div className="text-white">
                  <p className="-mb-1 text-xs">Download on the</p>
                  <p className="mt-0 text-sm">App Store</p>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-10 items-center justify-between text-white xl:flex">
            <div className="flex flex-col items-center justify-center xl:block">
              <Image src={Logo} alt={"Skicom Logo"} height={50} />
              <div className="mt-5 flex items-center gap-4">
                <a href="" className="rounded-full border p-2">
                  <Image src={instagram} alt="Instagram" className="h-[25px] w-[25px] rounded-full" />
                </a>
                <a href="" className="rounded-full border p-2">
                  <Image src={facebook} alt="Facebook" className="h-[25px] w-[25px] rounded-full" />
                </a>
                <a href="" className="rounded-full border p-2">
                  <Image src={twitter} alt="Twitter" className="h-[25px] w-[25px] rounded-full" />
                </a>
              </div>
            </div>

            <div className="hidden xl:block">
              <h6 className="text-sm font-semibold !text-white uppercase">Contact</h6>
              <p className="mt-5 text-sm text-white">Plot 1, Kwara Osun Street, Lagos.</p>
              <div className="mt-2 flex items-center gap-1">
                <a href="tel:08130054558" className="text-sm text-white">
                  08130054558,
                </a>
                <a href="tel:08123456443" className="text-sm text-white">
                  08123456443
                </a>
              </div>
            </div>

            <div className="hidden xl:block">
              <h6 className="text-sm font-semibold !text-white uppercase">Quick Links</h6>
              <div className="flex items-center gap-20">
                <div className="mt-5 flex flex-col gap-2">
                  <Link href="/about" className={`text-sm ${pathname === "/about" ? "text-primary font-bold" : ""}`}>
                    About
                  </Link>
                  <Link href="/" className={`text-sm ${pathname === "/" ? "text-primary font-bold" : ""}`}>
                    Explore
                  </Link>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <Link href="/shop" className={`text-sm ${pathname === "/shop" ? "text-primary font-bold" : ""}`}>
                    Shop
                  </Link>
                  <Link
                    href="/contact"
                    className={`text-sm ${pathname === "/contact" ? "text-primary font-bold" : ""}`}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden xl:block">
              <h6 className="text-sm font-semibold !text-white uppercase">Help</h6>
              <div className="flex items-center gap-20">
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href="/live-chat"
                    className={`text-sm ${pathname === "/live-chat" ? "text-primary font-bold" : ""}`}
                  >
                    Live Chat
                  </Link>
                  <Link
                    href="/terms-condition"
                    className={`text-sm ${pathname === "/terms-condition" ? "text-primary font-bold" : ""}`}
                  >
                    Terms & Condition
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-10" />
          <p className="text-center text-[17px] text-[#71717A] lg:text-2xl">
            &copy; Copyright {getYear}. All Rights Reserved by SKICOM
          </p>
        </section>
      </Wrapper>
    </main>
  );
};
