/** @jsxImportSource @emotion/react */

"use client";

import { topicsForm } from "@/styles/Topics.styles";
import { TopicsType } from "@/types/types";
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from "react-icons/fa6";

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
    fetchKeyword();
    const intervalFetch = setInterval(() => {
      fetchKeyword();
    }, 10000);

    return () => clearInterval(intervalFetch);
  }, []);

  return (
    <form css={css(topicsForm)}>
      <ul>
        {topics ? (
          topics.map((topic) => (
            <li key={topic.rank}>
              <span className="rank">{topic.rank}</span>
              <span className="keyword">{topic.keyword}</span>
              <span className="state">
                {(() => {
                  if (topic.state === "n") {
                    return <FaPlus className="new" />;
                  } else if (topic.state === "s") {
                    return <FaMinus className="stay" />;
                  } else if (topic.state === "+") {
                    return <FaCaretUp className="up" />;
                  } else if (topic.state === "-") {
                    return <FaCaretDown className="down" />;
                  }
                })()}
              </span>
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </form>
  );
}
