import LatestNews from "../component/LatestNews";
import Topics from "../component/Topics";

export default function Home(): JSX.Element {
  return (
    <div>
      <Topics />
      <LatestNews />
    </div>
  );
}
