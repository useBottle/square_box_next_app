import { getLatestNewsList } from "@/app/actions/latestNewsActions";
import LatestNews from "@/app/component/LatestNews";
import Topics from "@/app/component/Topics";
import { TopicsListType, TopicsType } from "@/types/types";

const fetchKeyword = async (): Promise<TopicsType[] | undefined> => {
  try {
    const response = await fetch(process.env.TOPICS_API_URL || "", {
      method: "GET",
      next: { revalidate: 180 },
    });
    const data = await response.json();
    return data.top10;
  } catch (error) {
    console.error("Failed fetching keyword data.", error);
  }
};

// 실시간 검색어를 순회하여 각 검색어에 해당하는 뉴스 리스트 요청.
const fetchNewsOfTopicsList = async (keywords: string[]) => {
  try {
    const newsListsResults = await Promise.all(
      keywords.map(async (keyword: string) => {
        // 순회중인 키워드의 뉴스 리스트 요청.
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/news` || "", {
          method: "POST",
          cache: "force-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputValue: keyword, sort: "relation" }),
        });
        const data = await response.json();
        return {
          keyword: keyword,
          newsList: data.newsList,
        };
      }),
    );
    return newsListsResults;
  } catch (error) {
    console.error("News of topicsw fetch failed.", error);
  }
};

const fetchLatestNewsList = async () => {
  const latestNewsList = await getLatestNewsList();

  return {
    latestNewsListFromServer: latestNewsList?.newsTop10List,
  };
};

export default async function Home() {
  const keywordsData: TopicsType[] | undefined = await fetchKeyword();
  const keywords = keywordsData?.map((item) => item.keyword);
  const newsOfTopicsList: TopicsListType[] | undefined = await fetchNewsOfTopicsList(keywords as string[]);
  const latestNewsList = await fetchLatestNewsList();

  const dataOfTopics = {
    keywordsData: keywordsData ? [...keywordsData] : undefined,
    newsOfTopicsList: newsOfTopicsList ? [...newsOfTopicsList] : undefined,
  };

  return (
    <div>
      <Topics data={{ ...dataOfTopics }} />
      <LatestNews data={latestNewsList} />
    </div>
  );
}
