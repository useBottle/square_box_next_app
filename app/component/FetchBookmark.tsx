"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getMarkedNews, getMarkedYoutube } from "../actions/bookmarkActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setMarkedNews, setMarkedYoutube } from "@/store/bookmark";

export default function FetchBookmark(): JSX.Element {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!session || !session.user || session.user.name === undefined) return;

    const fetchBookmarkData = async () => {
      const newsData = await getMarkedNews(session.user.name as string);
      if (newsData?.exists === true && newsData.number !== 0 && newsData.data !== undefined) {
        dispatch(setMarkedNews(newsData));
      }

      const youtubeData = await getMarkedYoutube(session.user.name as string);
      if (youtubeData?.exists === true && youtubeData.number !== 0 && youtubeData.data !== undefined) {
        dispatch(setMarkedYoutube(youtubeData));
      }
    };

    fetchBookmarkData();
  }, []);

  return <></>;
}
