import { TopicsType } from "@/types/types";
import axios from "axios";

const fetchKeyword = async (): Promise<TopicsType[] | undefined> => {
  try {
    const response = await axios.get("/api/topics");
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
      <ul>
        {keywordsData?.map((item, index) => {
          return <div key={index}>{item.keyword}</div>;
        })}
      </ul>
    </div>
  );
}
