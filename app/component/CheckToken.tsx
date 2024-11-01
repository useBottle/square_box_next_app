"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CheckToken() {
  const { data: session, update } = useSession();

  useEffect(() => {
    if (!session || !session.user || !session.expires) return;

    const tokenExpires = new Date(session.expires).getTime();
    const refreshTime = tokenExpires - 5 * 60 * 1000;

    const checkTokenExpires = async () => {
      if (Date.now() >= refreshTime) {
        console.log("Refreshing access token");
        update();
      }
      return;
    };

    const intervalCheck = setInterval(checkTokenExpires, 5 * 60 * 1000);
    return () => clearInterval(intervalCheck);
  }, [session, update]);

  return null;
}
