import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'pricing', title: 'Pricing & Stock' },
    { name: 'variants', title: 'Variants' },
    { name: 'media', title: 'Media' },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    // ── General ──
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required().min(2).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'name',
        maxLength: 200,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'general',
      rows: 3,
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      group: 'general',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Apparel', value: 'apparel' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Home & Living', value: 'home-living' },
          { title: 'Pet Essentials', value: 'pet-essentials' },
          { title: 'Travel', value: 'travel' },
          { title: 'Limited Edition', value: 'limited-edition' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      group: 'general',
      description: 'Show this product in featured sections',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'general',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // ── Pricing & Stock ──
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'pricing',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare At Price',
      type: 'number',
      group: 'pricing',
      description: 'Original/comparison price shown as strikethrough',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'stockStatus',
      title: 'Stock Status',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          { title: 'In Stock', value: 'in-stock' },
          { title: 'Out of Stock', value: 'out-of-stock' },
          { title: 'Coming Soon', value: 'coming-soon' },
        ],
        layout: 'radio',
      },
      initialValue: 'in-stock',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      group: 'pricing',
      description: 'Stock Keeping Unit identifier',
    }),

    // ── Media ──
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    }),

    // ── Variants ──
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      group: 'variants',
      description: 'Product variations (color, size, etc.). Leave empty for simple products.',
      of: [
        {
          type: 'object',
          name: 'variant',
          title: 'Variant',
          fields: [
            defineField({
              name: 'variantName',
              title: 'Variant Name',
              type: 'string',
              description: 'e.g. "Black / Large"',
              validation: (rule) => rule.required().min(1).max(200),
            }),
            defineField({
              name: 'sku',
              title: 'SKU',
              type: 'string',
              description: 'Unique stock-keeping unit identifier for this variant',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              description: 'Override the base product price if different',
              validation: (rule) => rule.min(0),
            }),
            defineField({
              name: 'compareAtPrice',
              title: 'Compare At Price',
              type: 'number',
              description: 'Original/comparison price shown as strikethrough',
              validation: (rule) => rule.min(0),
            }),
            defineField({
              name: 'stockQuantity',
              title: 'Stock Quantity',
              type: 'number',
              description: 'Number of units currently in stock',
              validation: (rule) => rule.min(0).integer(),
              initialValue: 0,
            }),
            defineField({
              name: 'color',
              title: 'Color',
              type: 'string',
              description: 'e.g. "Black", "Ivory", "Cognac"',
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
              description: 'e.g. "S", "M", "L", "XL" or "10 oz", "12 oz"',
            }),
            defineField({
              name: 'variantImage',
              title: 'Variant Image',
              type: 'image',
              description: 'Optional image specific to this variant',
              options: { hotspot: true },
            }),
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              description: 'Disable to hide this variant from the storefront',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'variantName',
              media: 'variantImage',
              sku: 'sku',
              price: 'price',
              stock: 'stockQuantity',
              active: 'isActive',
            },
            prepare({ title, media, sku, price, stock, active }) {
              return {
                title: title || 'Unnamed Variant',
                subtitle: [
                  sku && `SKU: ${sku}`,
                  price != null ? `$${Number(price).toFixed(2)}` : null,
                  stock != null && `Stock: ${stock}`,
                  active === false && '(Inactive)',
                ]
                  .filter(Boolean)
                  .join(' · '),
                media,
              }
            },
          },
        },
      ],
      options: {
        layout: 'list',
      },
    }),

    // ── Details ──
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      group: 'details',
      description: 'e.g. 10" x 8" x 2"',
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'features',
      title: 'Product Features',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      group: 'details',
      initialValue: 'THE KYNXZ BRAND',
      readOnly: true,
    }),
    defineField({
      name: 'customerRating',
      title: 'Customer Rating',
      type: 'number',
      group: 'details',
      description: 'Average rating from 0 to 5',
      validation: (rule) => rule.min(0).max(5),
      options: {
        list: [
          { title: '0 stars', value: 0 },
          { title: '0.5 stars', value: 0.5 },
          { title: '1 star', value: 1 },
          { title: '1.5 stars', value: 1.5 },
          { title: '2 stars', value: 2 },
          { title: '2.5 stars', value: 2.5 },
          { title: '3 stars', value: 3 },
          { title: '3.5 stars', value: 3.5 },
          { title: '4 stars', value: 4 },
          { title: '4.5 stars', value: 4.5 },
          { title: '5 stars', value: 5 },
        ],
      },
    }),
    defineField({
      name: 'shippingInfo',
      title: 'Shipping Information',
      type: 'text',
      group: 'details',
      rows: 3,
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      group: 'details',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
      price: 'price',
      status: 'stockStatus',
    },
    prepare({ title, media, price, status }) {
      return {
        title,
        subtitle: `$${price?.toFixed(2) ?? '0.00'} — ${status === 'in-stock' ? 'In Stock' : status === 'out-of-stock' ? 'Out of Stock' : 'Coming Soon'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Price (High to Low)',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
    },
    {
      title: 'Published Date (Newest)',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }],
    },
    {
      title: 'Product Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
