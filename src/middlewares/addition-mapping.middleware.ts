import { getFilePath, getPathHeadRoute } from "../utils";

import { MiddlewareFunc } from "./middleware.types";

export const AdditionMappingMiddleware: MiddlewareFunc =
  (rootMokaPath) => (ctx, next) => {
    const headRoute = getPathHeadRoute(ctx.path);
    const mappingPath = getFilePath(rootMokaPath, headRoute, 'mapping');

    try {
      console.log('Mapping Path: ', mappingPath);
      const mappingData = require(mappingPath);

      ctx.body = mappingData;

      return Promise.resolve(mappingData);
    } catch (err) {
      console.info(`Can't find match mappings`);

      return next();
    }
  };
