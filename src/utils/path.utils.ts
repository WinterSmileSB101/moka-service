import { head, isEmpty, split, trimEnd, trimStart } from "lodash";
import path from "path";

/**
 * get file path
 * @param mockBasePath basic path
 * @param targetPath target file path
 * @param additionPath addition path, will append to path with - connect(if addition path is empty, will not append it.)
 * @returns
 */
function getFilePath(
  mockBasePath: string,
  targetPath: string,
  additionPath: string = ""
): string {
  const appendPath = isEmpty(additionPath) ? "" : `-${additionPath}`;
  const reqPath = `${trimEnd(targetPath, "/")}${appendPath}`;
  const filePath = path.join(
    mockBasePath,
    `${isEmpty(reqPath) ? "index" : reqPath}.json`
  );

  return filePath;
}

/**
 * get path head route, if empty will use default value replace
 * @param targetPath target path
 * @param defaultValue default value, default is index
 * @returns path head route
 */
function getPathHeadRoute(
  targetPath: string,
  defaultValue: string = "index"
): string {
  const separator = "/";
  const headRoute =
    head(split(trimStart(targetPath, separator), separator)) ?? defaultValue;
  return isEmpty(headRoute) ? defaultValue : headRoute;
}

export { getFilePath, getPathHeadRoute };
