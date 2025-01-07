import { authOptions } from "@/util/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from "../../../styles/BookmarkYoutube.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getMarkedYoutube } from "@/app/actions/bookmarkActions";
import ScrollBtn from "@/app/component/ScrollBtn";

export default async function Bookmark() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const data = await getMarkedYoutube(session.user.name as string);
  const youtubeData = data?.exists === true ? data.data : [];

  // console.log("youtubeData: ", youtubeData);

  return (
    <div className={styles.bookmark}>
      <section className={styles.youtubeContainer}>
        <h4>북마크 유튜브 컨텐츠</h4>
        <div className={styles.contents}>
          {youtubeData && youtubeData.length !== 0 ? (
            <div>
              <ul>
                {youtubeData.map((item, index) => {
                  return (
                    <Link href={`/youtube/detail?id=${item.videoId}&index=${index}`} key={index}>
                      <li>
                        <Image src={item.thumbnail} alt={item.title} width={300} height={200} />
                        <div className={styles.textGroup}>
                          <h1 className={styles.title}>{item.title}</h1>
                          <h4 className={styles.channel}>{item.channelTitle}</h4>
                          <div className={styles.publishedAt}>{item.publishedAt}</div>
                          <p className={styles.description}>{item.description}</p>
                        </div>
                      </li>
                    </Link>
                  );
                })}
              </ul>
              <ScrollBtn />
            </div>
          ) : (
            <div className={styles.emptyContents}>
              <p>북마크한 영상이 없습니다</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
