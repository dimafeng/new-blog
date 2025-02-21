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

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      <header className="flex items-center justify-between p-4 md:p-6">
        <div className="mx-auto">
          <div className="h-12 w-12 rounded-full border-2 border-black flex items-center justify-center">
            <span className="text-xl font-serif">V</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        {/* Date */}
        <div className="text-center mb-8">
          <time className="text-sm tracking-widest uppercase">{post.date}</time>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-serif text-center leading-tight mb-16">
          <span className="inline-block border-b border-gray-200 pb-1 mb-2">{post.title}</span>
        </h1>

        {/* Social Share */}
        <div className="flex justify-center gap-4 mb-16">
          <button className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
            D
          </button>
          <button className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-sm">
            ⋮
          </button>
        </div>

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
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
