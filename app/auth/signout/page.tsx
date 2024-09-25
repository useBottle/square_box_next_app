"use client";

import { signOut } from "next-auth/react";

export default function Signout(): JSX.Element {
  return (
    <div>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
}
