// Example use case to load exercise with handle 'ex2': http://localhost:8080/#/cmos?load=ex2
// Note: The exercises are declared in a function,
// to allow for automatic retranslation thru vue upon
// switches display languages.
function cmosArchivedExecises(i18n) {
  const sheetStr = i18n.t('sheet');
  return [
    {
      title: `${i18n.t('example')} 1`,
      handle: 'ex1',
      data: '(~a+c)*~(~b+c*~a)',
    },
    {
      title: `${i18n.t('example')} 2`,
      handle: 'ex2',
      data: '(~x+~r*~(~n+a))*(n+r)',
    },
    {
      title: `${i18n.t('wintersemester')}: ${sheetStr} 9 A1b`,
      handle: 'ws-9a1b',
      data: 'x0*~x1*(~x2+~x3)',
    },
    {
      title: `${i18n.t('sommersemester')}: ${sheetStr} 6 A3`,
      handle: 'ss-6a3',
      data: '~(~a*b+a*~b)',
    },
  ];
}

/**
 * @param i18n $i18n-translation object
 * @returns {[string]}
 */
export function cmosGetArchivedExerciseTitles(i18n) {
  return cmosArchivedExecises(i18n).map((ae) => ae.title);
}

/**
 * @param i18n $i18n-translation object
 * @param {number} index
 * @returns {{title: string, handle: string, data: string}}
 */
export function cmosLoadArchivedExercise(i18n, index) {
  return cmosArchivedExecises(i18n)[index];
}

/**
 * @param i18n $i18n-translation object
 * @param {string} handle String used to identify the exercise in the load=X query
 * @returns {number} Index in the exercise array. Can be used with xxLoadArchivedExercise to retrieve the exercise data
 */
export function cmosGetExerciseIndexOfHandle(i18n, handle) {
  const exercises = cmosArchivedExecises(i18n);
  for (let i = 0; i < exercises.length; i += 1) {
    if (exercises[i].handle === handle) {
      return i;
    }
  }
  return -1;
}
