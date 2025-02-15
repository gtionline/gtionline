// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test } from '@jest/globals';
import { PolyadicSolution } from '../src/scripts/polyadicSolution';

describe('Polyadic Conversions', () => {
  test('Convert decimal to binary: 42 (base 10) -> 101010 (base 2)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('42', 10, 2);
    expect(solution.getResult().toString()).toBe('101010');
    expect(solution.getModus()).toBe('TenToPower');
  });

  test('Convert binary to decimal: 101010 (base 2) -> 42 (base 10)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('101010', 2, 10);
    expect(solution.getResult().toString()).toBe('42');
    expect(solution.getModus()).toBe('PowerToTen');
  });

  test('Convert decimal to hex: 255 (base 10) -> FF (base 16)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('255', 10, 16);
    expect(solution.getResult().toString()).toBe('FF');
    expect(solution.getModus()).toBe('TenToPower');
  });

  test('Convert hex to decimal: FF (base 16) -> 255 (base 10)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('FF', 16, 10);
    expect(solution.getResult().toString()).toBe('255');
    expect(solution.getModus()).toBe('PowerToTen');
  });

  test('Convert decimal with fraction: 42.5 (base 10) -> 101010.1 (base 2)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('42.5', 10, 2);
    expect(solution.getResult().toString()).toBe('101010.1');
    expect(solution.getModus()).toBe('TenToPower');
  });

  test('Convert negative number: -42 (base 10) -> -101010 (base 2)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('-42', 10, 2);
    expect(solution.getResult().toString()).toBe('-101010');
    expect(solution.getModus()).toBe('TenToPower');
  });

  test('Convert octal to binary: 52 (base 8) -> 101010 (base 2)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('52', 8, 2);
    expect(solution.getResult().toString()).toBe('101010');
    expect(solution.getModus()).toBe('PowerToPower');
  });

  test('Convert periodic decimal: 0.333... (base 10) -> 0.01010101... (base 2)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('0.3333333333', 10, 2);
    
    // Check the result
    const result = solution.getResult();
    expect(result.toString()).toBe('0.01010101010101');  // 1/3 in binary is 0.0101...
    expect(result.isPeriodic).toBe(false);
    expect(solution.getModus()).toBe('TenToPower');
  });

  test('Convert between same base: 42 (base 10) -> 42 (base 10)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('42', 10, 10);
    expect(solution.getResult().toString()).toBe('42');
  });
});

describe('Polyadic Conversions - Additional Base Systems', () => {
  // Base 3 (Ternary) Tests
  test('Convert decimal to base-3: 8 (base 10) -> 22 (base 3)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('8', 10, 3);
    expect(solution.getResult().toString()).toBe('22');
    expect(solution.getModus()).toBe('TenToPower');
  });

  test('Convert base-3 to decimal: 22 (base 3) -> 8 (base 10)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('22', 3, 10);
    expect(solution.getResult().toString()).toBe('8');
    expect(solution.getModus()).toBe('PowerToTen');
  });

  test('Convert base-3 fraction: 2.1 (base 3) -> 2.333... (base 10)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('2.1', 3, 10);
    
    // Check the result
    const result = solution.getResult();
    expect(result.toString()).toBe('2.(3)');  // 2.1 in base 3 is 2.333... in decimal
    expect(result.isPeriodic).toBe(true);
    expect(solution.getModus()).toBe('PowerToTen');
  });

  // Base 5 (Quinary) Tests
  test('Convert decimal to base-5: 42 (base 10) -> 132 (base 5)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('42', 10, 5);
    expect(solution.getResult().toString()).toBe('132');
    expect(solution.getModus()).toBe('TenToPower');
  });

  test('Convert base-5 to decimal: 132 (base 5) -> 42 (base 10)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('132', 5, 10);
    expect(solution.getResult().toString()).toBe('42');
    expect(solution.getModus()).toBe('PowerToTen');
  });

  test('Convert base-5 fraction: 3.2 (base 5) -> 3.4 (base 10)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('3.2', 5, 10);
    
    // Check the result
    const result = solution.getResult();
    expect(result.toString()).toBe('3.4');  // 3.2 in base 5 is exactly 3.4 in decimal
    expect(result.isPeriodic).toBe(false);
    expect(solution.getModus()).toBe('PowerToTen');
  });

  // Base 7 (Septenary) Tests
  test('Convert decimal to base-7: 42 (base 10) -> 60 (base 7)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('42', 10, 7);
    expect(solution.getResult().toString()).toBe('60');
    expect(solution.getModus()).toBe('TenToPower');
  });

  test('Convert base-7 to decimal: 60 (base 7) -> 42 (base 10)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('60', 7, 10);
    expect(solution.getResult().toString()).toBe('42');
    expect(solution.getModus()).toBe('PowerToTen');
  });

  test('Convert base-7 fraction: 6.3 (base 7) -> 6.428571... (base 10)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('6.3', 7, 10);
    
    // Check the result
    const result = solution.getResult();
    expect(result.toString()).toBe('6.(428571)');  // 6.3 in base 7 is periodic in decimal
    expect(result.isPeriodic).toBe(true);
    expect(solution.getModus()).toBe('PowerToTen');
  });

  // Direct Conversions Between Different Bases
  test('Convert base-3 to base-5: 22 (base 3) -> 13 (base 5)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('22', 3, 5);
    expect(solution.getResult().toString()).toBe('13');
    expect(solution.getModus()).toBe('PowerToPower');
  });

  test('Convert base-5 to base-7: 132 (base 5) -> 60 (base 7)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('132', 5, 7);
    expect(solution.getResult().toString()).toBe('60');
    expect(solution.getModus()).toBe('PowerToPower');
  });

  test('Convert base-7 to base-3: 60 (base 7) -> 1120 (base 3)', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('60', 7, 3);
    console.log("7 to 3", solution.getResult().toString());
    expect(solution.getResult().toString()).toBe('1120');
    expect(solution.getModus()).toBe('PowerToPower');
  });

  // Edge Cases
  test('Convert zero in different bases: 0 (base 10) -> base 3,5,7', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('0', 10, 3);
    expect(solution.getResult().toString().toString()).toBe('0');
    solution.convertFormat('0', 10, 5);
    expect(solution.getResult().toString()).toBe('0');
    solution.convertFormat('0', 10, 7);
    expect(solution.getResult().toString()).toBe('0');
  });

  test('Convert negative numbers in different bases: -42 (base 10) -> base 3,5,7', () => {
    const solution = new PolyadicSolution();
    solution.convertFormat('-42', 10, 3);
    expect(solution.getResult().toString()).toBe('-1120');
    solution.convertFormat('-42', 10, 5);
    expect(solution.getResult().toString()).toBe('-132');
    solution.convertFormat('-42', 10, 7);
    expect(solution.getResult().toString()).toBe('-60');
  });
});