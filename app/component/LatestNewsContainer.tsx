import { newsList } from "@/types/types";
import { getLatestNewsList } from "../actions/latestNewsActions";
import LatestNews from "./LatestNews";

const fetchData = async () => {
  const latestNewsList = await getLatestNewsList();

  const data: { latestNewsList: newsList[] | undefined } = {
    latestNewsList: latestNewsList?.newsTop10List,
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
