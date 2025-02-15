import { parseBooleanFunction } from './boolean/index';
import { HORIZONTALALIGNMENT, VERTICALALIGNMENT } from './boolean/cmos_visuals/CMOSVisualInfo';
import { TEMPLATES } from './boolean/cmos_visuals/Templates';

import { CMOSBuilder } from './boolean/cmos/CMOSBuilder';
import { CMOSVisualBuilder } from './boolean/cmos_visuals/CMOSVisualBuilder';
import { LatexGenerator } from './boolean/cmos_visuals/LatexGenerator';
import { SVGGenerator } from './boolean/cmos_visuals/SVGGenerator';

import { toLaTeX } from './boolean/expression/tolatex';

const helpString = [
  'USAGE:',
  '\tnode generateCMOS [-options] expression',
  'OPTIONS:',
  '\t-template=<TEMPLATE>',
  '\t\tSets the template used for generating the CMOS-Network.',
  '\t\tSupported Values:',
  '\t\t\t"default": Default Template',
  '\t\t\t"tunneling": Template in which everything is tunneled.',
  '',
  '\t\tDefault Value: "default"',
  '',
  '\t-type=<TYPE>',
  '\t\tSets the type of code which will be generated.',
  '\t\tSupported Values:',
  '\t\t\t"latex": Latex Code',
  '\t\t\t"svg": SVG-Code.',
  '',
  '\t\tDefault Value: "latex"',
  '',
  '\t-scale=<NUMBER>',
  '\t\tSets the scale.',
  '\t\tSupported Values: N > 0',
  '',
  '\t\tDefault Value: "0.5" if type=="latex"; "30" if type=="svg"',
  '',
  '\t-help=<BOOL>',
  '\t\tDisplays this message',
  '',
  '\t\tDefault Value: "false"',
  '',

  '\t-alignmentHorizontal=<VERTICALALIGNMENT>',
  '\t\tSets the horizontal alignment of transistors.',
  '\t\tSupported Values:',
  '\t\t\t"left": Left Alignment',
  '\t\t\t"center": Middle Alignment',
  '\t\t\t"right": Right Alignment',
  '',

  '\t-alignmentVertical=<HORIZONTALALIGNMENT>',
  '\t\tSets the vertical alignment of transistors.',
  '\t\tSupported Values:',
  '\t\t\t"top": Top Alignment',
  '\t\t\t"center": Center Alignment',
  '\t\t\t"bottom": Bottom Alignment',
  '',

  '\t-connectionPointAlignment=<VERTICALALIGNMENT>',
  '\t\tSets the alignment of connectionPoints.',
  '\t\tSupported Values:',
  '\t\t\t"left": Left Alignment',
  '\t\t\t"center": Middle Alignment',
  '\t\t\t"right": Right Alignment',
  '',

  '\t-offsetX=<NUMBER>',
  '\t\tSets the offset in x direction of the network.',
  '',

  '\t-offsetY=<NUMBER>',
  '\t\tSets the offset in y direction of the network.',
  '',

  '\t-transistorWidth=<NUMBER>',
  '\t\tSets the width of a transistor.',
  '\t\tSupported Values: N > 0',
  '',

  '\t-transistorHeight=<NUMBER>',
  '\t\tSets the height of a transistor.',
  '\t\tSupported Values: N > 0',
  '',

  '\t-transistorPadLeft=<NUMBER>',
  '\t\tSets the left padding of a transistor.',
  '',
  '\t-transistorPadRight=<NUMBER>',
  '\t\tSets the right padding of a transistor.',
  '',
  '\t-transistorPadTop=<NUMBER>',
  '\t\tSets the top padding of a transistor.',
  '',
  '\t-transistorPadBot=<NUMBER>',
  '\t\tSets the bottom padding of a transistor.',
  '',

  '\t-parallelElementChannelOffset=<NUMBER>',
  '\t\tSets the space between channels and the end of a parallel element.',
  '\t\tSupported Values: N >= 0',
  '',

  '\t-expressionTunnelWireLength=<NUMBER>',
  '\t\tSets the length of an expressionTunnel.',
  '\t\tSupported Values: N >= 0',
  '',

  '\t-charWidth=<NUMBER>',
  '\t\tSets the space allocated for one char of the latex code for a label.',
  '\t\tSupported Values: N > 0',
  '',

  '\t-channelWidth=<NUMBER>',
  '\t\tSets the width of the channels.',
  '\t\tSupported Values: N >= 0',
  '',

  '\t-useOnlyNeededChannels=<BOOL>',
  '\t\tDetermines if only channels which connect to an element shall be allocated.',
  '',
  '\t-tunnelLiterals=<BOOL>',
  '\t\tDetermines if literalWires will be tunneled.',
  '',
  '\t-tunnelVariables=<BOOL>',
  '\t\tDetermines if variableWires will be tunneled.',
  '',
  '\t-tunnelExpressions=<BOOL>',
  '\t\tDetermines if expressionWires will be tunneled.',
  '',
  '\t-enableConnectionLineJoints=<BOOL>',
  '\t\tDetermines if line-joints will be drawn for connectionWires.',
  '',

  '\t-equalizePullUpPullDown=<BOOL>',
  '\t\tDetermines if the height of the PullUp- and PullDown-Network of an expression will be equalized.',
  '',
  '\t-channelSymmetry=<BOOL>',
  '\t\tDetermines if channels will be allocated in a symmetrical fashion.',
  '',
  '\t-adjustLeftPad=<BOOL>',
  '\t\tDetermines if the same leftPad will be used in the first transistorrow of an expression.',
  '',
  '\t-singleRows=<BOOL>',
  '\t\tDetermines if every expression should receive its own row.',
  '',

].join('\n');

const defaultOptions = {
  expression: null,
  type: 'latex',
  scale: null,
  template: 'default',
  help: false,
  overRideOptions: {},
};

const templates = ['default', 'tunneling'];
const types = ['latex', 'svg'];

const validHorizontalAlignments = ['left', 'center', 'right'];
const validVerticalAlignments = ['top', 'center', 'bottom'];

const booleans = ['true', 'false', '1', '0'];
const booleansTrues = ['true', '1'];

function checkIfNumber(str) {
  let points = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (i === 0 && str[i] === '-') continue;
    if (str[i] === '.') points += 1;
    else if (str[i] < '0' || str[i] > '9') return false;
  }
  return points <= 1;
}

const validOptions = {
  template: [() => true, (arg) => arg, (arg) => templates.includes(arg)],
  help: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg), () => true],
  type: [() => true, (arg) => arg, (arg) => types.includes(arg)],
  scale: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), (arg) => arg > 0],

  alignmentHorizontal: [(arg) => validHorizontalAlignments.includes(arg),
    (arg) => HORIZONTALALIGNMENT[arg.toUpperCase()],
    () => true],
  alignmentVertical: [(arg) => validVerticalAlignments.includes(arg),
    (arg) => VERTICALALIGNMENT[arg.toUpperCase()],
    () => true],

  connectionPointAlignment: [(arg) => validHorizontalAlignments.includes(arg),
    (arg) => HORIZONTALALIGNMENT[arg.toUpperCase()], () => true],

  offsetX: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), () => true],
  offsetY: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), () => true],

  transistorWidth: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), (arg) => arg > 0],
  transistorHeight: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), (arg) => arg > 0],
  transistorPadLeft: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), () => true],
  transistorPadRight: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), () => true],
  transistorPadTop: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), () => true],
  transistorPadBot: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), () => true],

  parallelElementChannelOffset: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg),
    (arg) => arg >= 0],
  expressionTunnelWireLength: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), (arg) => arg >= 0],
  charWidth: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), (arg) => arg > 0],

  channelWidth: [(arg) => checkIfNumber(arg), (arg) => parseFloat(arg), (arg) => arg >= 0],
  useOnlyNeededChannels: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg),
    () => true],
  tunnelLiterals: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg), () => true],
  tunnelVariables: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg), () => true],
  tunnelExpressions: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg),
    () => true],
  enableConnectionLineJoints: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg),
    () => true],

  equalizePullUpPullDown: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg),
    () => true],
  channelSymmetry: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg), () => true],
  adjustLeftPad: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg), () => true],
  singleRows: [(arg) => booleans.includes(arg), (arg) => booleansTrues.includes(arg), () => true],
};

export class CMOSCommandParser {
  constructor(args) {
    const parseOptions = this._parseArguments(args);
    this.result = this._executeCommand(parseOptions);
  }

  _parseArguments(args) {
    if (args.length === 0) {
      throw Error('CMOSCommandParser._parseArguments(args): No arguments found');
    }

    const parseOptions = defaultOptions;

    let expressionFound = false;

    for (let i = 0; i < args.length; i += 1) {
      let option = args[i];
      if (option[0] !== '-') {
        if (!expressionFound) {
          parseOptions.expression = args[i];
          expressionFound = true;
          continue;
        } else {
          throw Error(`CMOSCommandParser._parseArguments(args): Multiple Expressions found: ${option}`);
        }
      }
      if (this._count(option, '=') !== 1) {
        if (this._count(option, '=') === 0) {
          option = [option.slice(1), 'true'];
        } else {
          throw Error(`CMOSCommandParser._parseArguments(args): Option does not contain one or zero '=': ${option}`);
        }
      } else {
        option = option.split('=');
        option[0] = option[0].slice(1);
        option[1] = option[1].toLowerCase();
      }

      if (!Object.prototype.hasOwnProperty.call(validOptions, option[0])) {
        throw Error(`CMOSCommandParser._parseArguments(args): Option not found: ${args[i]}`);
      }
      if (!validOptions[option[0]][0](option[1])) {
        throw Error(`CMOSCommandParser._parseArguments(args): Option is not valid: ${args[i]}`);
      }
      option[1] = validOptions[option[0]][1](option[1]);
      if (!validOptions[option[0]][2](option[1])) {
        throw Error(`CMOSCommandParser._parseArguments(args): Option is not valid: ${args[i]}`);
      }

      if (Object.prototype.hasOwnProperty.call(parseOptions, option[0])) {
        parseOptions[option[0]] = option[1];
      } else {
        parseOptions.overRideOptions[option[0]] = option[1];
      }
    }

    return parseOptions;
  }

  _executeCommand(parseOptions) {
    if (parseOptions.help) {
      return helpString;
    }

    if (parseOptions.expression == null) {
      throw Error('CMOSCommandParser._executeCommand(parseOptions): No expression found.');
    }

    const options = this._setDefaults(
      parseOptions.overRideOptions,
      TEMPLATES[parseOptions.template],
    );

    let codeGenerator; let code;

    const expression = parseBooleanFunction(parseOptions.expression);

    const mosBuilder = new CMOSBuilder();
    const cmos = mosBuilder.buildCMOS(expression);

    const visBuilder = new CMOSVisualBuilder();
    const cmosvisual = visBuilder.buildHull(cmos, options);

    if (parseOptions.type === 'latex') {
      codeGenerator = new LatexGenerator();
      const scale = parseOptions.scale == null ? 0.5 : parseOptions.scale;
      code = codeGenerator.buildLatex(cmosvisual, toLaTeX, scale);
    } else if (parseOptions.type === 'svg') {
      codeGenerator = new SVGGenerator();
      const scale = parseOptions.scale == null ? 30 : parseOptions.scale;
      code = codeGenerator.buildSVG(cmosvisual, toLaTeX, scale);
    }

    return code;
  }

  _count(str, char) {
    let sum = 0;
    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === char) sum += 1;
    }
    return sum;
  }

  _setDefaults(options, defaults) {
    return { ...defaults, ...options };
  }

  getResult() {
    return this.result;
  }
}
