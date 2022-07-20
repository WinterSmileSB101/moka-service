import { getFilePath } from "../utils";

import { MiddlewareFunc } from "./middleware.types";

export const AdditionMappingMiddleware: MiddlewareFunc =
  (rootMokaPath) => (ctx, next) => {
    const mappingPath = getFilePath(rootMokaPath, ctx.path);

    try {
      const mappingData = require(mappingPath);
      console.log(mappingData);

      return next();
    } catch (err) {
        console.info(`Can't find match mappings`);
        
        return next();
    }
  };
