import z from "zod";
import { COMPANIES } from "./model.js";

export const ProductsQuerySchema = z.object({
  query: z
    .object({
      name: z.string(),
      price: z.number(),
      featured: z.coerce.boolean(),
      company: z.enum(COMPANIES),
      createdAt: z.date(),
      page: z.coerce.number().min(1),
      limit: z.coerce.number().min(1),
      price: z.string(),
      rating: z.string()
      // fields with additional logic below:
      // fields
      // sort
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

const numericOperators = ["<", ">", "<=", ">=", "="];
const numericOperatorsStingUnion = numericOperators.join("|");
const dbNumericOperators = ["$lt", "$gt", "$lte", "$gte", "$eq"];

const createNumericFieldSchema = (fieldName) => {
  const fieldSchema = z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) {
          return true;
        }
        const decodedValue = decodeURIComponent(value);
        const valueRegex = new RegExp(
          `^(${numericOperatorsStingUnion})\\d+(\\.\\d+)?(,(${numericOperatorsStingUnion})\\d+(\\.\\d+)?)*$`
        );
        return valueRegex.test(decodedValue);
      },
      {
        message: `Invalid ${fieldName} range provided. Expected format: <100,>100,=100,<=100,>=100`,
      }
    )
    .transform((value) => {
      if (!value) {
        return undefined;
      }

      const decodedValue = decodeURIComponent(value);
      const filters = decodedValue.split(",").reduce((acc, filter) => {
        const operator = filter.match(/[^0-9]+/g)[0];
        const value = parseInt(filter.match(/[0-9]+/g)[0]);
        const operatorIndex = numericOperators.indexOf(operator);
        const dbOperator = dbNumericOperators[operatorIndex];
        return { ...acc, [dbOperator]: value };
      }, {});

      return filters;
    });

  ProductsQuerySchema.shape.query.shape[fieldName] = fieldSchema;
};

createNumericFieldSchema("price");
createNumericFieldSchema("rating");
