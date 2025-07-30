import { ServiceCard } from "../../_components/service-card";

// First, make sure your constants file (src/lib/tools/constants.ts) exports the array:
export const OUR_SERVICE = [
  {
    title: "Vendors",
    description: "Businesses looking to expand their reach and access new customers digitally.",
    image: "/images/about/vendor.svg",
  },
  {
    title: "Buyers",
    description: "Businesses looking to expand their reach and access new customers digitally.",
    image: "/images/about/buyer.svg",
  },
  {
    title: "Delivery Partners",
    description: "Businesses looking to expand their reach and access new customers digitally.",
    image: "/images/about/partner.svg",
  },
];

export const SectionThree = () => {
  return (
    <section className={`my-30`}>
      <div className={`space-y-4 pt-6 text-center`}>
        <h2 className={`text-mid-grey-II text-4xl`}>Who We Serve</h2>
        <p className={`text-xl`}>
          Our mission is to power African commerce by creating a digital marketplace where every seller —can thrive. We
          provide the tools, visibility, and infrastructure needed to m
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center justify-between gap-4 pb-10 lg:flex-row">
        {OUR_SERVICE.map((service) => (
          <ServiceCard strength={service} key={service.title} />
        ))}
      </div>
    </section>
  );
};
