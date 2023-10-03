import getForamatted from "@/app/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/app/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as React from "react";

export interface IPostProps {
  params: { postId: string };
}

export function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => {
    postId: post.id;
  });
}

export function generateMetadata({ params: { postId } }: IPostProps) {
  const posts = getSortedPostsData();

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
  };
}

export default async function Post({ params: { postId } }: IPostProps) {
  const posts = getSortedPostsData();
  if (!posts.find((post) => post.id === postId)) return notFound();

  const { title, date, contentHtml } = await getPostData(postId);

  const pubDate = getForamatted(date);

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto dark:text-white/90">
      <h1 className="text-3xl mt-10 mb-0 font-bold dark:text-white/90">
        {title}
      </h1>
      <p className="mt-0 dark:text-white/90">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <Link href="/">← Back to home</Link>
        </p>
      </article>
    </main>
  );
}
