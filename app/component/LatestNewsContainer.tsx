import { LatestNewsArticle, LatestNewsProps, newsList } from "@/types/types";
import { getLatestNewsArticle, getLatestNewsList } from "../actions/latestNewsActions";
import LatestNews from "./LatestNews";

const fetchData = async () => {
  const latestNewsList = await getLatestNewsList();
  const articles = await getLatestNewsArticle(latestNewsList?.urls as string[]);

  const data = {
    latestNewsList: latestNewsList?.newsTop10List as newsList[],
    latestArticles: articles as LatestNewsArticle[],
  };

  return data;
};

export default async function LatestNewsContainer() {
  const result = await fetchData();

  return (
    <div>
      <LatestNews data={result} />
    </div>
  );
}
