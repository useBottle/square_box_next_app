/**@jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ScrollBtn from "@/app/component/ScrollBtn";
import BookmarkDeleteBtn from "@/app/component/BookmarkDeleteBtn";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { bookmarkYoutube } from "@/styles/BookmarkYoutube.styles";

export default function Bookmark() {
  const { data: session } = useSession();
  const markedYoutubeData = useSelector((state: RootState) => state.bookmark.markedYoutube.data);

  useEffect(() => {
    !session || !session.user || (session.user.name === undefined && redirect("/auth/signin"));
    console.log("markedYoutubeData: ", markedYoutubeData);
  }, []);

  return (
    <div css={css(bookmarkYoutube)}>
      <section className="youtubeContainer">
        <h4>
          북마크 유튜브 컨텐츠<span>{`${markedYoutubeData && markedYoutubeData.length} / 10`}</span>
        </h4>
        <div className="contents">
          {markedYoutubeData && markedYoutubeData.length !== 0 ? (
            <div>
              <ul>
                {markedYoutubeData.map((item, index) => {
                  return (
                    <div key={index}>
                      <Link href={`/youtube/detail?id=${item.videoId}&index=${index}`}>
                        <li>
                          <Image src={item.thumbnail} alt={item.title} width={300} height={200} />
                          <div className="textGroup">
                            <h1 className="title">{item.title}</h1>
                            <h4 className="channel">{item.channelTitle}</h4>
                            <div className="publishedAt">{item.publishedAt}</div>
                            <p className="description">{item.description}</p>
                          </div>
                        </li>
                      </Link>
                      <BookmarkDeleteBtn data={{ category: "youtube", id: item._id }} />
                    </div>
                  );
                })}
              </ul>
              <ScrollBtn />
            </div>
          ) : (
            <div className="emptyContents">
              <p>북마크한 영상이 없습니다</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
