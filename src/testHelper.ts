// eslint-disable-next-line
import { expect } from '@jest/globals';
import { Algorithm } from './scripts/algorithms/algorithm';
import { NumberIEEE } from './scripts/algorithms/arithmetic/IEEE/numberIEEE';

/**
 * Checks a key/value-pair at a single step in an algorithm.
 * @param watcher Algorithm watcher instance
 * @param step name of the step as a string
 * @param key name of the key as a string
 * @param value expected value (single value or array like)
 */
export function checkStep(
  watcher: Algorithm, 
  step: string, 
  key: string, 
  value: any
): void {
  const watcherStep = watcher.steps[step];
  if (!watcherStep) {
    throw new Error(`Calculation of Addition IEEE ended before step: ${step}`);
  }

  const keys = Object.keys(watcherStep.data);
  if (keys.indexOf(key) === -1) {
    throw new Error(`Calculation of Addition IEEE ended before step: ${step}, value: ${key}`);
  }

  const watcherValue = watcherStep.data[key];
  if (Array.isArray(watcherValue) && Array.isArray(value)) {
    expect(watcherValue.length).toBe(value.length);
    for (let i = 0; i < value.length; i += 1) {
      expect(watcherValue[i]).toBe(value[i]);
    }
  } else if (
    (Array.isArray(watcherValue) && !Array.isArray(value))
    || (!Array.isArray(watcherValue) && Array.isArray(value))
  ) {
    throw new Error(`Error Testing: Addition IEEE step: ${step}, value: ${key}: Array-like is not compatible to single value`);
  } else {
    expect(watcherValue).toBe(value);
  }
}

/**
 * Checks the IEEE array against an expected array.
 * @param expected expected array
 * @param object IEEENumber to check
 */
export function checkArray(expected: number[], object: NumberIEEE): void {
  expect(object.arr.length).toBe(expected.length);

  for (let i = 0; i < expected.length; i += 1) {
    expect(object.arr[i]).toBe(expected[i]);
  }
}

/**
 * Checks a IEEE mantissa against an expected mantissa
 * @param expected expected mantissa
 * @param object IEEENumber to check
 */
export function checkMantissa(expected: number[], object: NumberIEEE): void {
  expect(object.mantissaBits.length).toBe(expected.length);

  console.log('object.mantissaBits', object.mantissaBits);
  console.log('expected', expected);
  for (let i = 0; i < expected.length; i += 1) {
    expect(object.mantissaBits[i]).toBe(expected[i]);
  }
}
