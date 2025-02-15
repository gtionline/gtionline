// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test } from '@jest/globals';
import { SubtractionIEEE } from '../src/scripts/algorithms/arithmetic/IEEE/subtraction';
import { getIEEEFromString, NumberIEEE } from '../src/scripts/algorithms/arithmetic/IEEE/numberIEEE';
import {
  checkArray, checkMantissa,
} from '../src/testHelper';

function createIEEE(precision: number, bits: string): NumberIEEE {
  const number = getIEEEFromString(precision, bits);
  if (!number) {
      throw new Error(`Failed to create IEEE number from: ${bits}`);
  }
  return number;
}

describe('Subtraction of two IEEE-Numbers', () => {
  test('SubtractionIEEE: 5.0 - 2.0 == 3.0', () => {
    const y1 = createIEEE(5, '0 10001 01000000000');
    const y2 = createIEEE(5, '0 10000 00000000000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: 4.0 - 5.0 == -1.0', () => {
    const y1 = createIEEE(5, '0 10001 00000000000');
    const y2 = createIEEE(5, '0 10001 01000000000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: -1.0 - 2.0 == -3.0', () => {
    const y1 = createIEEE(5, '1 01111 00000000000');
    const y2 = createIEEE(5, '0 10000 00000000000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: 1.0 - 0.0 == 1.0', () => {
    const y1 = createIEEE(5, '0 01111 00000000000');
    const y2 = createIEEE(5, '0 00000 00000000000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: -1.0 - (-1.0) == 0.0', () => {
    const y1 = createIEEE(5, '1 01111 00000000000');
    const y2 = createIEEE(5, '1 01111 00000000000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(true);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: 1.0 - (-2.0) == 3.0', () => {
    const y1 = createIEEE(5, '0 01111 00000000000');
    const y2 = createIEEE(5, '1 10000 00000000000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: 14.0 - 123.0 == -109.0', () => {
    const y1 = createIEEE(5, '0 10010 11000000000');
    const y2 = createIEEE(5, '0 10101 11101100000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('SubtractionIEEE: -100 - 65500 == -Inf', () => {
    const y1 = createIEEE(5, '1 10101 10010000000');
    const y2 = createIEEE(5, '0 11110 11111111111');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(true);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: 100 - 100 == Zero', () => {
    const y1 = createIEEE(5, '0 10101 10010000000');
    const y2 = createIEEE(5, '0 10101 10010000000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(true);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: 100 - NaN == NaN', () => {
    const y1 = createIEEE(5, '0 10101 10010000000');
    const y2 = createIEEE(5, '0 11111 11111111111');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(true);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: NaN - 100 == NaN', () => {
    const y2 = createIEEE(5, '0 10101 10010000000');
    const y1 = createIEEE(5, '0 11111 00000000001');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(true);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: 65500 - Inf == -Inf', () => {
    const y1 = createIEEE(5, '0 11110 11111111111');
    const y2 = createIEEE(5, '0 11111 00000000000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(true);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: Inf - 65500 == Inf', () => {
    const y1 = createIEEE(5, '0 11111 00000000000');
    const y2 = createIEEE(5, '0 11110 11111111111');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(true);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });

  test('SubtractionIEEE: Inf - Inf == NaN', () => {
    const y1 = createIEEE(5, '0 11111 00000000000');
    const y2 = createIEEE(5, '0 11111 00000000000');
    const result = (new SubtractionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(true);
    expect(result.arr[0]).toBe(1);
    expect(result.sign).toBe(1);
    const expectedArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    for (let i = 0; i < expectedMantissa.length; i += 1) {
      expect(result.mantissaBits[i]).toBe(expectedMantissa[i]);
    }
  });
});
