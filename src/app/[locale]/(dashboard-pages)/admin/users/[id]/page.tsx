/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/app/Loading";
import { useUserService } from "@/services/externals/user/use-user-service";
import { useParams } from "next/navigation";

import BuyersView from "./views/buyers-view";
import RidersView from "./views/riders-view";
import VendorsView from "./views/vendors-view";

const UserDetailsPage = () => {
  const parameters = useParams();
  const id = parameters.id as string;

  const { useGetUserById } = useUserService();
  const { data, isLoading, isError } = useGetUserById(id, { staleTime: 0 });

  if (isLoading) {
    return <Loading text="Loading user..." className="w-fill h-fit p-20" />;
  }
  if (isError) {
    return <div className="p-6">Failed to load user</div>;
  }

  const profile: any = data?.data ?? {};

  switch (profile.role) {
    case "customer": {
      return <BuyersView id={id} profile={profile} />;
    }
    case "vendor": {
      return <VendorsView id={id} profile={profile} />;
    }
    case "rider": {
      return <RidersView id={id} profile={profile} />;
    }
    default: {
      return <BuyersView id={id} profile={profile} />;
    }
  }
};

export default UserDetailsPage;
