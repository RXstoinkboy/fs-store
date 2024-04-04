import { CustomApiError } from "../errors/custom-api-error.js";

export const requestValidation = (schema) => {
  return async (req, res, next) => {
    try {
      const { error } = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (error) {
        return next(
          new CustomApiError(
            error.errors.map((err) => err.message).join(", "),
            400
          )
        );
      }

      next(error);
    } catch (error) {
      next(error);
    }
  };
};
