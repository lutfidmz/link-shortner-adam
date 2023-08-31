"use client";

import React, { useState } from "react";
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
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`/api/user`, {
        ...formData,
      });

      // Handle the response, e.g., show a success message or redirect
      console.log("API response:", response.data);
      if (response.status === 201) {
        router.push(`/login`);
      } else {
        router.push("/notfound");
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("API error:", error);
    }
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Join us on this app!</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  placeholder="Username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  onChange={handleChange}
                  name="password"
                />{" "}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Button onClick={() => handleSignUp()}>Sign Up</Button>
            </div>
            <div className="flex justify-center items-center">
              <p>Already have an account ?</p>
              <Button asChild variant="link" className="my-auto">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
