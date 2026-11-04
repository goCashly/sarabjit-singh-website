import type { MetadataRoute } from 'next';
import { brand } from '@/lib/brand';
import { posts } from '@/lib/posts';
import { mortgageServices } from '@/lib/mortgageServices';
import { serviceAreas } from '@/lib/serviceAreas';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/lifestyle',
    '/my-journey',
    '/partner-program',
    '/blogs',
    '/mortgage-guide',
    '/mortgage-services',
    '/areas-we-serve',
  ].map((path) => ({
    url: `${brand.siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${brand.siteUrl}/blogs/${post.slug}`,
    lastModified: post.date,
  }));

  const serviceRoutes = mortgageServices.map((service) => ({
    url: `${brand.siteUrl}/mortgage-services/${service.slug}`,
    lastModified: new Date(),
  }));

  const areaRoutes = serviceAreas.map((area) => ({
    url: `${brand.siteUrl}/areas-we-serve/${area.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...serviceRoutes, ...areaRoutes];
}
