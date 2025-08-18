import { getDictionary } from "@repo/internationalization";
import type { Blog, WithContext } from "@repo/seo/json-ld";
import { JsonLd } from "@repo/seo/json-ld";
import { createMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";

type BlogProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: BlogProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return createMetadata(dictionary.web.blog.meta);
};

const BlogIndex = async ({ params }: BlogProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  const jsonLd: WithContext<Blog> = {
    "@type": "Blog",
    "@context": "https://schema.org",
  };

  const mockPosts = [
    {
      _slug: "getting-started",
      _title: "Getting Started with Next Forge",
      description:
        "Learn how to build amazing applications with our starter template.",
      date: "2024-01-15",
      image: {
        url: "/placeholder.jpg",
        alt: "Getting Started",
        width: 800,
        height: 400,
      },
    },
    {
      _slug: "best-practices",
      _title: "Best Practices for Modern Web Development",
      description:
        "Discover the latest trends and techniques in web development.",
      date: "2024-01-10",
      image: {
        url: "/placeholder.jpg",
        alt: "Best Practices",
        width: 800,
        height: 400,
      },
    },
  ];

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto flex flex-col gap-14">
          <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
              {dictionary.web.blog.meta.title}
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {mockPosts.map((post, index) => (
              <Link
                href={`/blog/${post._slug}`}
                className="flex cursor-pointer flex-col gap-4 hover:opacity-75"
                key={post._slug}
              >
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Blog Image Placeholder
                  </p>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <p className="text-muted-foreground text-sm">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="max-w-3xl text-4xl tracking-tight">
                    {post._title}
                  </h3>
                  <p className="max-w-3xl text-base text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {mockPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground">
                Check back soon for updates!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
