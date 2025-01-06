import { authOptions } from "@/util/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from "../../styles/Bookmark.module.scss";

export default async function Bookmark() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className={styles.bookmark}>
      <section className={styles.newsContainer}>
        <h4>북마크 뉴스 컨텐츠</h4>
        <div className={styles.contents}>
          <div className={styles.emptyContents}>
            <p>북마크한 뉴스가 없습니다</p>
          </div>
        </div>
      </section>
      <section className={styles.youtubeContainer}>
        <h4>북마크 유튜브 컨텐츠</h4>
        <div className={styles.contents}>
          <div className={styles.emptyContents}>
            <p>북마크한 영상이 없습니다</p>
          </div>
        </div>
      </section>
    </div>
  );
}
