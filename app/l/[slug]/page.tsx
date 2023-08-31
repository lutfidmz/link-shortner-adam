"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function Redirect({ params }: { params: { slug: string } }) {
  const [password, setPassword] = useState("");
  const [adaPassword, setAdaPassword] = useState(false); // State to track password validity
  const router = useRouter();

  const CheckPassword = async () => {
    try {
      const response = await axios.post(`/api/${params.slug}`, {
        pass: password, // Send the password as a query parameter
      });

      // Handle the response, e.g., show a success message or redirect
      console.log("API response:", response.data);
      if (response.data.password === null) {
        router.push(response.data.long_url);
      } else {
        setAdaPassword(true); // Set the state to indicate password validity
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    CheckPassword(); // Call checkPassword when the component mounts
  }, []); // Empty dependency array ensures this runs once on mount

  const handleUnlock = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/${params.slug}`, {
        pass: password, // Send the password as a query parameter
      });

      // Handle the response, e.g., show a success message or redirect
      console.log("API response:", response.data);
      if (response.status === 200) {
        router.push(response.data.long_url);
      } else {
        router.push("/notfound");
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("API error:", error);
    }
  };

  return adaPassword ? (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ) : (
    <main>
      <div className="container mx-auto bg-slate-100 px-10">
        <div className="py-1 pt-6">
          <h1 className="mb-3 flex justify-center text-6xl font-bold lg:text-7xl">
            Enter The Password
          </h1>
          <p className="flex lg:justify-center lg:text-2xl md:font-semibold">
            to access this link
          </p>
        </div>
        <div className="py-5">
          <form onSubmit={handleUnlock} className="flex-wrap justify-center">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-3 rounded-sm outline outline-1 hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 lg:py-2"
            >
              Unlock
            </button>
          </form>
        </div>
        <div className="py-1 pt-6">
          <h1 className="mb-3 flex justify-center text-sm">
            Or contact the owner of this link to gain access!
          </h1>
        </div>
      </div>
    </main>
  );
}
