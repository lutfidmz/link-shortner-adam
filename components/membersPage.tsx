"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const linkData = {
  id: "1f2a3b4c-1111-2222-3333-abcdef123456",
  title: "Example Link 1",
  long_url: "https://www.example.com/long/url/1",
  short_url: "https://short.link/abc123",
  password: "securepass1",
  access: "INVITED",
  expired_at: null,
  owner_id: "a1b2c3d4-5555-6666-7777-def456789012",
};

interface formLinks {
  title: any;
  long_url: any;
  short_url: any;
  password: any;
  access: any;
  expired_at: any;
}

export default function linkDetails() {
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Change");
  const [privatemode, setPrivateMode] = useState(linkData.access === "INVITED");
  const [formLinks, setFormLinks] = useState<formLinks>({
    title: linkData.title,
    long_url: linkData.long_url,
    short_url: linkData.short_url,
    password: linkData.password,
    access: linkData.access,
    expired_at: linkData.expired_at,
  });
  const [newPassword, setNewPassword] = useState({
    password: linkData.password,
  });
  const [oldPassword, setOldPassword] = useState({ password: "" });

  const { toast } = useToast();
  const router = useRouter();

  const handleButtonClick = async () => {
    console.log("CL:62");
    try {
      await axios.post(
        "/api/link",
        // {
        //   title: "Example Link 1",
        //   long_url: "https://www.example.com/long/url/1",
        //   short_url: "https://short.link/abc123",
        //   password: "securepass1",
        //   access: "INVITED",
        //   expired_at: null,
        //   owner_id: "75b55177-1e52-4cf9-89a8-9de0f6589880",
        // }
        {
          title: "Example Link 2",
          long_url: "https://www.example.com/long/url/2",
          short_url: "https://short.link/def456",
          password: "pass123",
          access: "INVITED",
          expired_at: "2023-12-31T23:59:59Z",
          owner_id: "75b55177-1e52-4cf9-89a8-9de0f6589880",
        }
        // {
        //   title: "Example Link 3",
        //   long_url: "https://www.example.com/long/url/3",
        //   short_url: "https://short.link/ghi789",
        //   password: null,
        //   access: "PUBLIC",
        //   expired_at: "2023-09-15T12:00:00Z",
        //   owner_id: "75b55177-1e52-4cf9-89a8-9de0f6589880",
        // }
        // {
        //   title: "Example Link 4",
        //   long_url: "https://www.example.com/long/url/4",
        //   short_url: "https://short.link/jkl012",
        //   password: null,
        //   access: "PUBLIC",
        //   expired_at: null,
        //   owner_id: "75b55177-1e52-4cf9-89a8-9de0f6589880",
        // }
      );
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleSwitchChange = () => {
    setPrivateMode(!privatemode); // Toggle the switch
    if (!privatemode) {
      // If the switch is turned on (privatemode becomes true)
      setFormLinks((prevLinks) => ({
        ...prevLinks,
        access: "INVITED", // Update linkData.access to INVITED
      }));
    } else {
      // If the switch is turned off (privatemode becomes false)
      setFormLinks((prevLinks) => ({
        ...prevLinks,
        access: "PUBLIC", // Update linkData.access to PUBLIC
      }));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center py-5">
        <Link className="md:hidden" href={`/dashboard`}>
          Back
        </Link>
        <h1 className="text-lg font-bold md:text-5xl">Link</h1>
        <Button className="md:hidden" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </div>
      <Tabs defaultValue="account" className="mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Details</TabsTrigger>
          <TabsTrigger className="md:hidden" value="security">
            Security
          </TabsTrigger>
          <TabsTrigger className="hidden md:block" value="members">
            Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              {/* <CardTitle>Account</CardTitle> */}
              <CardDescription>
                Make changes to your link here. Click change to modify your link
                and confirm when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  defaultValue={linkData.title}
                  onChange={(e) =>
                    setFormLinks((prev) => {
                      return { ...prev, title: e.target.value };
                    })
                  }
                  disabled={inputsDisabled}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="long_url">Your Url</Label>
                <Input
                  id="long_url"
                  defaultValue={linkData.long_url}
                  onChange={(e) =>
                    setFormLinks((prev) => {
                      return { ...prev, long_url: e.target.value };
                    })
                  }
                  disabled={inputsDisabled}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="short_url">Short Url</Label>
                <Input
                  id="short_url"
                  defaultValue={linkData.short_url}
                  onChange={(e) =>
                    setFormLinks((prev) => {
                      return { ...prev, short_url: e.target.value };
                    })
                  }
                  disabled={inputsDisabled}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="expired_at">Expired At</Label>
                <Input
                  type="date"
                  id="expired_at"
                  defaultValue={linkData.expired_at || "Never"}
                  onChange={(e) =>
                    setFormLinks((prev) => {
                      return { ...prev, expired_at: e.target.value };
                    })
                  }
                  disabled={inputsDisabled}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="private-mode">Only Invited</Label>
                <Switch
                  id="private-mode"
                  checked={privatemode}
                  onCheckedChange={() => {
                    setPrivateMode(!privatemode);
                    handleSwitchChange();
                  }}
                  disabled={inputsDisabled}
                />
              </div>
              <div className="space-y-1 hidden md:block">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  onChange={(e) =>
                    setOldPassword((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                  disabled={!(privatemode && !inputsDisabled)}
                />
              </div>
              <div className="space-y-1 hidden md:block">
                <Label htmlFor="new">New password</Label>
                <Input
                  id="new"
                  type="password"
                  onChange={(e) =>
                    setNewPassword((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                  disabled={!(privatemode && !inputsDisabled)}
                />
              </div>
              <div className="space-y-1 hidden md:block">
                <Button className="" onClick={handleButtonClick}>
                  {buttonText}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your security password here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="private-mode">Only Invited</Label>
                <Switch
                  id="private-mode"
                  checked={privatemode}
                  onCheckedChange={() => {
                    setPrivateMode(!privatemode);
                    handleSwitchChange();
                  }}
                  disabled={inputsDisabled}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  onChange={(e) =>
                    setOldPassword((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                  disabled={!(privatemode && !inputsDisabled)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input
                  id="new"
                  type="password"
                  onChange={(e) =>
                    setNewPassword((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                  disabled={!(privatemode && !inputsDisabled)}
                />
              </div>
              <CardTitle>Members</CardTitle>
              <CardDescription>
                You can add people to join as members here
                <p></p>
                <Link href={`/links/${linkData.id}/members`}>
                  <Button>Members</Button>
                </Link>
              </CardDescription>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
              <CardDescription>
                Your link members is displayed here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <h1>asdkaskd@gmail.com</h1>
              </div>
              <div className="space-y-1">
                <h1>asdkaskd@gmail.com</h1>
              </div>
              <div className="space-y-1">
                <h1>asdkaskd@gmail.com</h1>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
