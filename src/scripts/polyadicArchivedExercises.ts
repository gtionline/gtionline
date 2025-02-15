interface PolyadicExercise {
  title: string;
  handle: string;
  data: {
    inputNum: string;
    fromFormat: string;
    toFormat: string;
  };
}

interface I18n {
  t: (key: string) => string;
}

function polyadicArchivedExercises(i18n: I18n): PolyadicExercise[] {
  return [
    {
        title: `WS Aufgabe 4 a1)`,
        handle: 'WS4a1',
        data: {
          inputNum: 'A03',
          fromFormat: 'hex',
          toFormat: 'binary'
        }
    },
    {
        title: `WS Aufgabe 4 a2)`,
        handle: 'WS4a2',
        data: {
          inputNum: 'A03',
          fromFormat: 'hex',
          toFormat: 'ternary'
        }
    },
    {
        title: `WS Aufgabe 4 b1)`,
        handle: 'WS4b1',
        data: {
          inputNum: '11100111',
          fromFormat: 'binary',
          toFormat: 'octal'
        }
    },
    {
        title: `WS Aufgabe 4 b2)`,
        handle: 'WS4b2',
        data: {
          inputNum: '11100111',
          fromFormat: 'binary',
          toFormat: 'ternary'
        }
    },
    {
        title: `WS Aufgabe 4 c)`,
        handle: 'WS4c',
        data: {
          inputNum: '234.28125',
          fromFormat: 'decimal',
          toFormat: 'binary'
        }
    },
    {
      title: `${i18n.t('decimalToBinary')}`,
      handle: 'decimalToBinary',
      data: {
        inputNum: '42',
        fromFormat: 'decimal',
        toFormat: 'binary'
      }
    },
    {
      title: `${i18n.t('binaryToHex')}`,
      handle: 'binaryToHex',
      data: {
        inputNum: '1010.11',
        fromFormat: 'binary',
        toFormat: 'hex'
      }
    },
    {
      title: `${i18n.t('hexToDecimal')}`,
      handle: 'hexToDecimal',
      data: {
        inputNum: 'FF.8',
        fromFormat: 'hex',
        toFormat: 'decimal'
      }
    },
    {
      title: `${i18n.t('negativeConversion')}`,
      handle: 'negativeConversion',
      data: {
        inputNum: '-42.5',
        fromFormat: 'decimal',
        toFormat: 'binary'
      }
    }
  ];
}

export function polyadicGetArchivedExerciseTitles(i18n: I18n): string[] {
  return polyadicArchivedExercises(i18n).map((ae) => ae.title);
}

export function polyadicLoadArchivedExercise(i18n: I18n, index: number): PolyadicExercise {
  return polyadicArchivedExercises(i18n)[index];
}

export function polyadicGetExerciseIndexOfHandle(i18n: I18n, handle: string): number {
  const exercises = polyadicArchivedExercises(i18n);
  for (let i = 0; i < exercises.length; i += 1) {
    if (exercises[i].handle === handle) {
      return i;
    }
  }
  return -1;
} 