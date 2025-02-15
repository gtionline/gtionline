import { HORIZONTALALIGNMENT, VERTICALALIGNMENT } from './CMOSVisualInfo';

const DEFAULT_TEMPLATE = {
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

  channelWidth: 0.5,
  useOnlyNeededChannels: true,
  tunnelLiterals: true,
  tunnelVariables: true,
  tunnelExpressions: false,
  enableConnectionLineJoints: false,

  equalizePullUpPullDown: false,
  channelSymmetry: false,
  adjustLeftPad: true,
  singleRows: true,
};

const TUNNELING_TEMPLATE = {
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

export const TEMPLATES = {
  default: DEFAULT_TEMPLATE,
  tunneling: TUNNELING_TEMPLATE,
};
