import { TopicsType } from "@/types/types";
import axios from "axios";
import TopicsInServer from "./TopicsInServer";

const fetchKeyword = async (): Promise<TopicsType[] | undefined> => {
  try {
    const response = await axios.get(process.env.TOPICS_API_URL || "");
    const keywordsData = response.data.top10;
    return keywordsData;
  } catch (error) {
    console.error("Failed fetching keyword data.", error);
  }
};

export default async function TopicsServerComponent() {
  const keywordsData: TopicsType[] | undefined = await fetchKeyword();

  return (
    <div>
      <p>server component</p>
      <TopicsInServer data={keywordsData} />
    </div>
  );
}
