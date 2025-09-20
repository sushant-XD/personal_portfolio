'use client';

import { useRouter } from 'next/navigation';
import { getBlogs } from '@/lib/portfolio-config';
import { Blog } from '@/types/portfolio';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function Blogs() {
  const blogs = getBlogs();
  const router = useRouter();
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: false
  });
  const { containerRef, visibleItems } = useStaggeredAnimation(blogs.length, 150, false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBlogClick = (blog: Blog) => {
    // Open blog post in new tab
    window.open(`/blogs/${blog.slug}`, '_blank');
  };

  return (
    <section 
      id="blogs" 
      ref={elementRef}
      className="section-padding bg-gray-50 dark:bg-gray-800 min-h-screen"
    >
      {/* Back Navigation & Theme Toggle */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 text-black dark:text-white hover:opacity-70 transition-minimal"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="text-sm uppercase tracking-wider">Back</span>
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="container-minimal">
        <div className={`mb-20 transition-all duration-1000 ${
          isVisible ? 'scroll-visible' : 'scroll-hidden'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="pixelated-name mb-4" data-text="BLOG">
                BLOG
              </h1>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-8"></div>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
              Insights and thoughts on embedded systems, IoT, wireless communications, and emerging technology trends.
            </p>
          </div>
        </div>

        <div ref={containerRef as any} className="max-w-4xl mx-auto space-y-12">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className={`cursor-pointer transition-all duration-800 border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0 hover:opacity-70 ${
                visibleItems[index] ? 'stagger-visible' : 'stagger-item'
              }`}
              style={{ 
                transitionDelay: visibleItems[index] ? `${index * 150}ms` : '0ms'
              }}
              onClick={() => handleBlogClick(blog)}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Left side - Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    {blog.featured && (
                      <span className="inline-block px-2 py-1 bg-black text-white text-xs uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(blog.date)}
                    </time>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {blog.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-4 robotic-subtitle leading-tight">
                    {blog.title}
                  </h2>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-300 max-w-3xl">
                    {blog.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {blog.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600 pb-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side - Read more indicator */}
                <div className="flex-shrink-0 self-start md:self-center">
                  <div className="text-sm text-black dark:text-white uppercase tracking-wider opacity-70 whitespace-nowrap">
                    Read More →
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}