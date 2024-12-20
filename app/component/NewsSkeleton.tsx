/**@jsxImportSource @emotion/react */

"use client";

import { newsSkeleton } from "@/styles/News.styles";
import { css } from "@emotion/react";

export default function NewsSkeleton(): JSX.Element {
  return (
    <div>
      <ul css={css(newsSkeleton)}>
        <li></li>
      </ul>
    </div>
  );
}
