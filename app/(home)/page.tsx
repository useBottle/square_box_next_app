import Topics from "../component/Topics";
import TopicsServerComponent from "../component/TopicsServerComponent";
import LatestNews from "../component/LatestNews";

export const dynamic = "force-dynamic";

export default function Home(): JSX.Element {
  return (
    <div>
      <Topics>
        <TopicsServerComponent />
      </Topics>
      <LatestNews />
    </div>
  );
}
