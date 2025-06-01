import { AboutCard } from "../../_components/about-card";

// First, make sure your constants file (src/lib/tools/constants.ts) exports the array:
export const OUR_STRENGTH = [
  {
    title: "Secured Payment",
    description: "Secure, instant payments and transactions with our integrated financial solution.",
    image: "/images/about/illustration-1.svg",
  },
  {
    title: "Fast Delivery",
    description: "Secure, instant payments and transactions with our integrated financial solution.",
    image: "/images/about/illustration-2.svg",
  },
  {
    title: "Verified Vendors",
    description: "Secure, instant payments and transactions with our integrated financial solution.",
    image: "/images/about/illustration-3.svg",
  },
  {
    title: "Seamless Experience",
    description: "Secure, instant payments and transactions with our integrated financial solution.",
    image: "/images/about/illustration-4.svg",
  },
];

export const SectionTwo = () => {
  return (
    <section>
      <div className={`space-y-4 text-center`}>
        <h2 className={`text-mid-grey-II text-4xl`}>What Make Us Different</h2>
        <p className={`text-xl`}>
          Our mission is to power African commerce by creating a digital marketplace where every seller can thrive. We
          provide the tools, visibility, and infrastructure needed to make commerce better.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-13 md:grid-cols-2">
        {OUR_STRENGTH.map((strength) => (
          <AboutCard strength={strength} key={strength.title} />
        ))}
      </div>
    </section>
  );
};
