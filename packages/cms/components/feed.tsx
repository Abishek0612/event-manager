"use client";

import { ReactNode } from "react";

interface FeedProps {
  queries: any[];
  children: (data: any[]) => Promise<ReactNode> | ReactNode;
}

export function Feed({ queries, children }: FeedProps) {
  const data = queries;

  if (typeof children === "function") {
    const result = children(data);
    if (result instanceof Promise) {
      return null;
    }
    return result;
  }

  return null;
}
