/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { dynamicNewsStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { GoBookmarkFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ExpiredData from "@/app/component/ExpiredData";
import { deleteNewsBookmark, findNewsBookmark, setNewsBookmark } from "@/app/actions/bookmarkNewsActions";
import { getMarkedNews } from "@/app/actions/bookmarkActions";
import ScrollBtn from "@/app/component/ScrollBtn";
import { LatestNewsArticle } from "@/types/types";
import { fetchSingleArticle } from "@/app/actions/newsActions";
import { setSingleArticle } from "@/store/news";
import ArticleSkeleton from "@/app/component/ArticleSkeleton";
import BookmarkBtn from "@/app/component/BookmarkBtn";

export default function NewsDynamic(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const singleArticle = useSelector((state: RootState) => state.news.article);
  const params = useSearchParams();
  const newsUrl = useSelector((state: RootState) => state.news.url);
  const newsTitle = params.get("title") as string;
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    // 클릭한 뉴스에 대한 article 데이터 요청
    if (singleArticle.title !== newsTitle) {
      const fetchArticle = async () => {
        const result = await fetchSingleArticle(newsUrl);
        dispatch(setSingleArticle(result));
      };
      fetchArticle();
    }

    // 유저 정보가 없으면 북마크 데이터 검색 요청하지 않음.
    if (!session || !session.user || session.user.name === undefined) return;

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

    const currentNews: LatestNewsArticle = {
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
      currentNews.image = !(
        singleArticle.image.endsWith(".jpg") ||
        singleArticle.image.endsWith(".jpeg") ||
        singleArticle.image.endsWith(".png") ||
        singleArticle.image.endsWith(".gif") ||
        singleArticle.image.endsWith(".svg") ||
        singleArticle.image.endsWith(".webp")
      )
        ? singleArticle.image
        : "";
      currentNews.alt = singleArticle.alt;
      currentNews.text = singleArticle.text;
    }

    const titleToUse = singleArticle.title !== "" ? singleArticle.title : currentNews?.title || "defaultTitle";

    try {
      const findBookmark = await findNewsBookmark(titleToUse, session.user.name);

      // 북마크된 데이터 있을 경우 confirm 창 띄우기. 북마크 삭제할지 확인.
      if (findBookmark && findBookmark.exists === true) {
        if (confirm("북마크를 제거하시겠습니까?")) {
          const response = await deleteNewsBookmark(currentNews, session.user.name as string);
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
          const response = await setNewsBookmark(currentNews, session.user.name);
          response && response.success === true && setBookmarkSuccess(true);
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
      alert("북마크에 실패했습니다. 재시도해주세요.");
    }
  };

  // newsTitle 타입 불일치인 경우 ExpiredData 렌더링
  if (typeof newsTitle !== "string") {
    return <ExpiredData />;
  }

  // singleArticle 이 업데이트 되기 전이면 Skeleton UI 렌더링
  if (singleArticle.title === "") {
    return <ArticleSkeleton />;
  }

  return (
    <article css={css(dynamicNewsStyles)}>
      <figure className="imgGroup">
        {singleArticle.image === "" ? (
          <div className="noImg">No Image</div>
        ) : (
          <Image src={singleArticle.image} alt="newsImg" width={200} height={200} />
        )}
        <figcaption className="alt">{singleArticle.alt}</figcaption>
      </figure>
      <div className="textGroup">
        <h1>{singleArticle.title}</h1>
        <div className="date">{singleArticle.date[1] ? singleArticle.date[1] : singleArticle.date[0]}</div>
        {session ? (
          <form onSubmit={onSubmit}>{<BookmarkBtn success={bookmarkSuccess} isLoading={isLoading} />}</form>
        ) : (
          <Link href="/auth/signin">
            <button>
              <span>북마크하려면 로그인 해야합니다</span>
            </button>
          </Link>
        )}
        {singleArticle.text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
      <ScrollBtn />
    </article>
  );
}
