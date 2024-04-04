import z from "zod";

export const ProductsQuerySchema = z.object({
  //   query: z.object({
  //     name: z.string().optional(),
  //     price: z.number().optional(),
  //     featured: z.boolean().optional(),
  //     rating: z.number().optional(),
  //     company: z.string().optional(),
  //     createdAt: z.date().optional(),
  //   }).strict(),
  query: z
    .object({
      name: z.string(),
      price: z.number(),
      featured: z.boolean(),
      rating: z.number(),
      company: z.string(),
      createdAt: z.date(),
    })
    .partial()
    .passthrough(),
});

const knownKeys = Object.keys(ProductsQuerySchema.shape.query.shape);

ProductsQuerySchema.shape.query = ProductsQuerySchema.shape.query.refine(
  (value) => {
    const keys = Object.keys(value);
    for (let key of keys) {
      if (!knownKeys.includes(key)) {
        return false;
      }
    }
    return true;
  },
  {
    message: "Unknown property provided in query",
    path: ["query"],
  }
);
