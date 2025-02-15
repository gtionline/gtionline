// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test } from '@jest/globals';
import { getIEEEFromString, NumberIEEE } from '../src/scripts/algorithms/arithmetic/IEEE/numberIEEE';
import { AdditionIEEE } from '../src/scripts/algorithms/arithmetic/IEEE/addition';

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

describe('Addition of two IEEE-Numbers', () => {
  test('AdditionIEEE: 10 + 10 == 20', () => {
    const y1 = createIEEE(5, '0 10010 0100000000')!;
    const y2 = createIEEE(5, '0 10010 0100000000')!;
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1,0,0,1,1, 0,1,0,0,0,0,0,0,0,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1,0,1,0,0,0,0,0,0,0,0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: 1.0 + 2.0 == 3.0', () => {
    const y1 = createIEEE(5, '0 01111 0000000000')!;
    const y2 = createIEEE(5, '0 10000 0000000000')!;
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(10);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1,0,0,0,0, 1,0,0,0,0,0,0,0,0,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1,1,0,0,0,0,0,0,0,0,0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: 1.0 + 2.0 == 3.0', () => {
    const y1 = createIEEE(5, '0 01111 00000000000')!;
    const y2 = createIEEE(5, '0 10000 00000000000')!;
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1,0,0,0,0, 1,0,0,0,0,0,0,0,0,0,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1,1,0,0,0,0,0,0,0,0,0,0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: 5.5 + 27.25 == 32.75', () => {
    const y1 = createIEEE(5, '0 10001 01100000000');
    const y2 = createIEEE(5, '0 10011 10110100000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: -1.0 + 2.0 == 1.0', () => {
    const y1 = createIEEE(5, '1 01111 00000000000');
    const y2 = createIEEE(5, '0 10000 00000000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: 5.0 + -2.0 == 3.0', () => {
    const y1 = createIEEE(5, '0 10001 01000000000');
    const y2 = createIEEE(5, '1 10000 00000000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: 1.0 + 0.0 == 1.0', () => {
    const y1 = createIEEE(5, '0 01111 00000000000');
    const y2 = createIEEE(5, '0 00000 00000000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(11);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: 100 + 65500 == Inf', () => {
    const y1 = createIEEE(5, '0 10101 10010000000');
    const y2 = createIEEE(5, '0 11110 11111111111');
    const result = (new AdditionIEEE(y1, y2)).getResult();
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

  test('AdditionIEEE: -100 + -65500 == -Inf', () => {
    const y1 = createIEEE(5, '1 10101 10010000000');
    const y2 = createIEEE(5, '1 11110 11111111111');
    const result = (new AdditionIEEE(y1, y2)).getResult();
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

  test('AdditionIEEE: -100 + 100 == Zero', () => {
    const y1 = createIEEE(5, '1 10101 10010000000');
    const y2 = createIEEE(5, '0 10101 10010000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
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
  
  test('AdditionIEEE: 100 + NaN == NaN', () => {
    const y1 = createIEEE(5, '0 10101 10010000000');
    const y2 = createIEEE(5, '0 11111 11111111111');
    const result = (new AdditionIEEE(y1, y2)).getResult();
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

  test('AdditionIEEE: NaN + 100 == NaN', () => {
    const y1 = createIEEE(5, '0 11111 11111111111');
    const y2 = createIEEE(5, '0 10101 10010000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
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

  test('AdditionIEEE: Inf + 100 == Inf', () => {
    const y1 = createIEEE(5, '0 11111 00000000000');
    const y2 = createIEEE(5, '0 10101 10010000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
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

  test('AdditionIEEE: 100 + Inf == Inf', () => {
    const y1 = createIEEE(5, '0 10101 10010000000');
    const y2 = createIEEE(5, '0 11111 00000000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
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

  // tests build from the tutorials
  // values from lecture GTI, tutorial 4
  test('AdditionIEEE: 69.615.616 + 1.33955584E8 == 2.035712E8', () => {
    const y1 = createIEEE(8, '0 10011001 00001001100100000000000');
    const y2 = createIEEE(8, '0 10011001 11111111000000000000000');
    const addition = new AdditionIEEE(y1, y2);
    const result = addition.getResult();
        
    expect(result.manBitNum).toBe(23);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [
      0, // sign
      1, 0, 0, 1, // exp
      1, 0, 1, 0,
      1, 0, 0, 0, // man
      0, 1, 0, 0,
      0, 1, 0, 0,
      1, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0,
    ];
    checkArray(expectedArray, result);
    const expectedMantissa = [
      1, // leading 1
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 1, 0, 0,
      1, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0,
    ];
    checkMantissa(expectedMantissa, result);
    // check intermediate steps
    const watcher = addition.getWatcher();
    checkStep(watcher, 'CalculateDeltaE', 'deltaE', 0);
    checkStep(watcher, 'AddMantissa', 'shift', 1);
    checkStep(watcher, 'AddMantissa', 'sign', false);
    checkStep(watcher, 'AddMantissa', 'unnormalizedMantissa', [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    checkStep(watcher, 'AddMantissa', 'normalizedMantissa', [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    checkStep(watcher, 'ResultEdgecase', 'edgecase', 'none');
  });

  /* test('AdditionIEEE: 69.615.616 + (-2539520.0) == 67076096.0', () => {
    const y1 = createIEEE(8, '0 10011001 00001001100100000000000');
    const y2 = createIEEE(8, '1 10010100 00110110000000000000000');
    const addition = new AdditionIEEE(y1, y2);
    const result = addition.getResult();
    expect(result.manBitNum).toBe(23);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [
      0, // sign
      1, 0, 0, 1, // exp
      1, 0, 0, 0,
      1, 1, 1, 1, // man
      1, 1, 1, 1,
      1, 1, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0,
    ];
    checkArray(expectedArray, result);
    const expectedMantissa = [
      1, // leading 1
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0,
    ];
    checkMantissa(expectedMantissa, result);
    // check intermediate steps
    const watcher = addition.getWatcher();
    checkStep(watcher, 'CalculateDeltaE', 'deltaE', 5);
    checkStep(watcher, 'AddMantissa', 'shift', -1);
    checkStep(watcher, 'AddMantissa', 'sign', false);
    checkStep(watcher, 'AddMantissa', 'unnormalizedMantissa', [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]);
    checkStep(watcher, 'AddMantissa', 'normalizedMantissa', [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]);
    checkStep(watcher, 'ResultEdgecase', 'edgecase', 'none');
  }); */

  test('AdditionIEEE: 0.1 + 0.2 ≈ 0.3', () => {
    const y1 = createIEEE(8, '0 01111011 10011001100110011001101');
    const y2 = createIEEE(8, '0 01111100 10011001100110011001101');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(23);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0,1,1,1,1,1,0,1, 0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,1,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: -1.5 + 2.5 = 1.0', () => {
    const y1 = createIEEE(8, '1 01111111 10000000000000000000000');
    const y2 = createIEEE(8, '0 10000000 01000000000000000000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(23);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: Smallest Positive + Smallest Positive', () => {
    const y1 = createIEEE(8, '0 00000000 00000000000000000000001');
    const y2 = createIEEE(8, '0 00000000 00000000000000000000001');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(23);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0];
    console.log('AdditionIEEE: Smallest Positive + Smallest Positive');
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: Large Number + Small Number', () => {
    const y1 = createIEEE(8, '0 10000110 11110000000000000000000');
    const y2 = createIEEE(8, '0 01111100 10000000000000000000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(23);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1,0,0,0,0,1,1,0, 1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    checkArray(expectedArray, result);
    const expectedMantissa = [1, 1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    checkMantissa(expectedMantissa, result);
  });

  test('AdditionIEEE: Positive Infinity + Any Number = Positive Infinity', () => {
    const y1 = createIEEE(8, '0 11111111 00000000000000000000000');
    const y2 = createIEEE(8, '0 10000000 10000000000000000000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(23);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(true);
    expect(result.isNaN).toBe(false);
    expect(result.arr[0]).toBe(0);
    expect(result.sign).toBe(0);
    const expectedArray = [0, 1,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    checkArray(expectedArray, result);
  });

  test('AdditionIEEE: NaN + Any Number = NaN', () => {
    const y1 = createIEEE(8, '0 11111111 10000000000000000000000');
    const y2 = createIEEE(8, '0 10000000 10000000000000000000000');
    const result = (new AdditionIEEE(y1, y2)).getResult();
    expect(result.manBitNum).toBe(23);
    expect(result.isZero).toBe(false);
    expect(result.isInfinity).toBe(false);
    expect(result.isNaN).toBe(true);
    const expectedArray = [1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    checkArray(expectedArray, result);
  });
});
