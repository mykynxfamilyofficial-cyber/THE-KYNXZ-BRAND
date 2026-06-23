import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kynxz.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mission`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Fetch products for dynamic product pages
  // During build, we use the Sanity client directly instead of self-referencing the API
  let productPages: MetadataRoute.Sitemap[number][] = [];
  try {
    // Direct Sanity query (works during build time, no API server needed)
    const [{ createClient }, { projectId, dataset, apiVersion }] = await Promise.all([
      import('@sanity/client'),
      import('@/sanity/env'),
    ]);
    const client = createClient({ projectId, dataset, apiVersion, useCdn: true });

    const products = await client.fetch<{ id: string; name: string; _updatedAt?: string }[]>(
      `*[_type == "product" && defined(slug.current)]{ "id": slug.current, name, _updatedAt }`
    );

    productPages = products.map((product) => ({
      url: `${baseUrl}/collections/${product.id}`,
      lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.warn("Could not fetch products for sitemap directly, statically:", error);
    // If direct Sanity query fails, we still serve static pages
  }

  return [...staticPages, ...productPages];
}
