import { getNewsArticle } from "@/app/actions/newsActions";

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
      <h1>{article.title}</h1>
      <time>{article.date}</time>
      {article.image && (
        <figure>
          <img src={article.image} alt={article.alt} />
          {article.alt && <figcaption>{article.alt}</figcaption>}
        </figure>
      )}
      <div>{article.text}</div>
    </article>
  );
}
