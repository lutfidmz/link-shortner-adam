"use client";
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Redirect({ params }: { params: { slug: string } }) {
  const [password, setPassword] = useState("");
  const router = useRouter();
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
  return (
    <main>
      <div className="container mx-auto bg-slate-100 px-10">
        <div className="py-1 pt-6">
          <h1 className="mb-3 flex justify-center text-6xl font-bold lg:text-7xl">
            Enter The Password
          </h1>
          <p className="flex lg:justify-center lg:text-2xl md:font-semibold">
            to access this link www.shortner.com/{params.slug}
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
