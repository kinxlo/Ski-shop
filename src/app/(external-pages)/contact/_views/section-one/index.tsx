import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LuFacebook, LuInstagram, LuMail, LuMapPin, LuPhoneCall, LuTwitter } from "react-icons/lu";

// import { Map } from "../map/map";

// const location = {
//   address: "yemsays map",
//   lat: 6.535_77,
//   lng: 3.365_96,
// };

export const SectionOne = () => {
  return (
    <section className="bg-high-grey-I pt-14">
      <Wrapper>
        <div className="mx-auto max-w-[1000px] text-center">
          <h1 className="text-high-grey-II my-2 mb-6 text-[28px] leading-[44px] font-semibold lg:text-[44px] xl:leading-[39px]">
            Feel Free To Reach Out
          </h1>

          <p className="mx-auto max-w-[792px] text-[17px] leading-[25px] xl:text-[20px] xl:leading-[30px]">
            We&apos;re here for you! Whether you have questions about shopping, selling, deliveries, or just want to
            learn more about how Ski-Shop is shaping the future of commerce, feel free to reach out — we’re happy to
            help.
          </p>
        </div>

        <section className="mx-auto mt-[53px] gap-[66px] rounded-[10px] px-0 py-[29px] lg:flex lg:justify-center lg:bg-white lg:px-[42px]">
          {/* contact form */}
          <div className="bg-mid-grey-III relative hidden h-[600px] w-full flex-col rounded-tl-xl rounded-bl-xl p-8 text-white lg:flex">
            <h4 className="text-[28px] font-semibold text-[#ffff]">Contact Information</h4>

            <div className="mt-32 space-y-9">
              <div className="flex items-center gap-5">
                <LuPhoneCall size={18} />
                <a href="tel:+2348130054558" className="text-[17px] xl:text-[20px]">
                  +2348130054558
                </a>
              </div>

              <div className="flex items-center gap-5">
                <LuMail size={18} />
                <a href="mailto:skicom001@gmail.com" className="text-[17px] xl:text-[20px]">
                  seanlawson@skicomltd.com
                </a>
              </div>

              <div className="flex items-center gap-5">
                <LuMapPin size={18} />
                <p className="text-[17px] xl:text-[20px]">49, Adeyemi Street, Otubu Bus Stop, Agege, Lagos.</p>
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

          <div className="mt-6">
            {/* form */}
            <form className="w-full space-y-[23px]">
              <Input
                type="text"
                className="h-11 bg-[#FFFFFF] placeholder:text-sm lg:w-[500px] lg:bg-transparent"
                placeholder="Full Name"
              />
              <Input
                type="email"
                className="h-11 bg-[#FFFFFF] placeholder:text-sm lg:w-[500px] lg:bg-transparent"
                placeholder="Email Address"
              />
              <Input
                type="text"
                className="h-11 bg-[#FFFFFF] placeholder:text-sm lg:w-[500px] lg:bg-transparent"
                placeholder="Subject"
              />

              <Textarea
                className="resize-non1 h-[280px] resize-none bg-[#FFFFFF] placeholder:text-sm lg:w-[500px] lg:bg-transparent"
                placeholder="Message"
              />
              <SkiButton variant="primary" className="mt-5 w-full rounded-full lg:h-[50px] lg:w-[300px]">
                Send Message
              </SkiButton>
            </form>
            {/* form */}
          </div>
        </section>
      </Wrapper>
      <div className="leaflet-container mt-5 lg:mt-20">
        <BlurImage
          src="/images/map.svg"
          width={138}
          height={318}
          alt="map"
          className="mx-auto w-full max-w-full object-cover lg:h-[318px]"
        />
        {/* <Map location={location} /> */}
      </div>
    </section>
  );
};
