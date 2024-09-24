import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Bookmark() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Please log in to access this page.</p>;
  }

  return <p>Welcom, {session.user?.name}</p>;
}
