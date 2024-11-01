/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Topics(): JSX.Element {
  const [topics, setTopics] = useState();

  const fetchKeyword = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/topics");
      setTopics(response.data);
    } catch (error) {
      console.error("Failed fetching keyword data.", error);
    }
  };

  useEffect(() => {
    fetchKeyword();
  }, []);

  return (
    <form css={css(topics)}>
      <ul>
        <li></li>
      </ul>
    </form>
  );
}
