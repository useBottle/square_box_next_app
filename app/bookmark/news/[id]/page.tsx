/**@jsxImportSource @emotion/react */

"use client";

import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function MarkedNewsDynamic(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data: session } = useSession();
  const params = useSearchParams();
  const newsTitle = params.get("title") as string;

  useEffect(() => {
    (!session || !session.user || !session.user.name) && router.push("/auth/signin");

    window.scrollTo({ top: 0 });
  }, []);

  return <div></div>;
}
