/**@jsxImportSource @emotion/react */

"use client";

import { useEffect } from "react";
import SearchBar from "../component/SearchBar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setPageState } from "@/store/switches";

export default function Youtube() {
  const dispatch = useDispatch<AppDispatch>();

  // 유튜브 페이지 접속 여부 체크 -> 검색 컴포넌트에서 검색 요청 토글 역할
  useEffect(() => {
    dispatch(setPageState("youtube"));
    return () => {
      dispatch(setPageState("default"));
    };
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
    </div>
  );
}
