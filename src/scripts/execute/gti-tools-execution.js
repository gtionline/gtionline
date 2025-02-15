import { generateCMOSExecution } from './generateCMOSExecution';
import { multiplyExecution } from './multiplyExecution';

const programs = {
  generateCMOSNetwork: generateCMOSExecution,
  multiply: multiplyExecution,
};

if (process.argv.length < 3) {
  console.error("No subcommand found. Use 'node gti-tools help' to see a list of available subcommands.");
  process.exit(1);
}

const calledProgram = process.argv[2];

if (!Object.prototype.hasOwnProperty.call(programs, calledProgram)) {
  console.error("Given subcommand not found. Use 'node gti-tools help' to see a list of available subcommands.");
  process.exit(1);
}

programs[calledProgram]();
