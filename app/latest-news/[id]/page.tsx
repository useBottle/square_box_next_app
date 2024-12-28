import { getNewsArticle } from "@/app/actions/newsActions";
import styles from "../../../styles/LastestArticle.module.scss";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default async function LatestNewsDetail({ params }: Props) {
  const article = await getNewsArticle(parseInt(params.id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <article>
      {article.image && (
        <figure>
          <Image
            src={article.image}
            alt={article.alt || "news image"}
            width={100}
            height={100}
            priority
            style={{ objectFit: "contain" }}
          />
          {article.alt && <figcaption>{article.alt}</figcaption>}
        </figure>
      )}
      <div className={styles.textGroup}>
        <h1>{article.title}</h1>
        <time>{article.date}</time>
        <div>{article.text}</div>
      </div>
    </article>
  );
}
