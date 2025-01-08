import axios from "axios";

export default async function TopicsServerComponent() {
  let keywordsData;
  try {
    const response = await axios.get("/api/topics");
    keywordsData = response.data.top10;
  } catch (error) {
    console.error("Failed fetching keyword data.", error);
  }
  return <div>TopicsServerComponent</div>;
}
