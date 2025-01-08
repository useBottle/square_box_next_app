import LatestNews from "../component/LatestNews";
import TopicsContainer from "../component/TopicsContainer";

export const dynamic = "force-dynamic";

export default function Home(): JSX.Element {
  return (
    <div>
      <TopicsContainer />
      <LatestNews />
    </div>
  );
}
