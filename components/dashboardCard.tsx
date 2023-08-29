"use client";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

interface Links {
  id: any;
  title: any;
  long_url: any;
  short_url: any;
  password: any;
  access: any;
  expired_at: any;
}

export default function DashboardCard() {
  const [linkData, setLinkData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/link`);
        const responseData = response.data;

        if (Array.isArray(responseData.data)) {
          setLinkData(responseData.data);
        } else {
          console.error("Link data is not an array:", responseData);
        }
      } catch (error) {
        console.error("Error fetching link data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>
          <div className="hidden md:flex">
            <h1 className=" text-2xl font-bold">
              Links you have shorten before:{" "}
            </h1>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {" "}
        <div className=" flex flex-wrap justify-center">
          {linkData.map((link: any) => (
            <div
              key={link.id}
              className="my-3 flex w-full z-50 outline outline-1 md:w-1/2 md:px-2 md:outline-none"
            >
              <div className="w-3/4 bg-slate-200 py-5 pl-3 md:w-1/2 relative items-center">
                <h1 className="text-lg font-bold">{link.title}</h1>
                <p className="pb-1 text-slate-800">
                  Exp: {link.expired_at ? link.expired_at.toString() : "Never"}
                </p>
                <p className="whitespace-normal">{link.short_url}</p>
              </div>
              <div className="flex w-1/4 items-center justify-center bg-slate-200 md:w-1/2">
                <div className="mr-2 hidden md:flex">
                  {link.access === "PUBLIC" && (
                    <Badge className="text-xs">Public</Badge>
                  )}
                  {link.access === "INVITED" && (
                    <Badge className="text-xs">Invited</Badge>
                  )}
                </div>
                <div className="mr-2 hidden md:flex">
                  {link.password && (
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        sizes="50"
                      />
                      <AvatarFallback>PW</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <AiOutlineRight />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href={`/links/${link.id}`}>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}{" "}
        </div>
      </CardContent>
    </Card>
  );
}
