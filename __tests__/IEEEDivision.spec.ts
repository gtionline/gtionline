// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test } from '@jest/globals';
import { DivisionIEEE } from '../src/scripts/algorithms/arithmetic/IEEE/division';
import { getIEEEFromString, NumberIEEE } from '../src/scripts/algorithms/arithmetic/IEEE/numberIEEE';
import { checkMantissa, checkArray } from '../src/testHelper';

function createIEEE(precision: number, bits: string): NumberIEEE {
  const number = getIEEEFromString(precision, bits);
  if (!number) {
      throw new Error(`Failed to create IEEE number from: ${bits}`);
  }
  return number;
}

describe('Division of two IEEE-Numbers', () => {
  test('DivisionIEEE: 5.0 / 2.0 == 2.5', () => {
    const y1 = createIEEE(5, '0 10001 01000000000');
    const y2 = createIEEE(5, '0 10000 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('DivisionIEEE: -5.0 / 2.0 == -2.5', () => {
    const y1 = createIEEE(5, '1 10001 01000000000');
    const y2 = createIEEE(5, '0 10000 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('DivisionIEEE: 5.5 / 0.5 == 11.0', () => {
    const y1 = createIEEE(5, '0 10001 01100000000');
    const y2 = createIEEE(5, '0 01110 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('DivisionIEEE: 1.0 / 0.0 == Inf', () => {
    const y1 = createIEEE(5, '0 01111 00000000000');
    const y2 = createIEEE(5, '0 00000 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
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

  test('DivisionIEEE: 0.0 / 0.0 == NaN', () => {
    const y1 = createIEEE(5, '0 00000 00000000000');
    const y2 = createIEEE(5, '0 00000 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
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

  test('DivisionIEEE: 0.0 / 1.0 == 0.0', () => {
    const y1 = createIEEE(5, '0 00000 00000000000');
    const y2 = createIEEE(5, '0 01111 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
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

  test('DivisionIEEE: 100 / NaN == NaN', () => {
    const y1 = createIEEE(5, '0 10101 10010000000');
    const y2 = createIEEE(5, '0 11111 11111111111');
    const result = (new DivisionIEEE(y1, y2)).getResult();
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

  test('DivisionIEEE: NaN / 100 == NaN', () => {
    const y1 = createIEEE(5, '0 11111 11111111111');
    const y2 = createIEEE(5, '0 10101 10010000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
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

  test('DivisionIEEE: 65500 / 0.5 == Inf', () => {
    const y1 = createIEEE(5, '0 11110 11111111111');
    const y2 = createIEEE(5, '0 01110 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
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

  test('DivisionIEEE: -Inf / 0.5 == -Inf', () => {
    const y1 = createIEEE(5, '1 11111 00000000000');
    const y2 = createIEEE(5, '0 01110 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
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

  test('DivisionIEEE: 0.5 / Inf == Zero', () => {
    const y1 = createIEEE(5, '0 01110 00000000000');
    const y2 = createIEEE(5, '0 11111 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
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

  test('DivisionIEEE: Inf / Inf == NaN', () => {
    const y1 = createIEEE(5, '0 11111 00000000000');
    const y2 = createIEEE(5, '0 11111 00000000000');
    const result = (new DivisionIEEE(y1, y2)).getResult();
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

  test('DivisionIEEE: 12.0 / 3.4 == 3.53', () => {
    const y1 = createIEEE(5, '0 10010 1000000000');
    const y2 = createIEEE(5, '0 10000 1011001101');
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1];
    checkMantissa(expectedMantissa, result);
  });

  test('2.DivisionIEEE: 12.0 / 3.4 == 3.53', () => {
    const value1 = [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0].join('');
    const y1 = createIEEE(5, value1);
    const value2 = [0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0].join('');
    const y2 = createIEEE(5, value2);
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray2 = [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0];
    checkArray(expectedArray2, result);
    const expectedMantissa = [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('DivisionIEEE: 1.5 / 0.5 == 3.0', () => {
    const y1 = createIEEE(5, '0 01111 1000000000');  // 1.5
    const y2 = createIEEE(5, '0 01110 0000000000');  // 0.5
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1,0,0,0,0, 1,0,0,0,0,0,0,0,0,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1,0,0, 0,0,0, 0,0,0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('DivisionIEEE: 0.1 / 0.2 == 0.5', () => {
    const y1 = createIEEE(5, '0 01101 1001100110');  // 0.1
    const y2 = createIEEE(5, '0 01110 1001100110');  // 0.2
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0,1,1,1,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0,0,0, 0,0,0, 0,0,0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('DivisionIEEE: Smallest Denormal / 2.0 == Even Smaller', () => {
    const y1 = createIEEE(5, '0 00000 0000000001');  // Smallest denormal
    const y2 = createIEEE(5, '0 10000 0000000000');  // 2.0
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.isZero).toBe(true);
    expect(result.sign).toBe(0);
  });

  test('DivisionIEEE: -4.0 / -2.0 == 2.0', () => {
    const y1 = createIEEE(5, '1 10001 0000000000');  // -4.0
    const y2 = createIEEE(5, '1 10000 0000000000');  // -2.0
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0,0,0, 0,0,0, 0,0,0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('DivisionIEEE: Max Normal / 0.5 == Infinity', () => {
    const y1 = createIEEE(5, '0 11110 1111111111');  // Max normal number
    const y2 = createIEEE(5, '0 01110 0000000000');  // 0.5
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.isInfinity).toBe(true);
    expect(result.sign).toBe(0);
  });

  test('DivisionIEEE: Denormal / Denormal', () => {
    const y1 = createIEEE(5, '0 00000 0000000010');  // Denormal
    const y2 = createIEEE(5, '0 00000 0000000001');  // Smallest denormal
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1,0,0,0,0, 0,0,0,0,0,0,0,0,0,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0,0,0, 0,0,0, 0,0,0,0];
    checkMantissa(expectedMantissa, result);
  });

  test('DivisionIEEE: 1.0 / 3.0 (Recurring Result)', () => {
    const y1 = createIEEE(5, '0 01111 0000000000');  // 1.0
    const y2 = createIEEE(5, '0 10000 1000000000');  // 3.0
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    // 0.333... in binary is 0.01010101...
    const expectedArray = [0, 0,1,1,0,1, 0,1,0,1,0,1,0,1,0,1];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0,1,0,1,0,1,0,1,0,1];
    checkMantissa(expectedMantissa, result);
  });

  test('DivisionIEEE: 1.0 / 3.0 (Recurring Result)', () => {
    const y1 = createIEEE(5, '1 11111 1001000010');  // 1.0
    const y2 = createIEEE(5, '1 10010 0111101011');  // 3.0
    const result = (new DivisionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(true);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    // 0.333... in binary is 0.01010101...
    const expectedArray = [1, 1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1,1,1,1,1,1,1,1,1,1];
    checkMantissa(expectedMantissa, result);
  });
});
