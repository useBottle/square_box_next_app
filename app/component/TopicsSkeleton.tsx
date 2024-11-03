/** @jsxImportSource @emotion/react */

"use client";

export default function TopicsSkeleton(): JSX.Element {
  const arry = new Array(10).fill(null);

  return (
    <ul>
      {arry.map((_, index) => {
        return <li key={index}>1</li>;
      })}
    </ul>
  );
}
