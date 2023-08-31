"use client";
import Cards from "@/components/dashboardCard";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function DashboardComponent() {
  const [randomString, setRandomString] = useState(generateRandomString());

  function generateRandomString() {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  const [formData, setFormData] = useState({
    title: "",
    long_url: "",
    short_url: randomString,
  });

  const handleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const router = useRouter();
  const { data: session, status } = useSession();
  const handleShorten = async () => {
    console.log("hs61:Shorten DATA");
    try {
      const response = await axios.post(`/api/link`, {
        ...formData,
        short_url: "http://localhost:3000/l/" + formData.short_url,
        // @ts-ignore FIXME
        owner_id: session?.user?.id,
      });

      // Handle the response, e.g., show a success message or redirect
      console.log("API response:", response.data);
      if (response.status === 201) {
        router.push(`/links/${response.data.newLink.id}`);
      } else {
        router.push("/notfound");
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("API error:", error);
    }
  };

  return (
    <>
      <Button onClick={() => signOut()}>Sign out</Button>
      {/* <pre>{JSON.stringify(formData)}</pre> */}
      <div className="container mx-auto bg-slate-100 px-10">
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="mb-3 flex justify-center text-6xl font-bold lg:text-7xl">
              Link Shortner
            </CardTitle>
            <CardDescription className="flex lg:justify-center lg:text-2xl md:font-semibold">
              Shorten your link !!!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Sheet>
              <Input
                type="text"
                onChange={handleChange}
                name="long_url"
                placeholder="http://www.example.com/example"
              />
              <SheetTrigger asChild>
                <Button variant="secondary" className="w-full mt-3">
                  Shorten
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{`http://www.linkshortner.com/l/${randomString}`}</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here.{" "}
                    {"Click save when you're"}
                    done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <Input
                      type="text"
                      onChange={handleChange}
                      name="title"
                      placeholder="Example Links"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Customize Link
                    </Label>
                    <Input
                      type="text"
                      onChange={handleChange}
                      name="short_url"
                      placeholder={`linkshortner.com/l/${randomString}`}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <form onSubmit={handleShorten}>
                      <Button type="submit">Save changes</Button>
                    </form>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
        {/* Card */}
        <Cards />
      </div>
    </>
  );
}
