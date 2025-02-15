/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import { NumberPolyadic } from './algorithms/arithmetic/polyadic/numberPolyadic';
import { AdditionPolyadic } from './algorithms/arithmetic/polyadic/addition';
import { SubtractionPolyadic } from './algorithms/arithmetic/polyadic/subtraction';
import { ConversionPolyadicNumbers } from './algorithms/arithmetic/polyadic/conversionPolyadicNumbers';
import { Algorithm } from './algorithms/algorithm';

export class PolyadicSolution {
  private result: NumberPolyadic;
  private watcher: Algorithm['watcher'];
  private modus: string;

  constructor() {
    this.result = new NumberPolyadic(0, '');
    this.watcher = {} as Algorithm['watcher'];
    this.modus = '';
  }

  public add(number1: NumberPolyadic, number2: NumberPolyadic): NumberPolyadic {
    if (number1.power !== number2.power) {
      throw new Error('Numbers must have the same base for addition');
    }

    const addition = new AdditionPolyadic(number1, number2);
    this.result = addition.getResult();
    this.watcher = this.deepClone(addition.getWatcher());
    return this.result;
  }

  public subtract(number1: NumberPolyadic, number2: NumberPolyadic): NumberPolyadic {
    if (number1.power !== number2.power) {
      throw new Error('Numbers must have the same base for subtraction');
    }

    const subtraction = new SubtractionPolyadic(number1, number2);
    this.result = subtraction.getResult();
    this.watcher = this.deepClone(subtraction.getWatcher());
    return this.result;
  }

  public convertFormat(
    num1: number | string,
    format1: number,
    format2: number
  ): NumberPolyadic {
    if (num1 === '') return new NumberPolyadic(0, '');

    const number = new NumberPolyadic(format1, num1.toString());
    const converter = new ConversionPolyadicNumbers(number, format2);
    
    this.modus = converter.getModus();
    this.result = converter.getResult();
    this.watcher = converter.getWatcher();
    return this.result;
  }

  public getResult(): NumberPolyadic {
    return this.result;
  }

  public getWatcher(): Algorithm['watcher'] {
    return this.watcher;
  }

  public getModus(): string {
    return this.modus;
  }

  private deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
