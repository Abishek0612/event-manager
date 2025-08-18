import { Sidebar } from "@/components/sidebar";
import { env } from "@/env";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { blog } from "@repo/cms";
import { Body } from "@repo/cms/components/body";
import { CodeBlock } from "@repo/cms/components/code-block";
import { Feed } from "@repo/cms/components/feed";
import { Image } from "@repo/cms/components/image";
import { TableOfContents } from "@repo/cms/components/toc";
import { JsonLd } from "@repo/seo/json-ld";
import { createMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const protocol = env.VERCEL_PROJECT_PRODUCTION_URL?.startsWith("https")
  ? "https"
  : "http";
const url = new URL(`${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`);

type BlogPostProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: BlogPostProperties): Promise<Metadata> => {
  const { slug } = await params;
  const post = await blog.getPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return createMetadata({
    title: post._title || "Blog Post",
    description: post.description || "Blog post description",
    image: post.image?.url,
  });
};

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const posts = await blog.getPosts();
  return posts.map(({ _slug }) => ({ slug: _slug }));
};

const BlogPost = async ({ params }: BlogPostProperties) => {
  const { slug } = await params;

  return (
    <div className="container mx-auto py-16">
      <Link
        className="mb-4 inline-flex items-center gap-1 text-muted-foreground text-sm focus:underline focus:outline-none"
        href="/blog"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Blog
      </Link>

      <div className="mt-16">
        <h1 className="scroll-m-20 text-balance font-extrabold text-4xl tracking-tight lg:text-5xl">
          Blog Post: {slug}
        </h1>
        <p className="text-balance leading-7 mt-6">
          This is a placeholder blog post. The CMS is currently disabled.
        </p>

        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
          <p>
            The blog functionality is currently disabled while we fix the CMS
            integration. This page would normally display the full blog post
            content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
