import LatestNewsContainer from "../component/LatestNewsContainer";
import TopicsContainer from "../component/TopicsContainer";

export const dynamic = "force-dynamic";

export default function Home(): JSX.Element {
  return (
    <div>
      <TopicsContainer />
      <LatestNewsContainer />
    </div>
  );
}
