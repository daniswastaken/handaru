import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/contents/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.string().optional().default('en'),
    duration: z.string(),
    draft: z.boolean().optional().default(false),
    recommend: z.boolean().optional().default(false),
  }),
});

export const collections = {
  'posts': postsCollection,
};
