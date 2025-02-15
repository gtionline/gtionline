import { CMOSTransistorType } from '../cmos/CMOSTransistor';

import {
  WireBendNode, WireConnectionNode,
} from './WireNode';

export class SVGGenerator {
  getTransistorSVG(hull, transistor, scale) {
    const transistorBaseBegin = {
      x: transistor.x + transistor.width - hull.info.transistorPadRight,
      y: transistor.y,
    };

    const transistorBase = [`<path fill="none" stroke="black" d="M ${transistorBaseBegin.x * scale} ${transistorBaseBegin.y * scale}`,
      `V ${(transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.3) * scale}`,
      `H ${(transistorBaseBegin.x - hull.info.transistorWidth * 0.5) * scale}`,
      `V ${(transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.2) * scale}`,
      `V ${(transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.8) * scale}`,
      `V ${(transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.7) * scale}`,
      `H ${transistorBaseBegin.x * scale}`,
      `V ${(transistorBaseBegin.y + transistor.height) * scale}`,
      '"/>',
    ].join(' ');

    const extra = (transistor.leftPad - hull.info.transistorPadLeft);
    const transistorToper = [`<path fill="none" stroke="black" d="M ${(transistor.x + extra + hull.info.transistorPadLeft) * scale} ${(transistorBaseBegin.y + transistor.height / 2) * scale}`,
      `H ${(transistorBaseBegin.x - hull.info.transistorWidth * 0.6) * scale}`,
      `V ${(transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.3) * scale}`,
      `V ${(transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.7) * scale}`,
      '"/>',
    ].join(' ');

    let finalString;

    if (transistor.content.type === CMOSTransistorType.PMOS) {
      const emptyCircle = ['<circle fill="white" stroke="black"',
        `cx="${(transistorBaseBegin.x - hull.info.transistorWidth * 0.7) * scale}"`,
        `cy="${(transistorBaseBegin.y + transistor.height / 2) * scale}"`,
        `r="${hull.info.transistorWidth * 0.1 * scale}"`,
        '/>',
      ].join(' ');
      finalString = [transistorBase, transistorToper, emptyCircle].join('\n');
    } else {
      finalString = [transistorBase, transistorToper].join('\n');
    }

    return finalString;
  }

  placeTransistors(hull, scale) {
    const svgStrings = [' ',
      '<!--TRANSISTORS-->',
      ''];
    for (const transistor of hull.transistors) {
      svgStrings.push(this.getTransistorSVG(hull, transistor, scale));
    }

    if (svgStrings.length > 3) {
      return svgStrings.join('\n');
    }
    return '';
  }

  getWireSVG(hull, wireNode, scale, firstElement = false) {
    const svgStrings = [];
    if (wireNode instanceof WireBendNode) {
      if (firstElement) {
        for (const child of wireNode.children) {
          svgStrings.push(`<path fill="none" stroke="black" d="M ${wireNode.x * scale} ${wireNode.y * scale}`);
          svgStrings.push(this.getWireSVG(hull, child, scale));
        }
      } else {
        svgStrings.push(`L ${wireNode.x * scale} ${wireNode.y * scale}`);
        if (wireNode.children.length === 1) {
          svgStrings.push(this.getWireSVG(hull, wireNode.children[0], scale));
        } else {
          svgStrings.push(`L ${wireNode.x * scale} ${wireNode.y * scale} "/>`);
          for (const child of wireNode.children) {
            svgStrings.push(`<path fill="none" stroke="black" d="M ${wireNode.x * scale} ${wireNode.y * scale}`);
            svgStrings.push(this.getWireSVG(hull, child, scale));
          }
        }
      }
      if (wireNode.containsPoint) {
        svgStrings.push(`<circle cx="${wireNode.x * scale}" cy="${wireNode.y * scale}" r="2"/>`);
      }
    } else if (wireNode instanceof WireConnectionNode) {
      svgStrings.push(`L ${wireNode.x * scale} ${wireNode.y * scale} "/>`);
    }

    return svgStrings.join(' ');
  }

  placeConnectionWires(hull, scale) {
    const svgStrings = [' ',
      '<!--CONNECTIONWIRES-->',
      ''];
    for (const wire of hull.connectionWires) {
      svgStrings.push(this.getWireSVG(hull, wire.root, scale, true));
    }

    if (svgStrings.length > 3) {
      return svgStrings.join('\n');
    }
    return '';
  }

  getExpressionTransistorLabel(hull, expression, transistor, labelToLatexMethod, scale) {
    const coordinate = {
      x: transistor.x + transistor.width - hull.info.transistorPadRight - hull.info.transistorWidth,
      y: transistor.y + hull.info.transistorPadTop + hull.info.transistorHeight / 2,
    };
    return `<text x="${(coordinate.x - 0.1) * scale}" y="${coordinate.y * scale}" font-size="${hull.info.channelWidth * scale}" text-anchor="end" dominant-baseline="middle">$${labelToLatexMethod(expression.content.booleanExpression)}$</text>`;
  }

  getExpressionWireLabel(hull, expression, x, y, labelToLatexMethod, scale) {
    return `<text x="${(x + 0.1) * scale}" y="${y * scale}" font-size="${hull.info.channelWidth * scale}" text-anchor="begin" dominant-baseline="middle">$${labelToLatexMethod(expression.content.booleanExpression)}$</text>`;
  }

  placeExpressionLabels(hull, labelToLatexMethod, scale) {
    const svgStrings = [];

    if (hull.info.tunnelExpressions) {
      for (let i = 0; i < hull.children.length - 1; i += 1) {
        const expression = hull.children[i];
        const exitPoint = expression.getExitPoint();
        svgStrings.push(this.getExpressionWireLabel(
          hull,
          expression,
          expression.x
          + expression.width - expression.content.name.length * hull.info.charWidth,
          exitPoint.y,
          labelToLatexMethod,
          scale,
        ));
      }
      for (let i = 0; i < hull.children.length - 1; i += 1) {
        const expression = hull.children[i];
        for (const transistor of expression.content.connectedTo) {
          svgStrings.push(this.getExpressionTransistorLabel(
            hull,
            expression,
            hull.getTransistorByContent(transistor),
            labelToLatexMethod,
            scale,
          ));
        }
      }
    }

    const expression = hull.children[hull.children.length - 1];
    const exitPoint = expression.getExitPoint();
    svgStrings.push(this.getExpressionWireLabel(hull, expression, hull.x
      + hull.width, exitPoint.y, labelToLatexMethod, scale));

    return svgStrings.join('\n');
  }

  placeExpressionWires(hull, scale) {
    const svgStrings = [' ',
      '<!--EXPRESSIONWIRES-->',
      ''];
    for (const wire of hull.expressionWires) {
      svgStrings.push(this.getWireSVG(hull, wire.root, scale, true));
    }
    if (svgStrings.length > 3) {
      return svgStrings.join('\n');
    }
    return '';
  }

  getExpressionSVG(hull, labelToLatexMethod, scale) {
    return [this.placeExpressionWires(hull, scale),
      this.placeExpressionLabels(hull, labelToLatexMethod, scale)].join('\n');
  }

  getVariableTransistorLabel(hull, variable, transistor, labelToLatexMethod, scale) {
    const coordinate = {
      x: transistor.x + transistor.width - hull.info.transistorPadRight - hull.info.transistorWidth,
      y: transistor.y + hull.info.transistorPadTop + hull.info.transistorHeight / 2,
    };
    return `<text x="${(coordinate.x - 0.1) * scale}" y="${coordinate.y * scale}" font-size="${hull.info.channelWidth * scale}" text-anchor="end" dominant-baseline="middle">$${labelToLatexMethod(variable.content.booleanExpression)}$</text>`;
  }

  placeVariableLabels(hull, labelToLatexMethod, scale) {
    const svgStrings = [];
    for (const variable of hull.variables) {
      for (const transistor of variable.content.connectedTo) {
        svgStrings.push(this.getVariableTransistorLabel(
          hull,
          variable,
          hull.getTransistorByContent(transistor),
          labelToLatexMethod,
          scale,
        ));
      }
    }

    return svgStrings.join('\n');
  }

  getVariableWireLabel(hull, variable, x, y, labelToLatexMethod, scale) {
    return `<text x="${(x - 0.1) * scale}" y="${y * scale}" font-size="${hull.info.channelWidth * scale}" text-anchor="end" dominant-baseline="middle">$${labelToLatexMethod(variable.content.booleanExpression)}$</text>`;
  }

  placeVariableWires(hull, labelToLatexMethod, scale) {
    const svgStrings = [' ',
      '<!--VARIABLEWIRES-->',
      ''];
    for (let i = 0; i < hull.variableWires.length; i += 1) {
      const variable = hull.variables[i];
      const wire = hull.variableWires[i];

      svgStrings.push(this.getVariableWireLabel(
        hull,
        variable,
        wire.root.x,
        wire.root.y,
        labelToLatexMethod,
        scale,
      ));
      svgStrings.push(this.getWireSVG(hull, wire.root, scale, true));
    }
    if (svgStrings.length > 3) {
      return svgStrings.join('\n');
    }
    return '';
  }

  getVariableSVG(hull, labelToLatexMethod, scale) {
    if (hull.info.tunnelVariables) {
      return this.placeVariableLabels(hull, labelToLatexMethod, scale);
    }
    return this.placeVariableWires(hull, labelToLatexMethod, scale);
  }

  getLiteralTransistorLabel(hull, literal, transistor, scale) {
    const coordinate = {
      x: transistor.x + transistor.width - hull.info.transistorPadRight - hull.info.transistorWidth,
      y: transistor.y + hull.info.transistorPadTop + hull.info.transistorHeight / 2,
    };
    const label = literal.content.value ? '1' : '0';

    return `<text x="${(coordinate.x - 0.1) * scale}" y="${coordinate.y * scale}" font-size="${hull.info.channelWidth * scale}" text-anchor="end" dominant-baseline="middle">$${label}$</text>`;
  }

  placeLiteralLabels(hull, scale) {
    const svgStrings = [];
    for (const literal of hull.literals) {
      for (const transistor of literal.content.connectedTo) {
        svgStrings.push(this.getLiteralTransistorLabel(
          hull,
          literal,
          hull.getTransistorByContent(transistor),
          scale,
        ));
      }
    }

    return svgStrings.join('\n');
  }

  placeLiteralWires(hull, scale) {
    const svgStrings = [' ',
      '<!--LITERALWIRES-->',
      ''];
    for (let i = 0; i < hull.literalWires.length; i += 1) {
      const wire = hull.literalWires[i];

      svgStrings.push(this.getWireSVG(hull, wire.root, scale, true));
    }

    if (svgStrings.length > 3) {
      return svgStrings.join('\n');
    }
    return '';
  }

  getLiteralSVG(hull, scale) {
    if (hull.info.tunnelLiterals) {
      return this.placeLiteralLabels(hull, scale);
    }
    return this.placeLiteralWires(hull, scale);
  }

  placeSupplyWires(hull, scale) {
    const vccLabel = `<text x="${(hull.x - 0.1) * scale}" y="${hull.y * scale}" font-size="16" text-anchor="end" dominant-baseline="middle">VCC</text>`;
    const gndLabel = `<text x="${(hull.x - 0.1) * scale}" y="${(hull.y + hull.height) * scale}" font-size="16" text-anchor="end" dominant-baseline="middle">GND</text>`;

    const vccLine = `<path fill="none" stroke-width="2px" stroke="black" d="M ${hull.x * scale} ${hull.y * scale} H ${(hull.y + hull.width + 1) * scale}" />`;
    const gndLine = `<path fill="none" stroke-width="2px" stroke="black" d="M ${hull.x * scale} ${(hull.y + hull.height) * scale} H ${(hull.y + hull.width + 1) * scale}" />`;

    return [' ', '<!--SUPPLYWIRES-->', '', vccLabel, gndLabel, vccLine, gndLine].join('\n');
  }

  buildSVG(hull, labelToLatexMethod, scale = 30) {
    const svgString = ['\n',
      `<svg viewBox="${-3 * scale} ${-3 * scale} ${hull.width * scale * 2} ${hull.height * scale * 2}" width="${hull.width * scale}" height="${hull.height * scale}">`,
      this.placeTransistors(hull, scale),
      this.placeConnectionWires(hull, scale),

      this.getExpressionSVG(hull, labelToLatexMethod, scale),
      this.getVariableSVG(hull, labelToLatexMethod, scale),
      this.getLiteralSVG(hull, scale),

      this.placeSupplyWires(hull, scale),
      '</svg>',
    ].join('\n');

    return svgString;
  }
}
