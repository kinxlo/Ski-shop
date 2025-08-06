import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiUsersThreeLight } from "react-icons/pi";

import { OverViewCard } from "../../_components/overview-card";

const Page = () => {
  return (
    <main>
      <section className="flex items-center justify-between">
        <h4 className="text-mid-grey-III text-[18px] lg:text-[30px]">Users</h4>
      </section>
      <section className="my-[38px] grid grid-cols-1 gap-[31px] lg:grid-cols-3">
        <OverViewCard
          title={"Total Users"}
          value={"500"}
          icon={<PiUsersThreeLight />}
          iconClassName="bg-primary/10 text-primary text-[24px]"
        />
        <OverViewCard
          title={"Active Users"}
          value={"250"}
          icon={<PiUsersThreeLight />}
          iconClassName="bg-low-success text-mid-success text-[24px]"
        />
        <OverViewCard
          title={"Inactive Users"}
          value={"250"}
          icon={<PiUsersThreeLight />}
          iconClassName="bg-low-danger text-mid-danger text-[24px]"
        />
      </section>
      <section>
        <Tabs defaultValue="all" className="rounded-lg bg-white p-4">
          <TabsList className="bg-white p-0">
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-high-grey-II relative h-13 rounded-none border-0 border-b-2 px-4 text-sm font-medium !shadow-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              All Users
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-mid-grey-II relative h-13 rounded-none border-0 border-b-2 px-4 text-sm font-medium !shadow-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              Active Users
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-mid-grey-II relative h-13 rounded-none border-0 border-b-2 px-4 text-sm font-medium !shadow-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              Inactive Users
            </TabsTrigger>
          </TabsList>
          <Separator className="bg-muted mt-[-1px] mb-[26px]" />
          <TabsContent value="all">{/* <AllUsers /> */}</TabsContent>
          <TabsContent value="pending">{/* <ActiveUsers /> */}</TabsContent>
          <TabsContent value="completed">{/* <InactiveUsers /> */}</TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
