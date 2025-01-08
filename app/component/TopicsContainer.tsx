import { TopicsType } from "@/types/types";
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

export default async function TopicsContainer() {
  const keywordsData: TopicsType[] | undefined = await fetchKeyword();

  return (
    <div>
      <Topics data={keywordsData} />
    </div>
  );
}
