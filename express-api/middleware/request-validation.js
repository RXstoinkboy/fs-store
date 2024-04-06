import { CustomApiError } from "../errors/custom-api-error.js";

export const requestValidation = (schema) => {
  return async (req, res, next) => {
    try {
      const result = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (result.error) {
        return next(
          new CustomApiError(
            result.error?.errors.map((err) => err.message).join(", "),
            400
          )
        );
      }

      req.body = result.data.body;
      req.query = result.data.query;
      req.params = result.data.params;

      next(result.error);
    } catch (error) {
      next(error);
    }
  };
};
