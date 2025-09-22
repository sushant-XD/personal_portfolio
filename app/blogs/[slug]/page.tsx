import { BlogPost } from "@/components/sections/BlogPost";
import { getBlogs } from "@/lib/portfolio-config";
import { notFound } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return <BlogPost blog={blog} />;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const blogs = getBlogs();
  
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}