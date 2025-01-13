/**@jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BookmarkDeleteBtn from "@/app/component/BookmarkDeleteBtn";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { bookmarkNews } from "@/styles/BookmarkNews.styles";
import { setClickedNews } from "@/store/bookmark";
import { setInBookmarkDetail } from "@/store/switches";

export default function BookmarkNews() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const markedNewsData = useSelector((state: RootState) => state.bookmark.markedNews.data);

  useEffect(() => {
    (!session || !session.user || !session.user.name) && router.push("/auth/signin");
  }, []);

  const onClick = (id: string, title: string) => (e: MouseEvent) => {
    e.preventDefault();
    const clickedNews = markedNewsData.find((item) => item._id === id);
    if (clickedNews) {
      dispatch(setClickedNews(clickedNews));
    }
    dispatch(setInBookmarkDetail(true));
    router.push(`/bookmark/news/detail?title=${encodeURIComponent(title)}`);
  };

  return (
    <div css={css(bookmarkNews)}>
      <section className="newsContainer">
        <h4>
          북마크 뉴스 컨텐츠<span>{`${markedNewsData && markedNewsData.length} / 10`}</span>
        </h4>
        <div className="contents">
          {markedNewsData && markedNewsData.length !== 0 ? (
            <ul>
              {markedNewsData.map((item, index) => {
                return (
                  <div key={index}>
                    <Link
                      href={`/bookmark/detail?title=${encodeURIComponent(item.title)}`}
                      onClick={onClick(item._id, item.title)}
                    >
                      <li>
                        <Image src={item.image} alt="newsImg" width={100} height={100} />
                        <div className="textGroup">
                          <h6>{item.title}</h6>
                          <div className="date">{item.date}</div>
                          {item.text.map((item: string, index: number) => {
                            return <p key={index}>{item}</p>;
                          })}
                        </div>
                      </li>
                    </Link>
                    <BookmarkDeleteBtn data={{ category: "news", id: item._id }} />
                  </div>
                );
              })}
            </ul>
          ) : (
            <div className="emptyContents">
              <p>북마크한 뉴스가 없습니다</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
