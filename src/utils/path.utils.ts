import { isEmpty, trimEnd } from "lodash";
import path from "path";

/**
 * get file path
 * @param mockBasePath basic path
 * @param targetPath target file path
 * @returns
 */
function getFilePath(mockBasePath: string, targetPath: string): string {
  const reqPath = trimEnd(targetPath, "/");
  const filePath = path.join(
    mockBasePath,
    `${isEmpty(reqPath) ? "index" : reqPath}.json`
  );

  return filePath;
}

export { getFilePath };
