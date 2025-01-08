import axios from "axios";

const fetchKeyword = async (): Promise<void> => {
  try {
    const response = await axios.get("/api/topics");
    const keywordsData = response.data.top10;
    return keywordsData;
  } catch (error) {
    console.error("Failed fetching keyword data.", error);
  }
};

export default async function TopicsServerComponent() {
  console.log("hi");
  // const keywordsData = await fetchKeyword();

  return <div>TopicsServerComponent</div>;
}
