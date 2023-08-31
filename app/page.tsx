import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="flex items-center justify-center h-screen bg-slate-100">
      <div className="container mx-auto overflow-hidden px-10">
        <div className="flex flex-wrap items-center justify-center  text-center">
          <h1 className="text-6xl font-bold w-full pb-4 text-left">
            Link Shortener App
          </h1>
          <Button asChild className="w-full py-4 my-2">
            <Link href="/register">Sign Up</Link>
          </Button>
          <Button asChild variant="outline" className="w-full py-4 my-2">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
        {/* <pre>{JSON.stringify(session?.user?.id)}</pre> */}
      </div>
    </main>
  );
}
