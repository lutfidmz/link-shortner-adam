import LoginForm from "@/components/loginForm";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(options);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="flex justify-center items-center h-screen bg-slate-100">
      <div className="container mx-auto overflow-hidden p-10">
        <div className="pb-10">
          <Link href="/">
            <AiOutlineArrowLeft size={30} />
          </Link>
        </div>
        <div className="">
          <LoginForm></LoginForm>
        </div>
      </div>
    </main>
  );
}
