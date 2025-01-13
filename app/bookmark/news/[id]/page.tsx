/**@jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";
import { dynamicNewsStyles } from "@/styles/News.styles";
import Image from "next/image";
import BookmarkBtn from "@/app/component/BookmarkBtn";
import ScrollBtn from "@/app/component/ScrollBtn";
import { findNewsBookmark, setNewsBookmark } from "@/app/actions/bookmarkNewsActions";
import { deleteNewsBookmark, getMarkedNews } from "@/app/actions/bookmarkActions";
import { setMarkedNews } from "@/store/bookmark";

export default function MarkedNewsDynamic(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data: session } = useSession();
  const clickedNews = useSelector((state: RootState) => state.bookmark.clickedNews);
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(true);

  useEffect(() => {
    (!session || !session.user || !session.user.name) && router.push("/auth/signin");

    window.scrollTo({ top: 0 });
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유저 정보가 없으면 onSubmit 이벤트 종료.
    if (!session || !session.user || session.user.name === undefined) return;

    try {
      const findBookmark = await findNewsBookmark(clickedNews.title, session.user.name as string);

      // 북마크된 데이터 있을 경우 confirm 창 띄우기. 북마크 삭제할지 확인.
      if (findBookmark && findBookmark.exists === true) {
        if (confirm("북마크를 제거하시겠습니까?")) {
          const response = await deleteNewsBookmark(clickedNews._id, session.user.name as string);
          if (response && response.delete === true) {
            setBookmarkSuccess(false);
          }
        } else {
          return;
        }
      }

      // 북마크된 데이터 없을 경우 북마크 시도
      if (findBookmark && findBookmark.exists === false) {
        // 유저와 일치하는 북마크 뉴스 데이터 모두 검색
        const markedNewsData = await getMarkedNews(session.user.name as string);

        // 북마크 수 10개 미만일 경우만 북마크 요청
        if (markedNewsData && (markedNewsData?.number as number) < 10) {
          const response = await setNewsBookmark(clickedNews, session.user.name);
          response && response.success === true && setBookmarkSuccess(true);

          // 북마크된 최신 상태로 디스패치
          const findAllNews = await getMarkedNews(session.user.name as string);
          findAllNews &&
            findAllNews.exists !== undefined &&
            findAllNews.number !== undefined &&
            dispatch(
              setMarkedNews({
                exists: findAllNews.exists,
                number: findAllNews.number,
                data: findAllNews.data,
              }),
            );
          // console.log(response);
          return;
        }

        if (markedNewsData && (markedNewsData?.number as number) === 10) {
          alert("북마크는 10개 까지만 가능합니다.");
          return;
        }
      }
    } catch (error) {
      console.error("news bookmark failed", error);
    }
  };

  return (
    <article css={css(dynamicNewsStyles)}>
      <figure className="imgGroup">
        {clickedNews.image === "" ? (
          <div className="noImg">No Image</div>
        ) : (
          <Image src={clickedNews.image} alt="newsImg" width={200} height={200} />
        )}
        <figcaption className="alt">{clickedNews.alt}</figcaption>
      </figure>
      <div className="textGroup">
        <h1>{clickedNews.title}</h1>
        <div className="date">{clickedNews.date[1] ? clickedNews.date[1] : clickedNews.date[0]}</div>
        <form onSubmit={onSubmit}>
          <BookmarkBtn success={bookmarkSuccess} isLoading={false} />
        </form>
        {clickedNews.text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
      <ScrollBtn />
    </article>
  );
}
