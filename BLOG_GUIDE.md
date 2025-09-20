# How to Add New Blog Posts

This guide explains how to add new blog posts to your portfolio.

## Step 1: Add Blog Data

Open `/data/portfolio-config.json` and add a new blog object to the `blogs` array:

```json
{
  "id": "5",
  "title": "Your New Blog Post Title",
  "excerpt": "A brief description of your blog post that appears on the blog listing page.",
  "date": "2024-12-20",
  "readTime": "7 min read",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "slug": "your-new-blog-post-slug",
  "featured": false
}
```

### Field Explanations:
- **id**: Unique identifier (increment from the last blog)
- **title**: The blog post title
- **excerpt**: Short description shown on the blog list page
- **date**: Publication date in YYYY-MM-DD format
- **readTime**: Estimated reading time
- **tags**: Array of relevant tags/categories
- **slug**: URL-friendly version of the title (used in the URL)
- **featured**: Set to `true` for featured posts (shows "Featured" badge)

## Step 2: Add Blog Content

Open `/components/sections/BlogPost.tsx` and add your content to the `getPlaceholderContent` function:

```typescript
const content = {
  // ... existing content ...
  'your-new-blog-post-slug': `
    <p>Your blog post content goes here...</p>
    
    <h2>Section Title</h2>
    <p>More content...</p>
    
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  `,
};
```

### Supported HTML Elements:
- `<p>` - Paragraphs
- `<h2>`, `<h3>` - Section headings
- `<ul>`, `<ol>`, `<li>` - Lists
- `<strong>`, `<em>` - Text formatting
- `<code>` - Inline code
- `<pre>` - Code blocks

## Step 3: Test Your Blog Post

1. Start the development server: `npm run dev`
2. Navigate to `/blogs` to see your new post in the list
3. Click on your blog post to open it in a new tab
4. Verify the content displays correctly

## Step 4: Blog URL Structure

Your blog post will be accessible at:
```
https://yoursite.com/blogs/your-new-blog-post-slug
```

## Tips for Writing Good Blog Posts

1. **Use descriptive titles** that clearly indicate the topic
2. **Write compelling excerpts** that encourage readers to click
3. **Choose relevant tags** that help categorize your content
4. **Create URL-friendly slugs** (lowercase, hyphens instead of spaces)
5. **Structure your content** with clear headings and sections

## Example Blog Post Entry

```json
{
  "id": "5",
  "title": "Building Real-time IoT Dashboards with React and WebSocket",
  "excerpt": "Learn how to create responsive IoT dashboards that display real-time sensor data using React, WebSocket connections, and modern visualization libraries.",
  "date": "2024-12-20",
  "readTime": "12 min read",
  "tags": ["IoT", "React", "WebSocket", "Dashboard"],
  "slug": "building-realtime-iot-dashboards",
  "featured": true
}
```

## Future Enhancements

Consider these improvements for your blog system:
- Markdown support for easier content writing
- Image upload and management
- Comment system
- Social sharing buttons
- SEO meta tags
- Search functionality
- Categories and filtering