import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://easesign.site';
  const langs = ['en', 'id'];
  const routes = ['', 'about', 'contact-us', 'privacy-policy', 'sign-pdf'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  langs.forEach((lang) => {
    routes.forEach((route) => {
      const path = route === '' ? `/${lang}/` : `/${lang}/${route}/`;
      sitemapEntries.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : (route === 'sign-pdf' ? 0.9 : 0.7),
      });
    });
  });

  return sitemapEntries;
}
