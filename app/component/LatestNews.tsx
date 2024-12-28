import { newsList } from "@/types/types";
import axios from "axios";
import * as cheerio from "cheerio";
import Link from "next/link";
import styles from "../../styles/LatestNews.module.scss";
import { setNewsArticles } from "../actions/newsActions";

export default async function LatestNews() {
  async function fetchData() {
    const url = "https://www.yna.co.kr/news?site=navi_latest_depth01";
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const list = $("ul.list li");
      const newsData: newsList[] = [];
      list.each((_, item) => {
        const title = $(item).find(".item-box01 .news-con a .tit-news").text().trim();
        const img = $(item).find(".item-box01 .img-con a img").attr("src");
        const href = $(item).find(".item-box01 .img-con a").attr("href");
        const date = $(item).find(".item-box01 .info-box01 .txt-time").text().trim();
        const summary = $(item).find(".item-box01 .news-con .lead").text().trim();

        const news = {
          title: title,
          href: href ? href : "",
          prevImg: img ? img : "",
          date: date,
          summary: summary,
        };
        newsData.push(news);
      });
      const imgExistNewsData = newsData.filter((item) => item.prevImg !== "");
      const textExistNewsData = imgExistNewsData.filter((item) => item.summary !== "");
      const newsTop10List = textExistNewsData.slice(0, 10);
      const urls = newsTop10List.map((item) => item.href);

      const promises = urls.map(async (url) => {
        try {
          const response = await axios.get(url);
          const $ = cheerio.load(response.data);
          const title = $(".title-article01 h1.tit").text().trim();
          const date = $(".title-article01 .update-time").attr("data-published-time");
          const img = $(".image-zone .img-con .img img").attr("src");
          const alt = $(".image-zone .desc-con .tit-cap").text().trim();
          const text = $(".story-news.article p:not(.txt-copyright.adrs)")
            .map((_, item) => $(item).text().trim())
            .get()
            .filter((item) => item !== "");

          return {
            title: title,
            date: date ? date : "",
            image: img ? img : "",
            alt: alt ? alt : "",
            text: text,
          };
        } catch (error) {
          console.error(`Error fetching article: ${url}`, error);
          return null;
        }
      });

      const newsTop10Articles = await Promise.all(promises);

      // 요청이 실패하여 null 을 반환한 경우 제외.
      const filteredNewsTop10Articles = newsTop10Articles.filter((article) => article !== null);

      // 예외 처리된 최종 결과를 서버 액션을 통해 캐싱.
      await setNewsArticles(filteredNewsTop10Articles);

      return { top10List: newsTop10List, top10Articles: filteredNewsTop10Articles };
    } catch (error) {
      console.error("Error fetching latest news", error);
    }
  }

  const result = await fetchData();
  // console.log(result);
  return (
    <div className={styles.latestNews}>
      <h4>최신 뉴스 Top 10</h4>
      <ul>
        {result &&
          result.top10List.map((item, index) => {
            return (
              <Link href={`/latest-news/${index}`} key={index}>
                <li>
                  <img src={item.prevImg} width={100} height={100} alt="newsImg" />
                  <div className={styles.textGroup}>
                    <h6>{item.title}</h6>
                    <div className={styles.date}>{item.date}</div>
                    <p>{item.summary}</p>
                  </div>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}
