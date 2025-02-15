import { BaseNMultiplication } from '../algorithms/baseNMultiplication/baseNMultiplication';
import { BaseNMultiplicationToText } from '../algorithms/baseNMultiplication/toText';

export function multiplyExecution() {
  if (process.argv.length < 5) {
    console.error('Not enough numbers for multiplication.');
    process.exit(1);
  }

  const base = process.argv.length > 5 ? process.argv[5] : 2;
  const multiplication = new BaseNMultiplication(base, process.argv[3], process.argv[4]);
  const translator = new BaseNMultiplicationToText(multiplication.watcher);
  console.log(translator.getResult());
}
