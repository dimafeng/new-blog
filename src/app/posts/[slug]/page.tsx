import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { Intro } from "@/app/_components/intro";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div className="min-h-screen">

      <Intro />

      {/* Main Content */}
      <main className=" px-4 md:px-6 py-12">

        {/* Date */}
        <div className="text-center mb-8">
          <time className="text-sm tracking-widest uppercase">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.date))}</time>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-serif text-center leading-tight mb-16">
          <span className="inline-block border-b border-gray-200 pb-16 mb-2">{post.title}</span>
        </h1>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <PostBody content={content} />
        </article>
      </main>
    </div>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      //    images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
