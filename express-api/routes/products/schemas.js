import z from "zod";

export const ProductsQuerySchema = z.object({
  query: z
    .object({
      name: z.string(),
      price: z.number(),
      featured: z.coerce.boolean(),
      rating: z.number(),
      company: z.string(),
      createdAt: z.date(),
    })
    .partial()
    .strict(),
});

const knownKeys = Object.keys(ProductsQuerySchema.shape.query.shape);
const knownKeysStringUnion = knownKeys.join("|");

const fieldsSchema = z
  .string()
  .optional()
  .refine(
    (fields) => {
      if (!fields) {
        return true;
      }
      const fieldsRegex = new RegExp(
        `^(${knownKeysStringUnion})(,(${knownKeysStringUnion}))*$`
      );
      return fieldsRegex.test(fields);
    },
    (fields) => ({
      message: `Unknown field provided in "fields". Provided: ${fields}. Expected one of: ${knownKeys.join(
        ","
      )}`,
    })
  )
  .transform((fields) => fields?.replace(/,/g, " "));

ProductsQuerySchema.shape.query.shape.fields = fieldsSchema;

const sortSchema = z
  .string()
  .optional()
  .refine(
    (fields) => {
      if (!fields) {
        return true;
      }
      const sortRegex = new RegExp(
        `^(-?(${knownKeysStringUnion}))(,(-?(${knownKeysStringUnion})))*$`
      );
      return sortRegex.test(fields);
    },
    (fields) => ({
      message: `Unknown field provided in "sort". Provided: ${fields}. Can be sorted by: ${knownKeys.join(
        ","
      )}`,
    })
  )
  .transform((fields) => fields?.replace(/,/g, " "));

ProductsQuerySchema.shape.query.shape.sort = sortSchema;
