"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = async () => {
    try {
      const test = await signIn("credentials", {
        ...formData,
        redirect: false,
      });
      if (test?.error) {
        toast({
          title: "Login Failed",
          variant: "destructive",
          description:
            "Please make sure the data you inputted is correct or the password is wrong!",
        });
      } else {
        router.replace(`/dashboard`);
      }
    } catch (error) {
      router.replace(`/error`);
    }
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login To Your Account</CardTitle>
          <CardDescription>
            Welcome Back! Please enter your login information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
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
        <CardFooter className="flex flex-wrap">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Button onClick={() => handleSignIn()}>Sign in</Button>
            </div>
            <div className="flex justify-center items-center">
              <p>Dont have an account ?</p>
              <Button asChild variant="link" className="my-auto">
                <Link href="/register">SignUp</Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
