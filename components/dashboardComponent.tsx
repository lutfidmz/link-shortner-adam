"use client";
import Cards from "@/components/dashboardCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function dashboardComponent() {
  const [longUrl, setLongUrl] = useState("");
  const router = useRouter();
  const handleShorten = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/link`, {
        title: "test",
        long_url: longUrl,
        short_url: "test",
        owner_id: "75b55177-1e52-4cf9-89a8-9de0f6589880",
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
    <div className="container mx-auto bg-slate-100 px-10">
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>
            <h1 className="mb-3 flex justify-center text-6xl font-bold lg:text-7xl">
              Link Shortner
            </h1>
          </CardTitle>
          <CardDescription>
            <p className="flex lg:justify-center lg:text-2xl md:font-semibold">
              Shorten your link !!!
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleShorten} className="flex-wrap justify-center">
            <Input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-3 rounded-sm outline outline-1 hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 lg:py-2"
            >
              Unlock
            </button>
          </form>
        </CardContent>
      </Card>
      {/* Card */}
      <Cards />
    </div>
  );
}
