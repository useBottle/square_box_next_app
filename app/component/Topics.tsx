/** @jsxImportSource @emotion/react */

"use client";

import { topicsForm } from "@/styles/Topics.styles";
import { TopicsType } from "@/types/types";
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Topics(): JSX.Element {
  const [topics, setTopics] = useState<TopicsType[] | undefined>(undefined);

  const fetchKeyword = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/topics");
      setTopics(response.data.top10);
    } catch (error) {
      console.error("Failed fetching keyword data.", error);
    }
  };

  useEffect(() => {
    const intervalFetch = setInterval(() => {
      fetchKeyword();
    }, 10000);
    console.log(topics);

    return () => clearInterval(intervalFetch);
  }, [topics]);

  return (
    <form css={css(topicsForm)}>
      <ul>
        {topics ? (
          topics.map((topic) => (
            <li key={topic.rank}>
              <span>{topic.rank}</span>
              <span>{topic.keyword}</span>
              <span>{topic.state}</span>
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </form>
  );
}
