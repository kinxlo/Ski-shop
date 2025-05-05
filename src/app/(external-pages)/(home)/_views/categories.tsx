import { Wrapper } from "@/components/core/layout/wrapper";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProperties {
  title: string;
  image: string;
  href: string;
}

const CategoryItem = ({ title, image, href }: CategoryItemProperties) => {
  return (
    <Link href={href} className="group relative aspect-[3/4] overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-medium text-white">{title}</span>
      </div>
    </Link>
  );
};

export const Categories = () => {
  const categories = [
    {
      title: "Phones",
      image: "/images/shop/hero.svg",
      href: "/categories",
    },
    {
      title: "Accessories",
      image: "/images/shop/hero.svg",
      href: "/categories",
    },
    {
      title: "Laptops",
      image: "/images/shop/hero.svg",
      href: "/categories",
    },
    {
      title: "Tablets",
      image: "/images/shop/hero.svg",
      href: "/categories",
    },
    {
      title: "Audio",
      image: "/images/shop/hero.svg",
      href: "/categories",
    },
  ];

  return (
    <Wrapper className="py-16">
      <h2 className="mb-8 text-center text-3xl font-semibold">Categories</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryItem key={category.title} title={category.title} image={category.image} href={category.href} />
        ))}
      </div>
    </Wrapper>
  );
};
