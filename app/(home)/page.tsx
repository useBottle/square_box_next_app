/** @jsxImportSource @emotion/react */

"use client";

import Link from "next/link";
import Topics from "../component/Topics";
import styles from "../../styles/LatestNews.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getLatestNewsArticle, getLatestNewsList } from "../actions/latestNewsActions";
import { setLatestArticleSet, setLatestNewsList } from "@/store/latestNews";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Home(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const latestNewsList = useSelector((state: RootState) => state.latestNews.latestNewsList);
  const latestArticleSet = useSelector((state: RootState) => state.latestNews.latestArticleSet);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLatestNewsList();
      dispatch(setLatestNewsList(result?.newsTop10List));

      const articles = await getLatestNewsArticle(result?.urls as string[]);
      dispatch(setLatestArticleSet(articles));
    };
    fetchData();
  }, []);

  return (
    <div>
      <Topics />
      <div className={styles.latestNews}>
        <h4>최신 뉴스 Top 10</h4>
        <ul>
          {latestNewsList ? (
            latestNewsList.map((item, index) => {
              return (
                <Link href={`/latest-news/${item.title}`} key={index}>
                  <li>
                    <Image src={item.prevImg} width={100} height={100} alt="newsImg" />
                    <div className={styles.textGroup}>
                      <h6>{item.title}</h6>
                      <div className={styles.date}>{item.date}</div>
                      <p>{item.summary}</p>
                    </div>
                  </li>
                </Link>
              );
            })
          ) : (
            // 데이터 로딩 실패 시 제공할 UI
            <div className={styles.infoText}>
              <p>데이터를 서버에서 불러오고 있습니다</p>
              <p>새로고침 해주세요</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
