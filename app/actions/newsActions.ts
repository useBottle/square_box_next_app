"use server";

import { LatestNewsArticle } from "@/types/types";

let newsArticlesCache: LatestNewsArticle[] = [];

export async function setNewsArticles(articles: LatestNewsArticle[]) {
  newsArticlesCache = articles;
}

export async function getNewsArticle(id: number): Promise<LatestNewsArticle | undefined> {
  return newsArticlesCache[id];
}
