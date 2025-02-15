// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test } from '@jest/globals';
import { MultiplicationIEEE } from '../src/scripts/algorithms/arithmetic/IEEE/multiplication';
import { getIEEEFromString, NumberIEEE } from '../src/scripts/algorithms/arithmetic/IEEE/numberIEEE';
import {
  checkMantissa,
  checkArray,
  checkStep,
} from '../src/testHelper';

function createIEEE(precision: number, bits: string): NumberIEEE {
  const number = getIEEEFromString(precision, bits);
  if (!number) {
      throw new Error(`Failed to create IEEE number from: ${bits}`);
  }
  return number;
}

describe('Multiplication of two IEEE-Numbers', () => {
  test('MultiplicationIEEE: 5.0 * 2.0 == 10.0', () => {
    const y1 = createIEEE(5, '0 10001 01000000000');
    const y2 = createIEEE(5, '0 10000 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: -5.0 * 2.0 == -10.0', () => {
    const y1 = createIEEE(5, '1 10001 01000000000');
    const y2 = createIEEE(5, '0 10000 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: 5.0 * -2.0 == -10.0', () => {
    const y1 = createIEEE(5, '0 10001 01000000000');
    const y2 = createIEEE(5, '1 10000 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: -5.0 * -2.0 == 10.0', () => {
    const y1 = createIEEE(5, '1 10001 01000000000');
    const y2 = createIEEE(5, '1 10000 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: 5.0 * 1.0 == 5.0', () => {
    const y1 = createIEEE(5, '0 10001 01000000000');
    const y2 = createIEEE(5, '0 01111 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: 5.5 * 0.5 == 2.25', () => {
    const y1 = createIEEE(5, '0 10001 01100000000');
    const y2 = createIEEE(5, '0 01110 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: 2 * 65500 == Inf', () => {
    const y1 = createIEEE(5, '0 10000 00000000000');
    const y2 = createIEEE(5, '0 11110 11111111111');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(true);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: -2 * 65500 == -Inf', () => {
    const y1 = createIEEE(5, '1 10000 00000000000');
    const y2 = createIEEE(5, '0 11110 11111111111');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(true);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: 100 * 0 == Zero', () => {
    const y1 = createIEEE(5, '0 10101 10010000000');
    const y2 = createIEEE(5, '0 00000 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(true);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: 100 * NaN == NaN', () => {
    const y1 = createIEEE(5, '0 10101 10010000000');
    const y2 = createIEEE(5, '1 11111 11111111111');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(true);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: NaN * 100 == NaN', () => {
    const y1 = createIEEE(5, '1 11111 11111111111');
    const y2 = createIEEE(5, '0 10101 10010000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(true);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: Inf * 100 == Inf', () => {
    const y1 = createIEEE(5, '0 11111 00000000000');
    const y2 = createIEEE(5, '0 10101 10010000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(true);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: 100 * -Inf == -Inf', () => {
    const y1 = createIEEE(5, '0 10101 10010000000');
    const y2 = createIEEE(5, '1 11111 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(true);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  // tests build from the tutorials
  // values from lecture GTI, tutorial 4
  test('MultiplicationIEEE: x * -y == z', () => {
    const y1 = createIEEE(7, '0 1001000 10011011');
    const y2 = createIEEE(7, '1 1001010 11101000');
    const multiplication = new MultiplicationIEEE(y1, y2);
    const result = multiplication.getResult();
    expect(result.manBitNum).toBe(8);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [
      1, // sign
      1, 0, 1, 0, // exp
      1, 0, 0,
      1, 0, 0, 0, // man
      1, 0, 0, 0,
    ];
    checkArray(expectedArray, result);
    const expectedMantissa = [
      1, // leading 1
      1, 0, 0, 0,
      1, 0, 0, 0,
    ];
    checkMantissa(expectedMantissa, result);
    // check intermediate steps
    const watcher = multiplication.getWatcher();
    checkStep(watcher, 'CalculateExp', 'notShifted', 83);
    checkStep(watcher, 'MulMantissa', 'shift', 1);
    checkStep(watcher, 'MulMantissa', 'sign', 1);
    checkStep(watcher, 'MulMantissa', 'unnormalizedMantissa', [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1]);
    checkStep(watcher, 'MulMantissa', 'normalizedMantissa', [1, 0, 0, 0, 1, 0, 0, 0]);
    checkStep(watcher, 'ResultEdgecase', 'edgecase', 'none');
  });

  test('MultiplicationIEEE: 1.5 * 2.0 == 3.0', () => {
    const y1 = createIEEE(5, '0 10000 10000000000');
    const y2 = createIEEE(5, '0 10000 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: 0.8 * 1.6 ≈ 1.279', () => {
    const y1 = createIEEE(5, '0 01110 1001100110');
    const y2 = createIEEE(5, '0 01111 1001100110');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0,1,1,1,1, 0,1,0,0,0,1,1,1,1,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0,1,0,0,0,1,1,1,1,0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: -1.0 * -1.0 == 1.0', () => {
    const y1 = createIEEE(5, '1 01111 0000000000');
    const y2 = createIEEE(5, '1 01111 0000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: Smallest Positive * 2.0 == Smallest Positive * 2', () => {
    const y1 = createIEEE(5, '0 00000 0000000001');
    const y2 = createIEEE(5, '0 10000 0000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    console.log('result', result);
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0,0,0,0,0, 0,0,0,0,0,0,0,0,1,0];
    console.log('result', result);
    checkArray(expectedArray, result);
    const expectedMantissa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('MultiplicationIEEE: Largest Normal * 2.0 == Infinity', () => {
    const y1 = createIEEE(5, '0 11110 11111111111');
    const y2 = createIEEE(5, '0 10000 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(true);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
  });

  test('MultiplicationIEEE: NaN * 1.0 == NaN', () => {
    const y1 = createIEEE(5, '0 11111 10000000000');
    const y2 = createIEEE(5, '0 01111 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(true);
    const expectedArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    checkArray(expectedArray, result);
  });

  test('MultiplicationIEEE: Infinity * 0.0 == NaN', () => {
    const y1 = createIEEE(5, '0 11111 00000000000');
    const y2 = createIEEE(5, '0 00000 00000000000');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(true);
    const expectedArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    checkArray(expectedArray, result);
  });

  test('MultiplicationIEEE: Denormalized * Denormalized == 0', () => {
    const y1 = createIEEE(5, '0 00000 00000000001');
    const y2 = createIEEE(5, '0 00000 00000000001');
    const result = (new MultiplicationIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(true);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
  });
});
