// Example use case to load exercise with handle 'ex2': http://localhost:8080/#/cmos?load=ex2

interface FPExercise {
  title: string;
  handle: string;
  data: {
    fp1: string;
    fp2: string;
    op: 'add' | 'div' | 'mul' | 'sub';
  };
}

// Add type for i18n
interface I18n {
  t: (key: string) => string;
}

function fpArchivedExecises(i18n: I18n): FPExercise[] {
  return [
    {
      title: `${i18n.t('complementExample')}`,
      handle: 'complementExample',
      data: {
        fp1: '0 01110 1100100000',
        fp2: '1 01001 1001010111',
        op: 'add',
      },
    },
    {
      title: `${i18n.t('shiftZero')}`,
      handle: 'shiftZero',
      data: {
        fp1: '0 10010 0101111100',
        fp2: '1 00010 0000100011',
        op: 'add',
      },
    },
    {
      title: `${i18n.t('doubleNegative')}`,
      handle: 'doubleNegative',
      data: {
        fp1: '1 01101 0111001010',
        fp2: '1 01100 0100000010',
        op: 'add',
      },
    },
    {
      title: `${i18n.t('simpleAddition')}`,
      handle: 'simpleAddition',
      data: {
        fp1: '0 01111 0000000000',
        fp2: '0 10000 0000000000',
        op: 'add',
      },
    },
    {
      title: `${i18n.t('negativeAddition')}`,
      handle: 'negativeAddition',
      data: {
        fp1: '1 01111 0000000000',
        fp2: '0 10000 0000000000',
        op: 'add',
      },
    },
    {
      title: `${i18n.t('zeroAddition')}`,
      handle: 'zeroAddition',
      data: {
        fp1: '0 01111 0000000000',
        fp2: '0 00000 0000000000',
        op: 'add',
      },
    },
    {
      title: `${i18n.t('infinityResult')}`,
      handle: 'infinityResult',
      data: {
        fp1: '0 10101 1001000000',
        fp2: '0 11110 1111111111',
        op: 'add',
      },
    },
    {
      title: `${i18n.t('oppositeNumbers')}`,
      handle: 'oppositeNumbers',
      data: {
        fp1: '1 10101 1001000000',
        fp2: '0 10101 1001000000',
        op: 'add',
      },
    },
    {
      title: `${i18n.t('nanResult')}`,
      handle: 'nanResult',
      data: {
        fp1: '0 10101 1001000000',
        fp2: '0 11111 1111111111',
        op: 'add',
      },
    },
    {
      title: `${i18n.t('simpleSubtraction')}`,
      handle: 'simpleSubtraction',
      data: {
        fp1: '0 10001 0100000000',
        fp2: '0 10000 0000000000',
        op: 'sub',
      },
    },
    {
      title: `${i18n.t('negativeResult')}`,
      handle: 'negativeResult',
      data: {
        fp1: '0 10001 0000000000',
        fp2: '0 10001 0100000000',
        op: 'sub',
      },
    },
    {
      title: `${i18n.t('doubleNegative')}`,
      handle: 'doubleNegative',
      data: {
        fp1: '1 01111 0000000000',
        fp2: '1 01111 0000000000',
        op: 'sub',
      },
    },
    {
      title: `${i18n.t('largeSubtraction')}`,
      handle: 'largeSubtraction',
      data: {
        fp1: '0 10010 1100000000',
        fp2: '0 10101 1110110000',
        op: 'sub',
      },
    },
    {
      title: `${i18n.t('infinitySubtraction')}`,
      handle: 'infinitySubtraction',
      data: {
        fp1: '0 11111 0000000000',
        fp2: '0 11111 0000000000',
        op: 'sub',
      },
    },
    {
      title: `${i18n.t('nanSubtraction')}`,
      handle: 'nanSubtraction',
      data: {
        fp1: '0 10101 1001000000',
        fp2: '0 11111 1111111111',
        op: 'sub',
      },
    },
    {
      title: `${i18n.t('simpleMultiplication')}`,
      handle: 'simpleMultiplication',
      data: {
        fp1: '0 10001 0100000000',
        fp2: '0 10000 0000000000',
        op: 'mul',
      },
    },
    {
      title: `${i18n.t('negativeMultiplication')}`,
      handle: 'negativeMultiplication',
      data: {
        fp1: '1 10001 0100000000',
        fp2: '0 10000 0000000000',
        op: 'mul',
      },
    },
    {
      title: `${i18n.t('doubleNegativeMultiplication')}`,
      handle: 'doubleNegativeMultiplication',
      data: {
        fp1: '1 01111 0000000000',
        fp2: '1 01111 0000000000',
        op: 'mul',
      },
    },
    {
      title: `${i18n.t('fractionMultiplication')}`,
      handle: 'fractionMultiplication',
      data: {
        fp1: '0 01110 1001100110',
        fp2: '0 01111 1001100110',
        op: 'mul',
      },
    },
    {
      title: `${i18n.t('infinityMultiplication')}`,
      handle: 'infinityMultiplication',
      data: {
        fp1: '0 10000 0000000000',
        fp2: '0 11110 1111111111',
        op: 'mul',
      },
    },
    {
      title: `${i18n.t('zeroMultiplication')}`,
      handle: 'zeroMultiplication',
      data: {
        fp1: '0 10101 1001000000',
        fp2: '0 00000 0000000000',
        op: 'mul',
      },
    },
    {
      title: `${i18n.t('nanMultiplication')}`,
      handle: 'nanMultiplication',
      data: {
        fp1: '0 10101 1001000000',
        fp2: '1 11111 1111111111',
        op: 'mul',
      },
    },
    {
      title: `${i18n.t('denormalized')}`,
      handle: 'denormalized',
      data: {
        fp1: '1 00110 0010101010',
        fp2: '1 11011 0011111100',
        op: 'div',
      },
    },
    {
      title: `${i18n.t('simpleDivision')}`,
      handle: 'simpleDivision',
      data: {
        fp1: '0 10001 0100000000',
        fp2: '0 10000 0000000000',
        op: 'div',
      },
    },
    {
      title: `${i18n.t('divisionByZero')}`,
      handle: 'divisionByZero',
      data: {
        fp1: '0 01111 0000000000',
        fp2: '0 00000 0000000000',
        op: 'div',
      },
    },
    {
      title: `${i18n.t('zeroByZero')}`,
      handle: 'zeroByZero',
      data: {
        fp1: '0 00000 0000000000',
        fp2: '0 00000 0000000000',
        op: 'div',
      },
    },
    {
      title: `${i18n.t('divisionByInfinity')}`,
      handle: 'divisionByInfinity',
      data: {
        fp1: '0 01110 0000000000',
        fp2: '0 11111 0000000000',
        op: 'div',
      },
    },
    {
      title: `${i18n.t('infinityDivision')}`,
      handle: 'infinityDivision',
      data: {
        fp1: '0 11111 0000000000',
        fp2: '0 11111 0000000000',
        op: 'div',
      },
    },
    {
      title: `${i18n.t('recurringDivision')}`,
      handle: 'recurringDivision',
      data: {
        fp1: '0 01111 000000000',
        fp2: '0 10000 100000000',
        op: 'div',
      },
    },
    {
      title: `${i18n.t('denormalDivision')}`,
      handle: 'denormalDivision',
      data: {
        fp1: '0 00000 0000000010',
        fp2: '0 00000 0000000001',
        op: 'div',
      },
    },
  ];
}

/**
 * @param i18n $i18n-translation object
 * @returns {[string]}
 */
export function fpGetArchivedExerciseTitles(i18n: I18n): string[] {
  return fpArchivedExecises(i18n).map((ae) => ae.title);
}

/**
 * @param i18n $i18n-translation object
 * @param {number} index
 * @returns {{title: string, handle: string, data: {}}}
 */
export function fpLoadArchivedExercise(i18n: I18n, index: number): FPExercise {
  return fpArchivedExecises(i18n)[index];
}

/**
 * @param i18n $i18n-translation object
 * @param {string} handle String used to identify the exercise in the load=X query
 * @returns {number} Index in the exercise array. Can be used with xxLoadArchivedExercise to retrieve the exercise data
 */
export function fpGetExerciseIndexOfHandle(i18n: I18n, handle: string): number {
  const exercises = fpArchivedExecises(i18n);
  for (let i = 0; i < exercises.length; i += 1) {
    if (exercises[i].handle === handle) {
      return i;
    }
  }
  return -1;
}
