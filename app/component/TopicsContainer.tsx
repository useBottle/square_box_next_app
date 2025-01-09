import { articleData, newsList, TopicsListType, TopicsType } from "@/types/types";
import axios from "axios";
import Topics from "./Topics";

const fetchKeyword = async (): Promise<TopicsType[] | undefined> => {
  try {
    const response = await axios.get(process.env.TOPICS_API_URL || "");
    const keywordsData = response.data.top10;
    return keywordsData;
  } catch (error) {
    console.error("Failed fetching keyword data.", error);
  }
};

// 모든 실시간 검색어 키워드에 해당하는 뉴스 리스트들의 각 뉴스 기사 데이터.
const articlesOfTopics: { keyword: string; articles: articleData[] }[] = [];

/**
 * fetchNewsOfTopicsList
 * 실시간 검색어를 순회하여 각 검색어에 해당하는 뉴스 리스트 요청.
 * 실시간 검색어를 순회하여 얻은 뉴스 리스트마다 중첩으로 순회하여 각 뉴스 기사 데이터 요청.
 */
const fetchNewsOfTopicsList = async (keywords: string[]) => {
  try {
    if (keywords) {
      const newsListsResults = await Promise.all(
        keywords.map(async (keyword: string) => {
          // 순회중인 키워드의 뉴스 리스트 요청.
          const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/news` || "", {
            inputValue: keyword,
            sort: "relation",
          });
          const data = {
            keyword: keyword,
            newsList: response.data.newsList,
          };

          // 뉴스 리스트를 순회하여 각 기사의 url 수집.
          const urls: string[] = [];
          response.data.newsList.forEach((item: newsList) => {
            if (item.href !== "") {
              urls.push(item.href);
            }
          });

          // 키워드에 해당하는 뉴스 리스트의 각 뉴스 기사 데이터 요청.
          const responseArticles = await axios.post(`${process.env.NEXTAUTH_URL}/api/articles` || "", { urls: urls });
          const articlesData = {
            keyword: keyword,
            articles: responseArticles.data.articlesData,
          };

          // 위의 뉴스 리스트의 각 뉴스 기사 데이터 (articles) 를 articlesOfTopics 배열에 푸쉬.
          articlesOfTopics.push(articlesData);
          return data;
        }),
      );
      // { keyword: string; newsList: newsList[] } 객체를 Promise.all 로 인한 newsListsResults 의 최종 배열에 반환.
      return newsListsResults;
    }
  } catch (error) {
    console.error("News of topics fetch failed.", error);
  }
};

export default async function TopicsContainer() {
  const keywordsData: TopicsType[] | undefined = await fetchKeyword();
  const keywords = keywordsData?.map((item) => item.keyword);

  const newsOfTopicsList: TopicsListType[] | undefined = await fetchNewsOfTopicsList(keywords as string[]);

  const data = {
    keywordsData: keywordsData,
    newsOfTopicsList: newsOfTopicsList,
    totalArticles: articlesOfTopics,
  };

  return (
    <div>
      <Topics data={data} />
    </div>
  );
}
