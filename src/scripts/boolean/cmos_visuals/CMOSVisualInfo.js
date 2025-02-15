export const HORIZONTALALIGNMENT = {
  LEFT: 'horizontal_left',
  CENTER: 'horizontal_center',
  RIGHT: 'horizontal_right',
};

export const VERTICALALIGNMENT = {
  TOP: 'vertical_top',
  CENTER: 'vertical_center',
  BOTTOM: 'vertical_bottom',
};

export const DEFAULT_OPTIONS = {
  alignmentHorizontal: HORIZONTALALIGNMENT.LEFT,
  alignmentVertical: VERTICALALIGNMENT.CENTER,

  connectionPointAlignment: HORIZONTALALIGNMENT.LEFT,

  offsetX: 0,
  offsetY: 0,

  transistorWidth: 0.75,
  transistorHeight: 1,
  transistorPadLeft: 1.5,
  transistorPadRight: 0.5,
  transistorPadTop: 0.25,
  transistorPadBot: 0.25,

  parallelElementChannelOffset: 0.25,
  expressionTunnelWireLength: 0.5,
  charWidth: 0.2,

  channelWidth: 0,
  useOnlyNeededChannels: true,
  tunnelLiterals: true,
  tunnelVariables: true,
  tunnelExpressions: true,
  enableConnectionLineJoints: false,

  equalizePullUpPullDown: false,
  channelSymmetry: false,
  adjustLeftPad: true,
  singleRows: true,
};

export class CMOSVisualInfo {
  // Glorified info object
  constructor(cmos, options) {
    // Layout
    this.alignmentHorizontal = options.alignmentHorizontal;
    this.alignmentVertical = options.alignmentVertical;
    this.connectionPointAlignment = options.connectionPointAlignment;
    this.offsetX = options.offsetX;
    this.offsetY = options.offsetY;

    // TransistorsLayout
    this.transistorWidth = options.transistorWidth;
    this.transistorHeight = options.transistorHeight;

    this.transistorPadLeft = options.transistorPadLeft;
    this.transistorPadRight = options.transistorPadRight;
    this.transistorPadTop = options.transistorPadTop;
    this.transistorPadBot = options.transistorPadBot;

    this.parallelElementChannelOffset = options.parallelElementChannelOffset;
    this.expressionTunnelWireLength = options.expressionTunnelWireLength;
    this.charWidth = options.charWidth;

    // Channels:
    this.channelWidth = options.channelWidth;
    this.useOnlyNeededChannels = options.useOnlyNeededChannels;
    this.tunnelLiterals = options.tunnelLiterals;
    this.tunnelVariables = options.tunnelVariables;
    this.tunnelExpressions = options.tunnelExpressions;
    this.enableConnectionLineJoints = options.enableConnectionLineJoints;

    // Extra options
    this.equalizePullUpPullDown = options.equalizePullUpPullDown;
    this.channelSymmetry = options.channelSymmetry;
    this.adjustLeftPad = options.adjustLeftPad;
    this.singleRows = options.singleRows;

    // ChannelTable
    this.channelNum = 0;
    this.channelTable = {};
    let id = 0;

    if (!this.tunnelLiterals) {
      for (const literal of cmos.literals) {
        this.channelTable[literal.name] = id;
        id += 1;
      }
    }

    if (!this.tunnelVariables) {
      for (const variable of cmos.variables) {
        this.channelTable[variable.name] = id;
        id += 1;
      }
    }

    if (!this.tunnelExpressions) {
      for (let i = 0; i < cmos.expressions.length - 1; i += 1) {
        this.channelTable[cmos.expressions[i].name] = id;
        id += 1;
      }
    }

    this.channelNum = id;
  }

  getChannelId(object) {
    if (Object.prototype.hasOwnProperty.call(this.channelTable, object.name)) {
      return this.channelTable[object.name];
    }

    return null;
  }
}
