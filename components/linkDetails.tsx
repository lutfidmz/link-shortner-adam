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
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface FormLinks {
  id: any;
  title: any;
  long_url: any;
  short_url: any;
  password: any;
  oldpassword: any;
  newpassword: any;
  access: any;
  expired_at: any;
}
interface Links {
  id: any;
  title: any;
  long_url: any;
  short_url: any;
  password: any;
  access: any;
  expired_at: any;
}

export default function LinkDetails({ params }: { params: { id: any } }) {
  const [linkData, setLinkData] = useState<Links>({
    id: "",
    title: "",
    long_url: "",
    short_url: "",
    password: null,
    access: "",
    expired_at: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/link/${params.id}`);
        const data = response.data.getLinks;
        if (data) {
          data.expired_at = data.expired_at ? new Date(data.expired_at) : null;
          setLinkData(data);
          setFormLinks(data);
          setPrivateMode(data.access === "INVITED");
        }
      } catch (error) {
        console.error("Error fetching link data:", error);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Change");
  const [privatemode, setPrivateMode] = useState(linkData.access === "INVITED");
  const [formLinks, setFormLinks] = useState<FormLinks>({
    id: "",
    title: "",
    long_url: "",
    short_url: "",
    password: linkData.password,
    oldpassword: null,
    newpassword: null,
    access: "",
    expired_at: null,
  });

  const { toast } = useToast();

  const handleButtonClick = () => {
    if (inputsDisabled) {
      setInputsDisabled(false);
      setButtonText("Confirm");
    } else {
      console.log("FormLinks:99", formLinks);

      const updateData = async () => {
        try {
          const response = await axios.patch(`/api/link/${params.id}`, {
            ...formLinks,
          });

          if (response.status === 200) {
            toast({
              title: "Changes Saved",
              description: "Your link new data has been saved!",
            });
            setInputsDisabled(true);
            setButtonText("Change");
          }
        } catch (error) {
          toast({
            title: "Changes Failed",
            description:
              "Please make sure the data you inputted is correct or the password is wrong!",
          });
        }
      };

      if (params.id) {
        updateData();
      }
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
                {"and confirm when you're done."}
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
                  defaultValue={
                    linkData.expired_at
                      ? linkData.expired_at.toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setFormLinks((prev) => {
                      return {
                        ...prev,
                        expired_at: e.target.value
                          ? new Date(e.target.value).toISOString()
                          : null,
                      };
                    })
                  }
                  disabled={inputsDisabled}
                />
              </div>

              {/* <div className="hidden md:flex items-center justify-between space-x-2">
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
              </div> */}
              <div className="space-y-1 hidden md:block">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  onChange={(e) =>
                    setFormLinks((prev) => {
                      return { ...prev, oldpassword: e.target.value };
                    })
                  }
                  disabled={inputsDisabled}
                />
              </div>
              <div className="space-y-1 hidden md:block">
                <Label htmlFor="new" className="flex">
                  New password <p className="pl-2 text-gray-400">optional</p>
                </Label>
                <Input
                  id="new"
                  type="password"
                  onChange={(e) =>
                    setFormLinks((prev) => {
                      return { ...prev, newpassword: e.target.value };
                    })
                  }
                  disabled={inputsDisabled}
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
              {/* <div className="flex items-center justify-between space-x-2">
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
              </div> */}
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  onChange={(e) =>
                    setFormLinks((prev) => {
                      return { ...prev, oldpassword: e.target.value };
                    })
                  }
                  disabled={inputsDisabled}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input
                  id="new"
                  type="password"
                  onChange={(e) =>
                    setFormLinks((prev) => {
                      return { ...prev, newpassword: e.target.value };
                    })
                  }
                  disabled={inputsDisabled}
                />
              </div>
              {/* <CardTitle>Members</CardTitle>
              <CardDescription>
                You can add people to join as members here
                <br />
                <Link href={`/links/${linkData.id}/members`}>
                  <Button>Members</Button>
                </Link>
              </CardDescription> */}
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
