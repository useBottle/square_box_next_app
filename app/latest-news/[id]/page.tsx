import { getNewsArticle } from "@/app/actions/newsActions";
import styles from "../../../styles/LastestArticle.module.scss";

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
    <article className={styles.article}>
      {article.image && (
        <figure>
          <img src={article.image} alt={article.alt} />
          {article.alt && <figcaption>{article.alt}</figcaption>}
        </figure>
      )}
      <div className={styles.textGroup}>
        <h1>{article.title}</h1>
        <div className={styles.date}>{article.date}</div>
        {article.text.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </article>
  );
}
