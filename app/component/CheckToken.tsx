"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CheckToken() {
  const { data: session, update } = useSession();

  // const [provider, setProvider] = useState<string>("");

  useEffect(() => {
    if (!session || !session.user || !session.expires) return;

    // session.user.provider === "google" && setProvider("google");
    // session.user.provider === "kakao" && setProvider("kakao");
    // session.user.provider === "credentials" && setProvider("credentials");

    const tokenExpires = new Date(session.expires).getTime();
    const refreshTime = tokenExpires - 5000;
    console.log("tokenExpires: ", tokenExpires);
    console.log("refreshTime: ", refreshTime);
    console.log(Date.now());

    const checkTokenExpires = async () => {
      if (Date.now() >= refreshTime) {
        console.log("Refreshing access token");
        // await signIn(provider);
        update();
      }
    };

    const intervalCheck = setInterval(checkTokenExpires, 1000);
    return () => clearInterval(intervalCheck);
  }, [session]);

  return null;
}
