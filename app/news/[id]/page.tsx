/** @jsxImportSource @emotion/react */

"use client";

import { RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function NewsDynamic(): JSX.Element {
  const news = useSelector((state: RootState) => state.news);
  const params = useParams();
  const newsId = params.id;
  console.log("News ID:", newsId);

  return <div>news dynamic route</div>;
}
