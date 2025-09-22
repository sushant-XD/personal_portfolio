import { BlogPost } from "@/components/sections/BlogPost";
import { getBlogs } from "@/lib/portfolio-config";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

interface BlogPageProps {
  params: Params;
}

export default async function BlogPage(props: BlogPageProps) {
  const params = await props.params;
  const { slug } = params;
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