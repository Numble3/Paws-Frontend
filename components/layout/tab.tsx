import Link from "next/link";

export default function Tab() {
  return (
    <ul>
      <li>
        <Link href="/">홈</Link>
      </li>
      <li>
        <Link href="/myVideo">마이 비디오</Link>
      </li>

      <li>
        <Link href="/interestVideo">관심영상</Link>
      </li>

      <li>
        <Link href="/profile">프로필</Link>
      </li>
    </ul>
  );
}
