/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import SearchInput from "@/components/core/miscellaneous/search-input";
import SkiButton from "@/components/shared/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FC } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { Modal } from "../../../../../components/shared/dialog/content-modal";
import { Delete } from "../modals/content/delete";
import { FilterDropdown } from "./_components/filter-dropdown";

interface TableProperties {
  variant: "default" | "plans" | "users" | "revenues" | "settings";
}

const titleMap = {
  default: "Recent Activities",
  plans: "Plans",
  users: "Users",
  revenues: "Transaction History",
  settings: `5 Admins`,
};

const headMap = {
  default: (
    <TableRow>
      <TableHead className="font-[700] text-black">Activity</TableHead>
      <TableHead className="font-[700] text-black">User ID</TableHead>
      <TableHead className="font-[700] text-black">Name</TableHead>
      <TableHead className="font-[700] text-black">Amount</TableHead>
      <TableHead className="font-[700] text-black">Date & Time</TableHead>
      <TableHead className="font-[700] text-black">Status</TableHead>
    </TableRow>
  ),
  plans: (
    <TableRow>
      <TableHead className="font-[700] text-black">Plan Name</TableHead>
      <TableHead className="font-[700] text-black">Plan Type</TableHead>
      <TableHead className="font-[700] text-black">Price</TableHead>
      <TableHead className="font-[700] text-black">Validity</TableHead>
      <TableHead className="font-[700] text-black">Date Created</TableHead>
      <TableHead className="font-[700] text-black">Actions</TableHead>
    </TableRow>
  ),
  users: (
    <TableRow>
      <TableHead className="font-[700] text-black">Username</TableHead>
      <TableHead className="font-[700] text-black">Phone Number</TableHead>
      <TableHead className="font-[700] text-black">Email Address</TableHead>
      <TableHead className="font-[700] text-black">Plan Info</TableHead>
      <TableHead className="font-[700] text-black">Status</TableHead>
    </TableRow>
  ),
  revenues: (
    <TableRow>
      <TableHead className="font-[700] text-black">Date</TableHead>
      <TableHead className="font-[700] text-black">Transaction ID</TableHead>
      <TableHead className="font-[700] text-black">Type</TableHead>
      <TableHead className="font-[700] text-black">Amount</TableHead>
      <TableHead className="font-[700] text-black">Customers</TableHead>
      <TableHead className="font-[700] text-black">Status</TableHead>
    </TableRow>
  ),
  settings: (
    <TableRow>
      <TableHead className="font-[700] text-black">Username</TableHead>
      <TableHead className="font-[700] text-black">Phone Number</TableHead>
      <TableHead className="font-[700] text-black">Date Created</TableHead>
      <TableHead className="font-[700] text-black">Actions</TableHead>
    </TableRow>
  ),
};

const dataMap = {
  default: Array.from({ length: 10 }).map((_, index) => ({
    activity: "Airtime Purchase",
    userId: `SKM457823${index}`,
    name: "Jude Bellingham",
    amount: `₦234,000`,
    dateTime: "2023-01-15 | 09:45 AM",
    status: "Active",
  })),
  plans: Array.from({ length: 10 }).map((_, index) => ({
    planName: `Plan ${index + 1}`,
    planType: "Monthly",
    price: `₦5,000`,
    validity: "30 days",
    dateCreated: "2023-01-15",
  })),
  users: Array.from({ length: 10 }).map((_, index) => ({
    username: `User${index + 1}`,
    phoneNumber: `0801234567${index}`,
    emailAddress: `user${index + 1}@example.com`,
    planInfo: "Basic Plan",
    status: "Active",
  })),
  revenues: Array.from({ length: 10 }).map((_, index) => ({
    date: `User${index + 1}`,
    transactionID: `0801234567${index}`,
    type: `user${index + 1}@example.com`,
    amount: "Basic Plan",
    customer: "Active",
    status: "Active",
  })),
  settings: Array.from({ length: 10 }).map((_, index) => ({
    username: `User${index + 1}`,
    phoneNumber: `0801234567${index}`,
    dateCreated: `2023-01-15`,
  })),
};

export const DashboardTable: FC<TableProperties> = ({ variant }) => {
  const tableTitle = titleMap[variant];
  const tableHead = headMap[variant];
  const tableData = dataMap[variant];

  const renderTableRows = tableData.map((data: any, index) => (
    <TableRow key={index}>
      {variant === "default" && (
        <>
          <TableCell>{data.activity}</TableCell>
          <TableCell>{data.userId}</TableCell>
          <TableCell>{data.name}</TableCell>
          <TableCell>{data.amount}</TableCell>
          <TableCell>{data.dateTime}</TableCell>
          <TableCell>
            <Badge className="bg-low-success text-mid-success">{data.status}</Badge>
          </TableCell>
        </>
      )}
      {variant === "plans" && (
        <>
          <TableCell>{data.planName}</TableCell>
          <TableCell>{data.planType}</TableCell>
          <TableCell>{data.price}</TableCell>
          <TableCell>{data.validity}</TableCell>
          <TableCell>{data.dateCreated}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none active:outline-none">
                <IoEllipsisHorizontalSharp />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Edit Plan</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <Modal
                      width="max-w-lg"
                      triggerStructure={<p className="text-mid-danger cursor-pointer">Delete Plan</p>}
                      title={""}
                    >
                      <Delete title={"Delete Plan"} desc={"Are you sure you want to delete plan ?"} />
                    </Modal>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </>
      )}
      {variant === "users" && (
        <>
          <TableCell>{data.username}</TableCell>
          <TableCell>{data.phoneNumber}</TableCell>
          <TableCell>{data.emailAddress}</TableCell>
          <TableCell>{data.planInfo}</TableCell>
          <TableCell>
            <Badge className="bg-low-success text-mid-success">{data.status}</Badge>
          </TableCell>
        </>
      )}
      {variant === "revenues" && (
        <>
          <TableCell>{data.date}</TableCell>
          <TableCell>{data.transactionID}</TableCell>
          <TableCell>{data.type}</TableCell>
          <TableCell>{data.amount}</TableCell>
          <TableCell>{data.customer}</TableCell>
          <TableCell>
            <Badge className="bg-low-success text-mid-success">{data.status}</Badge>
          </TableCell>
        </>
      )}
      {variant === "settings" && (
        <>
          <TableCell>{data.username}</TableCell>
          <TableCell>{data.phoneNumber}</TableCell>
          <TableCell>{data.dateCreated}</TableCell>
          <TableCell>
            <section>
              <SkiButton className="text-primary" variant="link">
                Edit
              </SkiButton>
              <SkiButton className="text-mid-danger" variant="link">
                Remove
              </SkiButton>
            </section>
          </TableCell>
        </>
      )}
    </TableRow>
  ));

  return (
    <section className="rounded-[10px] border bg-white px-[24px] py-[28px]">
      <section className="mb-[23px] flex items-center justify-between">
        <h4 className="text-mid-grey-III text-[14px] lg:text-[18px]">{tableTitle}</h4>
        {variant === `settings` ? (
          <SkiButton
            size="lg"
            isLeftIconVisible
            icon={<AiOutlinePlusCircle />}
            variant="primary"
            className="rounded-full"
          >
            New Admin
          </SkiButton>
        ) : (
          <div className="flex items-center gap-[20px]">
            {/* <SearchInput /> */}
            <FilterDropdown value={""} onValueChange={() => {}} />
          </div>
        )}
      </section>
      <Table>
        <TableHeader className="bg-high-grey-I border">{tableHead}</TableHeader>
        <TableBody>{renderTableRows}</TableBody>
      </Table>
      <section className="text-high-grey-II mt-[34px] hidden items-center justify-between lg:flex">
        <div>
          <p>10 Entries per page</p>
        </div>
        <div>
          <p>Page 1 of 1</p>
        </div>
        <div className="flex items-center gap-[8px]">
          <SkiButton
            size="lg"
            className="min-w-[137px] rounded-sm shadow-none"
            variant="outline"
            isLeftIconVisible
            icon={<LuChevronLeft />}
          >
            Previous
          </SkiButton>
          <SkiButton
            size="lg"
            className="min-w-[137px] rounded-sm shadow-none"
            variant="outline"
            isRightIconVisible
            icon={<LuChevronRight />}
          >
            Next
          </SkiButton>
        </div>
      </section>
    </section>
  );
};
