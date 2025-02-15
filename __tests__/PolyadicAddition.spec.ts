import { PolyadicSolution } from '../src/scripts/polyadicSolution';
import { NumberPolyadic } from '../src/scripts/algorithms/arithmetic/polyadic/numberPolyadic';

describe('Polyadic Addition', () => {
  test('Add two positive integers: 42 + 13 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42');
    const n2 = new NumberPolyadic(10, '13');
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('55');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Add positive and negative: 42 + (-13) (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42');
    const n2 = new NumberPolyadic(10, '-13');
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('29');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Add negative and positive: (-42) + 13 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '-42');
    const n2 = new NumberPolyadic(10, '13');
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('-29');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('-');
  });

  test('Add two negative numbers: (-42) + (-13) (base 10)', () => {
    const n1 = new NumberPolyadic(10, '-42');
    const n2 = new NumberPolyadic(10, '-13');
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('-55');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('-');
  });

  test('Add numbers with decimals: 42.5 + 13.7 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42.5');
    const n2 = new NumberPolyadic(10, '13.7');
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('56.2');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Add binary numbers: 101010 + 1101 (base 2)', () => {
    const n1 = new NumberPolyadic(2, '101010');  // 42 in decimal
    const n2 = new NumberPolyadic(2, '1101');    // 13 in decimal
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('110111');    // 55 in decimal
    expect(result.power).toBe(2);
    expect(result.sign).toBe('+');
  });

  test('Add hex numbers: 2A + D (base 16)', () => {
    const n1 = new NumberPolyadic(16, '2A');     // 42 in decimal
    const n2 = new NumberPolyadic(16, 'D');      // 13 in decimal
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('37');        // 55 in decimal
    expect(result.power).toBe(16);
    expect(result.sign).toBe('+');
  });

  test('Add numbers in base-3: 1120 + 111 (base 3)', () => {
    const n1 = new NumberPolyadic(3, '1120');    // 42 in decimal
    const n2 = new NumberPolyadic(3, '111');     // 13 in decimal
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('2001');      // 55 in decimal
    expect(result.power).toBe(3);
    expect(result.sign).toBe('+');
  });

  test('Add with different powers should throw error', () => {
    const n1 = new NumberPolyadic(2, '101010');  // binary
    const n2 = new NumberPolyadic(16, 'D');      // hex
    const solution = new PolyadicSolution();
    
    expect(() => solution.add(n1, n2)).toThrow();
  });

  test('Add with carry propagation: 999 + 1 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '999');
    const n2 = new NumberPolyadic(10, '1');
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('1000');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Add with decimal carry: 9.9 + 0.1 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '9.9');
    const n2 = new NumberPolyadic(10, '0.1');
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('10');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Add with different decimal places: 42.5 + 13 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42.5');
    const n2 = new NumberPolyadic(10, '13');
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('55.5');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });

  test('Add with different decimal places: 42.1111111111 + 13.1111111111 (base 10)', () => {
    const n1 = new NumberPolyadic(10, '42.1111111111');
    const n2 = new NumberPolyadic(10, '13.1111111111');
    const solution = new PolyadicSolution();
    const result = solution.add(n1, n2);
    
    expect(result.toString()).toBe('55.2222222222');
    expect(result.power).toBe(10);
    expect(result.sign).toBe('+');
  });
});