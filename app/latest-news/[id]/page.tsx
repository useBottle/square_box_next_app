import { getNewsArticle } from "@/app/actions/newsActions";
import styles from "../../../styles/LastestArticle.module.scss";
import Link from "next/link";
import { getLatestArticle } from "@/app/actions/latestNewsActions";
import { GoBookmarkFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import ExpiredData from "@/app/component/ExpiredData";

interface Props {
  params: {
    id: string;
  };
}

export default async function LatestNewsDetail({ params }: Props) {
  const article = await getNewsArticle(parseInt(params.id));
  console.log("cached article: ", article);
  let result;

  if (article === undefined) {
    result = await getLatestArticle(parseInt(params.id));
    console.log("single article request result: ", result);

    if (result) {
      return (
        <article className={styles.article}>
          {result.image && (
            <figure>
              <img src={result.image} alt={result.alt} />
              <figcaption>{result.alt}</figcaption>
            </figure>
          )}
          <div className={styles.textGroup}>
            <h1>{result.title}</h1>
            <div className={styles.date}>{result.date}</div>
            {result.text.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </article>
      );
    } else if (article === undefined && result === undefined) {
      return <ExpiredData />;
    }
  }
}
