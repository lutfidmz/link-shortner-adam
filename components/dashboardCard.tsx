import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const linkData = [
  {
    id: "1f2a3b4c-1111-2222-3333-abcdef123456",
    title: "Example Link 1",
    long_url: "https://www.example.com/long/url/1",
    short_url: "https://short.link/abc123",
    password: "securepass1",
    access: "INVITED",
    expired_at: null,
    owner_id: "a1b2c3d4-5555-6666-7777-def456789012",
  },
  {
    id: "5e6f7g8h-2222-3333-4444-567890abcdef",
    title: "Sample Link 2",
    long_url: "https://www.sample.com/long/url/2",
    short_url: "https://short.link/def456",
    password: "p@ssw0rd",
    access: "PUBLIC",
    expired_at: "2023-09-30 12:00:00",
    owner_id: "b3c4d5e6-7777-8888-9999-efghijklmnop",
  },
  {
    id: "9a8b7c6d-3333-4444-5555-fedcba098765",
    title: "Dummy Link 3",
    long_url: "https://www.dummylink.com/long/url/3",
    short_url: "https://short.link/ghi789",
    password: "",
    access: "INVITED",
    expired_at: null,
    owner_id: "c5d6e7f8-1111-2222-3333-ijklmnopqrst",
  },
  {
    id: "9a8b7c6d-3333-4444-5555-fedcba098765",
    title: "Dummy Link 3",
    long_url: "https://www.dummylink.com/long/url/3",
    short_url: "https://short.link/ghi789",
    password: "",
    access: "INVITED",
    expired_at: null,
    owner_id: "c5d6e7f8-1111-2222-3333-ijklmnopqrst",
  },
];

export default function DashboardCard() {
  return (
    <div className="mt-2 flex flex-wrap justify-center py-5 outline-1 md:outline">
      {linkData.map((data, index) => (
        <div
          key="{data.id}"
          className="my-3 flex w-full z-50 outline outline-1 md:w-1/2 md:px-2 md:outline-none"
        >
          <div className="w-3/4 bg-blue-200 py-5 pl-3 md:w-1/2 relative items-center">
            <h1 className="text-lg font-bold">{data.title}</h1>
            <p className="pb-1 text-slate-800">
              Exp: {data.expired_at || "Never"}
            </p>
            <p className="whitespace-normal">{data.short_url}</p>
          </div>
          <div className="flex w-1/4 items-center justify-center bg-pink-200 md:w-1/2">
            <div className="mr-2 hidden md:flex">
              {data.access === "PUBLIC" && (
                <Badge className="text-xs">Public</Badge>
              )}
              {data.access === "INVITED" && (
                <Badge className="text-xs">Invited</Badge>
              )}
            </div>
            <div className="mr-2 hidden md:flex">
              {data.password && (
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" sizes="50" />
                  <AvatarFallback>PW</AvatarFallback>
                </Avatar>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AiOutlineRight />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
