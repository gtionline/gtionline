function leftPad(strIn, width) {
  let str = strIn;
  while (str.length < width) {
    str = ` ${str}`;
  }
  return str;
}

export class BaseNMultiplicationToText {
  constructor(algorithm) {
    this.result = this._translate(algorithm);
  }

  _translate(algorithm) {
    let widthNeeded = 0;
    const recording = [];

    let step = algorithm.start;

    while (step != null) {
      if (step.name === 'Inital') {
        widthNeeded = step.data.num1.length + step.data.num2.length + 3;
      } else if (step.name === 'Result') {
        widthNeeded = Math.max(widthNeeded, step.data.total.length);
      } else {
        widthNeeded = Math.max(widthNeeded, step.data.toAdd.length);
        widthNeeded = Math.max(widthNeeded, step.data.total.length);
      }
      step = step.next;
    }

    widthNeeded += 1;
    step = algorithm.start;

    const line = '-'.repeat(widthNeeded);

    while (step != null) {
      if (step.name === 'Inital') {
        const str = leftPad(`${step.data.num1} * ${step.data.num2}`, widthNeeded);

        recording.push(str);
      } else if (step.name === 'Result') {
        const str = leftPad(`${step.data.total}`, widthNeeded);
        recording.push(line);
        recording.push(str);
      } else {
        const str1 = leftPad(`${step.data.total}`, widthNeeded);
        const str2 = leftPad(`+${step.data.toAdd}`, widthNeeded);

        recording.push(line);
        recording.push(str1);
        recording.push(str2);
      }
      step = step.next;
    }

    return recording.join('\n');
  }

  getResult() {
    return this.result;
  }
}
