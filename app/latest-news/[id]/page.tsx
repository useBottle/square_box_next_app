import { getNewsArticle } from "@/app/actions/newsActions";
import styles from "../../../styles/LastestArticle.module.scss";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function LatestNewsDetail({ params }: Props) {
  const article = await getNewsArticle(parseInt(params.id));

  if (article === undefined) {
    await getNewsArticle(parseInt(params.id));
    console.log(article);
  }

  if (!article) {
    return (
      <div className={styles.infoText}>
        <p>데이터 로드가 완료되지 않았습니다</p>
        <p>홈에서 새로고침 후 다시 시도해주세요</p>
        <Link href="/">HOME</Link>
      </div>
    );
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
