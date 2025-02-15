import { PolyadicSolution } from '../src/scripts/polyadicSolution';
import { NumberPolyadic } from '../src/scripts/algorithms/arithmetic/polyadic/numberPolyadic';

describe('Polyadic Subtraction', () => {
  test('Subtract two positive integers: 42 - 13 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42');
    const n2 = new NumberPolyadic(10, '13');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('29');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Subtract negative from positive: 42 - (-13) (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42');
    const n2 = new NumberPolyadic(10, '-13');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('55');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Subtract positive from negative: (-42) - 13 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '-42');
    const n2 = new NumberPolyadic(10, '13');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('-55');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('-');
  });

  test('Subtract two negative numbers: (-42) - (-13) (base 10)', () => {
    const n1 = new NumberPolyadic(10, '-42');
    const n2 = new NumberPolyadic(10, '-13');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('-29');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('-');
  });

  test('Subtract numbers with decimals: 42.7 - 13.5 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42.7');
    const n2 = new NumberPolyadic(10, '13.5');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('29.2');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Subtract binary numbers: 101010 - 1101 (base 2)', () => {
    const n1 = new NumberPolyadic(2, '101010');  // 42 in decimal
    const n2 = new NumberPolyadic(2, '1101');    // 13 in decimal
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('11101');     // 29 in decimal
    expect(result.power).toBe(2);
    expect(result.sign).toBe('+');
  });

  test('Subtract hex numbers: 2A - D (base 16)', () => {
    const n1 = new NumberPolyadic(16, '2A');     // 42 in decimal
    const n2 = new NumberPolyadic(16, 'D');      // 13 in decimal
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('1D');        // 29 in decimal
    expect(result.power).toBe(16);
    expect(result.sign).toBe('+');
  });

  test('Subtract numbers in base-3: 1120 - 111 (base 3)', () => {
    const n1 = new NumberPolyadic(3, '1120');    // 42 in decimal
    const n2 = new NumberPolyadic(3, '111');     // 13 in decimal
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('1002');      // 29 in decimal
    expect(result.power).toBe(3);
    expect(result.sign).toBe('+');
  });

  test('Subtract with different powers should throw error', () => {
    const n1 = new NumberPolyadic(2, '101010');  // binary
    const n2 = new NumberPolyadic(16, 'D');      // hex
    const solution = new PolyadicSolution();
    
    expect(() => solution.subtract(n1, n2)).toThrow();
  });

  test('Subtract with borrow: 1000 - 1 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '1000');
    const n2 = new NumberPolyadic(10, '1');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('999');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Subtract with decimal borrow: 10.0 - 0.1 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '10.0');
    const n2 = new NumberPolyadic(10, '0.1');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('9.9');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Subtract with different decimal places: 42.5 - 13 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42.5');
    const n2 = new NumberPolyadic(10, '13');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('29.5');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Subtract with many decimal places: 42.1111111111 - 13.1111111111 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42.1111111111');
    const n2 = new NumberPolyadic(10, '13.1111111111');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('29');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Subtract larger from smaller: 13 - 42 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '13');
    const n2 = new NumberPolyadic(10, '42');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('-29');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('-');
  });

  test('Subtract with multiple borrows: 1000 - 1.1 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '1000');
    const n2 = new NumberPolyadic(10, '1.1');
    const solution = new PolyadicSolution();
    const result = solution.subtract(n1, n2);
    
    expect(result.toString()).toBe('998.9');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });
});