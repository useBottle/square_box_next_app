import { newsList } from "@/types/types";
import axios from "axios";
import * as cheerio from "cheerio";

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
      const finalNewsData = newsData.filter((item) => item.prevImg !== "");
      const newsTop10 = finalNewsData.slice(0, 10);
      console.log(newsTop10);

      return { newsTop10: newsTop10 };
    } catch (error) {
      console.error(error);
    }
  }

  const result = await fetchData();
  console.log(result && result.newsTop10);
  return (
    <div>
      <h4>최신 뉴스 Top 10</h4>
    </div>
  );
}
