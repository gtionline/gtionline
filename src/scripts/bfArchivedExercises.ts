import { KVDiagram } from './algorithms/booleanFunctions/KVDiagram';

// Add interface for exercise structure
interface Exercise {
  title: string;
  handle: string;
  data: KVDiagram;
}

// Add type for i18n parameter
interface I18n {
  t: (key: string) => string;
}

// Example use case to load exercise with handle 'ex2': http://localhost:8080/#/cmos?load=ex2
// Note: The exercises are declared in a function,
// to allow for automatic retranslation thru vue upon
// switches display languages.
function bfArchivedExecises(i18n: I18n): Exercise[] {
  const sheetStr = i18n.t('sheet');
  return [
    {
      title: `${sheetStr} 5: 1a) i)`,
      handle: '5-1ai',
      data: new KVDiagram([
        ['0', '1'],
        ['1', '0'],
      ], 2),
    },
    {
      title: `${sheetStr} 5: 1a) ii)`,
      handle: '5-1aii',
      data: new KVDiagram([
        ['0', '0', '1', '0'],
        ['0', '0', '1', '1'],
      ], 3),
    },
    {
      title: `${sheetStr} 5: 1a) iii)`,
      handle: '5-1aiii',
      data: new KVDiagram([
        ['0', '0', '0', '0'],
        ['1', '1', '0', '0'],
      ], 3),
    },
    {
      title: `${sheetStr} 5: 1c)`,
      handle: '5-1c',
      data: new KVDiagram([
        ['1', '0', '1', '0'],
        ['0', '1', '0', '1'],
        ['1', '0', '1', '0'],
        ['0', '1', '0', '1'],
      ], 4),
    },
    {
      title: `${sheetStr} 5: 1d)`,
      handle: '5-1d',
      data: new KVDiagram([
        ['1', '0', '0', '1'],
        ['0', '1', '1', '0'],
        ['0', '1', '1', '0'],
        ['1', '0', '0', '1'],
      ], 4),
    },
    {
      title: `${sheetStr} 6: 2a) i)`,
      handle: '6-2ai',
      data: new KVDiagram([
        ['0', '0', '1', '1'],
        ['1', '0', '1', '1'],
      ], 3),
    },
    {
      title: `${sheetStr} 6: 2a) ii)`,
      handle: '6-2aii',
      data: new KVDiagram([
        ['0', '1', '0', '1'],
        ['0', '1', '1', '0'],
      ], 3),
    },
    {
      title: `${sheetStr} 7: 1b)`,
      handle: '7-1b',
      data: new KVDiagram([
        ['-', '0', '1', '0', '0', '1', '0', '-'],
        ['0', '1', '1', '0', '0', '1', '1', '0'],
        ['1', '1', '1', '-', '1', '1', '1', '1'],
        ['-', '1', '1', '0', '0', '1', '1', '1'],
      ], 5),
    },
    {
      title: `${sheetStr} 8: 1a)`,
      handle: '8-1a',
      data: new KVDiagram([
        ['0', '0', '1', '0'],
        ['1', '1', '1', '1'],
        ['1', '1', '1', '1'],
        ['1', '1', '1', '1'],
      ], 4),
    },
    {
      title: `${sheetStr} 8: 1b)`,
      handle: '8-1b',
      data: new KVDiagram([
        ['0', '0', '1', '0'],
        ['1', '1', '1', '0'],
        ['1', '1', '1', '1'],
        ['1', '1', '0', '1'],
      ], 4),
    },
    {
      // title: bfTableWithCyclicRestStr,
      // title: '`$t(\'bf_tableWithCyclicRest\')`',
      title: i18n.t('bf_tableWithCyclicRest'),
      handle: 'tableWithCyclicRest',
      data: new KVDiagram([
        ['1', '0', '0', '1'],
        ['1', '-', '-', '0'],
        ['1', '-', '-', '1'],
        ['0', '1', '0', '1'],
      ], 4),
    },
    // {
    //   // Blatt 8: 2) scheint keine gültige Überdeckungstabelle zu sein,
    //   // denn eigentlich müsste abd auch die Einsstelle 11 abdecken
    //   title: 'Blatt 8: 2)',
    //   data: new KVDiagram([ -siehe Kommentar-
    //     ['-', '0', '0', '0', '0', '0', '0', '-'],
    //     ['1', '-', '-', '0', '0', '0', '0', '-'],
    //     ['1', '1', '-', '-', '0', '1', '-', '1'],
    //     ['1', '-', '-', '-', '0', '1', '0', '-'],
    //   ], 5),
    // },
  ];
}

/**
 * @param i18n $i18n-translation object
 * @returns {[string]}
 */
export function bfGetArchivedExerciseTitles(i18n: I18n): string[] {
  return bfArchivedExecises(i18n).map((ae) => ae.title);
}

/**
 * @param i18n $i18n-translation object
 * @param {number} index
 * @returns {{title: string, handle: string, data: KVDiagram}}
 */
export function bfLoadArchivedExercise(i18n: I18n, index: number): Exercise {
  return bfArchivedExecises(i18n)[index];
}

/**
 * @param i18n $i18n-translation object
 * @param {string} handle String used to identify the exercise in the load=X query
 * @returns {number} Index in the exercise array. Can be used with xxLoadArchivedExercise
 * to retrieve the exercise data
 */
export function bfGetExerciseIndexOfHandle(i18n: I18n, handle: string): number {
  const exercises = bfArchivedExecises(i18n);
  for (let i = 0; i < exercises.length; i += 1) {
    if (exercises[i].handle === handle) {
      return i;
    }
  }
  return -1;
}
