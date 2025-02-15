import { CMOSCommandParser } from '../CMOSCommandParser';

export function generateCMOSExecution() {
  const parser = new CMOSCommandParser(process.argv.slice(3));
  console.log(parser.getResult());
}
