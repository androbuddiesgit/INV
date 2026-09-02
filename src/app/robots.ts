import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/invoice',
        '/catalog-admin',
        '/settings',
        '/pin'
      ],
    },
    sitemap: 'https://nbfashion.biz.id/sitemap.xml',
  };
}
