import { authOptions } from "@/util/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from "../../../styles/BookmarkNews.module.scss";
import { getMarkedNews } from "../../actions/bookmarkActions";
import Link from "next/link";
import Image from "next/image";
import BookmarkDeleteBtn from "@/app/component/BookmarkDeleteBtn";

export default async function BookmarkNews() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const data = await getMarkedNews(session.user.name as string);
  const newsData = data?.exists === true ? data.data : [];

  // console.log("newsData: ", newsData);

  return (
    <div className={styles.bookmark}>
      <section className={styles.newsContainer}>
        <h4>
          북마크 뉴스 컨텐츠<span>{newsData && newsData.length}</span>
        </h4>
        <div className={styles.contents}>
          {newsData && newsData.length !== 0 ? (
            <ul>
              {newsData.map((item, index) => {
                return (
                  <div key={index}>
                    <Link href={`/bookmark/detail?title=${encodeURIComponent(item.title)}`}>
                      <li>
                        <Image src={item.image} alt="newsImg" width={100} height={100} />
                        <div className={styles.textGroup}>
                          <h6>{item.title}</h6>
                          <div className={styles.date}>{item.date}</div>
                          {item.text.map((item: string, index: number) => {
                            return <p key={index}>{item}</p>;
                          })}
                        </div>
                      </li>
                    </Link>
                    <BookmarkDeleteBtn data={{ category: "news", id: item._id }} />
                  </div>
                );
              })}
            </ul>
          ) : (
            <div className={styles.emptyContents}>
              <p>북마크한 뉴스가 없습니다</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
