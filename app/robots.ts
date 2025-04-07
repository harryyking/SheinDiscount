import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.graphcraft.site';
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/main'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}