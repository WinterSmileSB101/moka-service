import chalk from "chalk";
import { createSimpleLogger } from "simple-node-logger";

function info(message?: any, ...optionalParams: any[]) {
  console.info(chalk.bgBlueBright(message), optionalParams);
}

function log(message?: any, ...optionalParams: any[]) {
  console.log(chalk.bgBlue(message), optionalParams);
}

function getLogger(path: string) {
  return createSimpleLogger(path);
}

export { info, log, getLogger };
