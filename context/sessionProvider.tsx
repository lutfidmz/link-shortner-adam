"use client";

import { SessionProvider } from "next-auth/react";

export default function sessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
