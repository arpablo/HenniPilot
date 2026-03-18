import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    publications: defineCollection({
      type: 'page',
      source: { include: 'publications/**', prefix: '/publications' },
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        include: 'help/**',
        prefix: '/help'
      },
      schema: z.object({
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional()
      })
    }),
    cities: defineCollection({
      type: 'page',
      source: { include: 'cities/**', prefix: '/cities' },
      schema: z.object({
        title: z.string(),
        country: z.string().optional(),
        location: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    countries: defineCollection({
      type: 'page',
      source: { include: 'countries/**', prefix: '/countries' },
      schema: z.object({
        title: z.string(),
        founded: z.string().optional(),
        capital: z.string().optional(),
        population: z.number().optional(),
        flag: z.string().optional(),
        globe: z.string().optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    essays: defineCollection({
      type: 'page',
      source: { include: 'essays/**', prefix: '/essays' },
      schema: z.object({
        title: z.string(),
        categories: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        topics: z.array(z.string()).optional(),
        sources: z.array(z.string()).optional(),
        areas: z.array(z.string()).optional()
      })
    }),
    locations: defineCollection({
      type: 'page',
      source: { include: 'locations/**', prefix: '/locations' },
      schema: z.object({
        title: z.string(),
        up: z.string().optional(),
        categories: z.array(z.string()).optional(),
        banner: z.string().optional(),
        aliases: z.array(z.string()).optional(),
        related: z.array(z.string()).optional(),
        location: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    chapters: defineCollection({
      type: 'page',
      source: { include: 'chapters/**', prefix: '/chapters' },
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        publications: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        timelines: z.array(z.string()).optional()
      })
    }),
    mocs: defineCollection({
      type: 'page',
      source: { include: 'mocs/**', prefix: '/mocs' },
      schema: z.object({
        title: z.string(),
        tags: z.array(z.string()).optional()
      })
    }),
    notes: defineCollection({
      type: 'page',
      source: { include: 'notes/**', prefix: '/notes' },
      schema: z.object({
        title: z.string(),
        categories: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    organizations: defineCollection({
      type: 'page',
      source: { include: 'organizations/**', prefix: '/organizations' },
      schema: z.object({
        title: z.string(),
        categories: z.array(z.string()).optional(),
        founded: z.string().optional(),
        areas: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    people: defineCollection({
      type: 'page',
      source: { include: 'people/**', prefix: '/people' },
      schema: z.object({
        title: z.string(),
        categories: z.array(z.string()).optional(),
        born: z.string().optional(),
        died: z.string().optional(),
        country: z.string().optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    terms: defineCollection({
      type: 'page',
      source: { include: 'terms/**', prefix: '/terms' },
      schema: z.object({
        title: z.string(),
        tags: z.array(z.string()).optional()
      })
    }),
    books: defineCollection({
      type: 'page',
      source: { include: 'books/**', prefix: '/books' },
      schema: z.object({
        title: z.string(),
        authors: z.array(z.string()).optional(),
        isbn: z.string().optional(),
        publisher: z.string().optional(),
        published: z.string().optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    events: defineCollection({
      type: 'page',
      source: { include: 'events/**', prefix: '/events' },
      schema: z.object({
        title: z.string(),
        start: z.string().optional(),
        end: z.string().optional(),
        where: z.string().optional(),
        categories: z.array(z.string()).optional(),
        participants: z.array(z.string()).optional(),
        aliases: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional()
      })
    })

  }
})
