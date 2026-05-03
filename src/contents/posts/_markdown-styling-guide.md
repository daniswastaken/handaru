This post serves as a kitchen sink for all the Markdown features supported by this blog's theme. We'll explore typography, code blocks, and structural elements.

## Typography and Basics

You can use **bold text** to emphasize points or *italics* for a softer touch. If you're feeling adventurous, you can even ~~strike through~~ things that are no longer relevant.

### Lists

Lists are essential for organizing thoughts:
- **UnoCSS** for styling
- **Astro** for the engine
- **Vue** for the interactivity

Numbered lists also work great:
1. Initialize the project
2. Define the schema
3. Write the content

## Code Demonstration

One of the most important features is the syntax highlighting. Since we're using **Shiki**, code blocks look premium and are easy to read.

### Inline Code
You can highlight technical terms like `const { post } = Astro.props` or `npm run dev` inline within a paragraph.

### Code Blocks
Here is a sample of our `config.ts` setup:

```typescript
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/contents/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    recommend: z.boolean().optional().default(false),
  }),
});
```

And some CSS for the minimalist aesthetic:

```css
.prose {
  max-width: 65ch;
  line-height: 1.6;
  font-family: var(--font-sans);
}

code {
  font-family: var(--font-mono);
  background: rgba(128, 128, 128, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 3px;
}
```

## Structural Elements

> "Design is not just what it looks like and feels like. Design is how it works."
> — Steve Jobs

### Tables

| Feature | Support |
| :--- | :--- |
| Markdown | Full |
| Syntax Highlighting | Shiki |
| Live Refresh | Official |

---

That's it! This guide covers the majority of what you'll need for writing clean, beautiful technical blog posts.
