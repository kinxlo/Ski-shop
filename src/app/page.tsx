"use client";

import { TSAButton } from "@/components/core/atoms/button";
import { Navbar } from "@/components/core/molecules/navbar";
import { NAV_LINKS } from "@/lib/constants";

function Page() {
  return (
    <section>
      <Navbar links={NAV_LINKS} />
      <TSAButton variant={`primary`}>Button</TSAButton>
      <p className={`text-red-600`}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta necessitatibus eligendi id nihil sunt reiciendis
        nobis, vero, laborum pariatur blanditiis explicabo neque tempora soluta et. Deserunt quos commodi natus maiores.
      </p>
    </section>
  );
}

export default Page;
