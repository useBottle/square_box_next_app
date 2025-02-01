/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { dynamicNewsStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ExpiredData from "@/app/component/ExpiredData";
import { deleteNewsBookmark, findNewsBookmark, setNewsBookmark } from "@/app/actions/bookmarkNewsActions";
import { getMarkedNews } from "@/app/actions/bookmarkActions";
import ScrollBtn from "@/app/component/ScrollBtn";
import { SingleNewsArticle } from "@/types/types";
import { fetchSingleArticle } from "@/app/actions/newsActions";
import { setSingleArticle } from "@/store/news";
import ArticleSkeleton from "@/app/component/ArticleSkeleton";
import BookmarkBtn from "@/app/component/BookmarkBtn";
import { setMarkedNews } from "@/store/bookmark";
import { setPageState } from "@/store/switches";

export default function NewsDynamic(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const singleArticle = useSelector((state: RootState) => state.news.article);
  const params = useSearchParams();
  const newsUrl = useSelector((state: RootState) => state.news.url);
  const newsTitle = params.get("title") as string;
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pageState = useSelector((state: RootState) => state.switches.pageState);
  const navMenu = useSelector((state: RootState) => state.switches.navMenu);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(setPageState("news"));

    // 클릭한 뉴스에 대한 article 데이터 요청
    if (singleArticle.title !== newsTitle) {
      const fetchArticle = async () => {
        const result = await fetchSingleArticle(newsUrl);
        dispatch(setSingleArticle(result));
      };
      fetchArticle();
    }

    // 유저 정보가 없으면 북마크 데이터 검색 요청하지 않음.
    if (!session || !session.user || !session.user.name) return;

    // 유저 정보 및 뉴스 데이터 DB 에서 확인 후 북마크 버튼 스타일 변경 트리거 상태 변경.
    async function findMarkedNews() {
      try {
        const findBookmark = await findNewsBookmark(newsTitle, session?.user.name as string);
        if (findBookmark && findBookmark.exists === true) {
          setBookmarkSuccess(true);
        }
      } catch (error) {
        console.error("news bookmark failed", error);
      }
      setIsLoading(false);
    }
    findMarkedNews();
  }, []);

  // 북마크 onSubmit 요청
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유저 정보가 없으면 onSubmit 이벤트 종료.
    if (!session || !session.user || session.user.name === undefined) return;

    const currentNews: SingleNewsArticle = {
      title: "",
      date: "",
      image: "",
      alt: "",
      text: [],
    };

    // * 현재 뉴스 기사 객체 생성
    if (singleArticle.title !== "") {
      currentNews.title = singleArticle.title;
      currentNews.date = singleArticle.date[1] ? singleArticle.date[1] : singleArticle.date[0];
      currentNews.image =
        singleArticle.image.endsWith(".jpg") ||
        singleArticle.image.endsWith(".jpeg") ||
        singleArticle.image.endsWith(".png") ||
        singleArticle.image.endsWith(".gif") ||
        singleArticle.image.endsWith(".svg") ||
        singleArticle.image.endsWith(".webp")
          ? singleArticle.image
          : "";
      currentNews.alt = singleArticle.alt;
      currentNews.text = singleArticle.text;
    }

    try {
      // 북마크된 데이터 있을 경우 confirm 창 띄우기. 북마크 삭제할지 확인.
      if (bookmarkSuccess) {
        if (confirm("북마크를 제거하시겠습니까?")) {
          setBookmarkSuccess(false);
          const response = await deleteNewsBookmark(currentNews, session.user.name as string);
          response && response.delete === false && setBookmarkSuccess(true);
        } else {
          return;
        }
      }

      // 북마크된 데이터 없을 경우 북마크 시도
      if (!bookmarkSuccess) {
        // 유저와 일치하는 북마크 뉴스 데이터 모두 검색
        const markedNewsData = await getMarkedNews(session.user.name as string);

        // 북마크 수 10개 미만일 경우만 북마크 요청
        if (markedNewsData && (markedNewsData?.number as number) < 10) {
          setBookmarkSuccess(true);
          const response = await setNewsBookmark(currentNews, session.user.name);
          response && response.success === false && setBookmarkSuccess(false);
          // console.log(response);
        }

        if (markedNewsData && (markedNewsData?.number as number) === 10) {
          alert("북마크는 10개 까지만 가능합니다.");
          return;
        }
      }

      // 북마크된 최신 상태로 디스패치
      const afterProcessNews = await getMarkedNews(session.user.name as string);
      afterProcessNews &&
        afterProcessNews.exists !== undefined &&
        afterProcessNews.number !== undefined &&
        dispatch(
          setMarkedNews({
            exists: afterProcessNews.exists,
            number: afterProcessNews.number,
            data: afterProcessNews.data,
          }),
        );
    } catch (error) {
      console.error("news bookmark failed", error);
      alert("북마크에 실패했습니다. 재시도해주세요.");
    }
  };

  // newsTitle 타입 불일치 또는 pageState 가 초기화된 경우 ExpiredData 렌더링
  if (typeof newsTitle !== "string" || pageState === "default") {
    return <ExpiredData />;
  }

  // singleArticle 이 업데이트 되기 전이면 Skeleton UI 렌더링
  if (singleArticle.title === "") {
    return <ArticleSkeleton />;
  }

  return (
    <article css={css(dynamicNewsStyles)}>
      {!navMenu && (
        <div className="newsDetailWrapper">
          <figure className="imgGroup">
            {singleArticle.image === "" ? (
              <div className="noImg">No Image</div>
            ) : (
              <Image src={singleArticle.image} alt="newsImg" width={200} height={200} className="newsImg" />
            )}
            <figcaption className="alt">{singleArticle.alt}</figcaption>
          </figure>
          <div className="textGroup">
            <h1>{singleArticle.title}</h1>
            <div className="container">
              <div className="date">{singleArticle.date[1] ? singleArticle.date[1] : singleArticle.date[0]}</div>
              <form onSubmit={onSubmit}>
                <BookmarkBtn success={bookmarkSuccess} isLoading={isLoading} />
              </form>
            </div>
            {singleArticle.text.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
          <ScrollBtn />
        </div>
      )}
    </article>
  );
}
