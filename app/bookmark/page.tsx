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
      <h4>북마크한 뉴스 컨텐츠</h4>
      <h4>북마크한 유튜브 컨텐츠</h4>
    </div>
  );
}
