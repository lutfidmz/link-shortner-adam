import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { LoginButton, LogoutButton } from "./auth";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <main>
      <div>Welcome</div>
      <LoginButton />
      <LogoutButton />
      <pre>{JSON.stringify(session)}</pre>
    </main>
  );
}
