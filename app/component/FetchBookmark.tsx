"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getMarkedNews } from "../actions/bookmarkActions";

export default function FetchBookmark(): JSX.Element {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user || session.user.name === undefined) return;

    const fetchBookmark = async () => {
      const newsData = await getMarkedNews(session.user.name as string);
    };

    fetchBookmark();
  }, []);

  return <></>;
}
