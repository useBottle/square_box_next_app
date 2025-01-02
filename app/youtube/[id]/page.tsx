/**@jsxImportSource @emotion/react */

"use client";

import { RootState } from "@/store/store";
import { css } from "@emotion/react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function YoutubeDynamic(): JSX.Element {
  const youtubeList = useSelector((state: RootState) => state.youtube.youtubeList);
  const searchParams = useSearchParams();

  const videoId = searchParams.get("id");
  const index = searchParams.get("index");
  console.log(videoId);
  console.log(index);

  return (
    <div>
      <div>youtube dynamic page</div>
    </div>
  );
}
