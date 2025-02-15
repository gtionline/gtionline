/**
 * roundArray rounds an array to a given length
 * @param inArr Array to round, can also be a string
 * @param count necessary length
 * @param roundup true if the array has to be up rounded
 * @param base base of given array
 * @returns rounded array in the given base or string
 */
export function roundArray(
  arr: number[], 
  count: number, 
  roundup: boolean = false, 
  base: number = 2
): number[] {
  if (arr.length < count) {
    return arr;
  }

  let toRound = roundup;
  if (!toRound) {
    toRound = arr[count] >= (base / 2);
  }

  while (arr.length > count) {
    arr.pop();
  }

  if (toRound) {
    const carryBits: number[] = [];
    const final: number[] = [];
    carryBits.unshift(1);

    for (let i = arr.length - 1; i >= 0; i -= 1) {
      const m = arr[i] + carryBits[0];
      final.unshift(m % base);
      carryBits.unshift(Math.floor(m / base));
    }

    if (carryBits[0] !== carryBits[1]) {
      final.unshift(1);
      final.pop();
    }

    return final;
  }
  return arr;
}
