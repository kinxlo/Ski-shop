/* eslint-disable unicorn/no-negated-condition */
"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { LuFacebook, LuInstagram, LuMail, LuMapPin, LuPhoneCall, LuTwitter } from "react-icons/lu";

import { GoogleMap } from "../map/google-map";

const location = {
  address: "49, Adeyemi Street, Otubu Bus Stop, Agege, Lagos.",
  lat: 6.535_77,
  lng: 3.365_96,
};

// You'll need to add your Google Maps API key to your environment variables
// Add this to your .env.local file: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export const SectionOne = () => {
  const t = useTranslations("contact.sectionOne");

  return (
    <section className="bg-high-grey-I pt-14 dark:bg-[#111111]">
      <Wrapper>
        <div className="mx-auto max-w-[1000px] space-y-4 text-center">
          <h2 className={`!text-2xl md:!text-4xl`}>{t("title")}</h2>
          <p className={`mx-auto max-w-2xl sm:!text-lg`}>{t("description")}</p>
        </div>

        <section className="bg-background gap-[66px]mx-auto mx-auto mt-[53px] space-x-4 rounded-[10px] p-4 lg:flex lg:justify-center lg:p-7 lg:px-[42px]">
          {/* contact form */}
          <div className="bg-mid-grey-III relative hidden h-[600px] w-full flex-col overflow-hidden rounded-tl-xl rounded-bl-xl p-8 text-white lg:flex">
            <h4 className="text-[28px] font-semibold !text-white">{t("contactInfo.title")}</h4>

            <div className="mt-32 space-y-9">
              <div className="flex items-center gap-5">
                <LuPhoneCall size={18} />
                <a href="tel:+2348130054558" className="text-[17px] xl:text-[20px]">
                  {t("contactInfo.phone")}
                </a>
              </div>

              <div className="flex items-center gap-5">
                <LuMail size={18} />
                <a href="mailto:skicom001@gmail.com" className="text-[17px] xl:text-[20px]">
                  {t("contactInfo.email")}
                </a>
              </div>

              <div className="flex items-center gap-5">
                <LuMapPin size={18} />
                <p className="text-[17px] xl:text-[20px]">{t("contactInfo.address")}</p>
              </div>
            </div>

            <div className="absolute bottom-7 flex flex-1 items-center gap-8">
              <div className="h-fit w-fit rounded-full border p-1.5">
                <a href="">
                  <LuTwitter size={20} />
                </a>
              </div>

              <div className="h-fit w-fit rounded-full border p-1.5">
                <a href="">
                  <LuFacebook size={20} />
                </a>
              </div>

              <div className="h-fit w-fit rounded-full border p-1.5">
                <a href="">
                  <LuInstagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <BlurImage
                src="/images/contact/bigCircle.svg"
                width={269}
                height={269}
                alt="circle"
                className="absolute right-0 bottom-[-50px]"
              />
              <BlurImage
                src="/images/contact/smallCircle.svg"
                width={138}
                height={138}
                alt="circle"
                className="absolute right-32 bottom-20"
              />
            </div>
          </div>

          <div className="mx-auto max-w-md py-10 lg:max-w-full lg:py-0">
            {/* form */}
            <form className="w-full space-y-[23px]">
              <Input
                type="text"
                className="h-14 bg-[#FFFFFF] placeholder:text-sm lg:w-[500px] lg:bg-transparent dark:bg-[#111111]"
                placeholder={t("form.fullName")}
              />
              <Input
                type="email"
                className="h-14 bg-[#FFFFFF] placeholder:text-sm lg:w-[500px] lg:bg-transparent dark:bg-[#111111]"
                placeholder={t("form.emailAddress")}
              />
              <Input
                type="text"
                className="h-14 bg-[#FFFFFF] placeholder:text-sm lg:w-[500px] lg:bg-transparent dark:bg-[#111111]"
                placeholder={t("form.subject")}
              />

              <Textarea
                className="resize-non1 h-[280px] resize-none bg-[#FFFFFF] placeholder:text-sm lg:w-[500px] lg:bg-transparent dark:bg-[#111111]"
                placeholder={t("form.message")}
              />
              <SkiButton variant="primary" className="mt-3 w-full rounded-full">
                {t("form.sendMessage")}
              </SkiButton>
            </form>
            {/* form */}
          </div>
        </section>
      </Wrapper>
      <div className="my-5 px-4 lg:mt-20 lg:px-0">
        <div className="">
          {!GOOGLE_MAPS_API_KEY ? (
            <GoogleMap location={location} apiKey={GOOGLE_MAPS_API_KEY} />
          ) : (
            <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-gray-100 lg:h-[500px]">
              <div className="text-center">
                <p className="mb-2 text-gray-500">{t("map.apiKeyNotConfigured")}</p>
                <p className="text-sm text-gray-400">{t("map.apiKeyInstructions")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
