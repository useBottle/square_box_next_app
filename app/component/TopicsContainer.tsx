import { newsList, TopicsListType, TopicsType } from "@/types/types";
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

const articlesOfTopics = [];

const fetchNewsOfTopicsList = async (keywords: string[]) => {
  try {
    if (keywords) {
      const newsListsResults = await Promise.all(
        keywords.map(async (item) => {
          // 순회중인 키워드의 뉴스 리스트 요청.
          const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/news` || "", {
            inputValue: item,
            sort: "relation",
          });
          const data = {
            keyword: item,
            newsList: response.data.newsList,
          };
          return data;
          // newsList 의 urls 로 순회하여 articles 요청하는 로직 추가하기. articlesOfTopics 에 푸시.
        }),
      );
      // console.log(newsListsResults);
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
  };

  return (
    <div>
      <Topics data={data} />
    </div>
  );
}
