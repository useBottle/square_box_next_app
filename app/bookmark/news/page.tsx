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
import { setPageState } from "@/store/switches";
import ExpiredData from "@/app/component/ExpiredData";

export default function BookmarkNews() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const markedNewsData = useSelector((state: RootState) => state.bookmark.markedNews.data);
  const pageState = useSelector((state: RootState) => state.switches.pageState);
  const navMenu = useSelector((state: RootState) => state.switches.navMenu);

  useEffect(() => {
    (!session || !session.user || !session.user.name) && router.push("/auth/signin");
    dispatch(setPageState("bookmark"));
  }, []);

  const onClick = (id: string, title: string) => (e: MouseEvent) => {
    e.preventDefault();
    const clickedNews = markedNewsData.find((item) => item._id === id);
    if (clickedNews) {
      dispatch(setClickedNews(clickedNews));
    }
    router.push(`/bookmark/news/detail?title=${encodeURIComponent(title)}`);
  };

  // pageState 가 초기화된 경우 ExpiredData 렌더링
  if (pageState === "default") {
    return <ExpiredData />;
  }

  return (
    <div css={css(bookmarkNews)}>
      {!navMenu && (
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
                        className={`${/Mobi/i.test(navigator.userAgent) ? `${"newsLink"} ${"noHover"}` : "newsLink"}`}
                      >
                        <li>
                          <Image src={item.image} alt="newsImg" width={100} height={100} />
                          <div className="textGroup">
                            <h6>{item.title}</h6>
                            <div className="date">{item.date}</div>
                            <div className="container">
                              <p>{item.text[0]}</p>
                              <BookmarkDeleteBtn data={{ category: "news", id: item._id }} />
                            </div>
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
      )}
    </div>
  );
}
