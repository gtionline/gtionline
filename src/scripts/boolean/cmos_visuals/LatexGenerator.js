import { CMOSTransistorType } from '../cmos/CMOSTransistor';

import { WireBendNode, WireConnectionNode } from './WireNode';

export class LatexGenerator {
  placeSupplyWires(hull) {
    const vccLabel = `(${hull.x}, ${-hull.y}) node[anchor=east] {VCC}`;
    const gndLabel = `(${hull.x}, ${-hull.y - hull.height}) node[anchor=east] {GND}`;

    const vccLine = `(${hull.x}, ${-hull.y}) to (${hull.x + hull.width + 1}, ${-hull.y})`;
    const gndLine = `(${hull.x}, ${-hull.y - hull.height}) to (${hull.x + hull.width + 1}, ${-hull.y - hull.height})`;
    return ['', '% SUPPLYWIRES:', '', vccLabel, gndLabel, ';', '\\draw [very thick]', vccLine, gndLine].join('\n');
  }

  getTransistorLatex(hull, transistor) {
    const coordinate = {
      x: transistor.x + transistor.width - hull.info.transistorPadRight,
      y: transistor.y + hull.info.transistorPadTop + hull.info.transistorHeight / 2,
    };

    const name = `${transistor.content.type}-${transistor.id}`;
    let emptyCircle = '';
    if (transistor.content.type === CMOSTransistorType.PMOS) {
      emptyCircle = ', emptycircle';
    }

    return `node[${transistor.content.type}${emptyCircle}] (${name}) at (${coordinate.x}, ${-coordinate.y}){}`;
  }

  placeTransistors(hull) {
    const latexStrings = [
      '',
      '% TRANSISTORS:',
      '',
    ];

    for (const transistor of hull.transistors) {
      latexStrings.push(this.getTransistorLatex(hull, transistor));
    }

    return latexStrings.join('\n');
  }

  getWireLatex(hull, wireNode, firstElement = false) {
    const latexStrings = [];
    if (wireNode instanceof WireBendNode) {
      if (firstElement) {
        for (const child of wireNode.children) {
          latexStrings.push(`(${wireNode.x}, ${-wireNode.y})`);
          latexStrings.push(this.getWireLatex(hull, child));
        }
      } else {
        latexStrings.push(` to (${wireNode.x}, ${-wireNode.y})`);
        if (wireNode.children.length === 1) {
          latexStrings.push(this.getWireLatex(hull, wireNode.children[0]));
        } else {
          latexStrings.push('\n');
          for (const child of wireNode.children) {
            latexStrings.push(`(${wireNode.x}, ${-wireNode.y})`);
            latexStrings.push(this.getWireLatex(hull, child));
          }
        }
      }
      if (wireNode.containsPoint) {
        latexStrings.push(`(${wireNode.x}, ${-wireNode.y}) node[circ] {}\n`);
      }
    } else if (wireNode instanceof WireConnectionNode) {
      const name = `${wireNode.transistor.content.type}-${wireNode.transistor.id}`;
      const point = `${name}.${wireNode.connectionType}`;

      if (firstElement) {
        latexStrings.push(`(${point})`);
      } else {
        latexStrings.push(` to (${point})\n`);
      }

      for (const child of wireNode.children) {
        latexStrings.push(this.getWireLatex(hull, child));
      }
    }

    return latexStrings.join('');
  }

  placeConnectionWires(hull) {
    const latexStrings = [
      '',
      '% CONNECTIONWIRES:',
      '',
    ];
    for (const wire of hull.connectionWires) {
      latexStrings.push(this.getWireLatex(hull, wire.root, true));
    }

    if (latexStrings.length > 3) {
      return latexStrings.join('\n');
    }
    return '';
  }

  getExpressionTransistorLabelLatex(hull, expression, transistor, labelToLatexMethod) {
    const transistorName = `${transistor.content.type}-${transistor.id}`;
    return `(${transistorName}.G) node[anchor=east] {$${labelToLatexMethod(expression.content.booleanExpression)}$}`;
  }

  getExpressionWireLabel(expression, x, y, labelToLatexMethod) {
    return `(${x}, ${-y}) node[anchor=west] {$${labelToLatexMethod(expression.content.booleanExpression)}$}`;
  }

  placeExpressionLabels(hull, labelToLatexMethod) {
    const latexStrings = [];

    if (hull.info.tunnelExpressions) {
      for (let i = 0; i < hull.children.length - 1; i += 1) {
        const expression = hull.children[i];
        const exitPoint = expression.getExitPoint();

        const xPos = expression.x + expression.width
                     - expression.content.name.length * hull.info.charWidth;
        const yPos = exitPoint.y;
        const toAdd = this.getExpressionWireLabel(expression, xPos, yPos, labelToLatexMethod);
        latexStrings.push(toAdd);
      }
      for (let i = 0; i < hull.children.length - 1; i += 1) {
        const expression = hull.children[i];
        for (const transistor of expression.content.connectedTo) {
          const transistorEntity = hull.getTransistorByContent(transistor);
          const toAdd = this.getExpressionTransistorLabelLatex(
            hull,
            expression,
            transistorEntity,
            labelToLatexMethod,
          );
          latexStrings.push(toAdd);
        }
      }
    }

    const expression = hull.children[hull.children.length - 1];
    const exitPoint = expression.getExitPoint();
    latexStrings.push(this.getExpressionWireLabel(expression, hull.x
      + hull.width, exitPoint.y, labelToLatexMethod));

    return latexStrings.join('\n');
  }

  placeExpressionWires(hull) {
    const latexStrings = [
      '',
      '% EXPRESSIONWIRES:',
      '',
    ];
    for (const wire of hull.expressionWires) {
      latexStrings.push(this.getWireLatex(hull, wire.root, true));
    }

    if (latexStrings.length > 3) {
      return latexStrings.join('\n');
    }
    return '';
  }

  getExpressionLatex(hull, labelToLatexMethod) {
    return [this.placeExpressionWires(hull, labelToLatexMethod),
      this.placeExpressionLabels(hull, labelToLatexMethod)].join('\n');
  }

  getVariableTransistorLabelLatex(hull, variable, transistor, labelToLatexMethod) {
    const transistorName = `${transistor.content.type}-${transistor.id}`;
    return `(${transistorName}.G) node[anchor=east] {$${labelToLatexMethod(variable.content.booleanExpression)}$}`;
  }

  placeVariableLabels(hull, labelToLatexMethod) {
    const latexStrings = [];
    for (const variable of hull.variables) {
      for (const transistor of variable.content.connectedTo) {
        latexStrings.push(this.getVariableTransistorLabelLatex(
          hull,
          variable,
          hull.getTransistorByContent(transistor),
          labelToLatexMethod,
        ));
      }
    }

    return latexStrings.join('\n');
  }

  getVariableWireLabel(variable, x, y, labelToLatexMethod) {
    return `(${x}, ${-y}) node[anchor=east] {$${labelToLatexMethod(variable.content.booleanExpression)}$}`;
  }

  placeVariableWires(hull, labelToLatexMethod) {
    const latexStrings = [
      '',
      '% VARIABLEWIRES:',
      '',
    ];
    for (let i = 0; i < hull.variableWires.length; i += 1) {
      const wire = hull.variableWires[i];
      const variable = hull.variables[i];

      latexStrings.push(this.getVariableWireLabel(
        variable,
        wire.root.x,
        wire.root.y,
        labelToLatexMethod,
      ));
      latexStrings.push(this.getWireLatex(hull, wire.root, true));
    }

    if (latexStrings.length > 3) {
      return latexStrings.join('\n');
    }
    return '';
  }

  getVariableLatex(hull, labelToLatexMethod) {
    if (hull.info.tunnelVariables) {
      return this.placeVariableLabels(hull, labelToLatexMethod);
    }
    return this.placeVariableWires(hull, labelToLatexMethod);
  }

  getLiteralTransistorLabelLatex(hull, literal, transistor) {
    const transistorName = `${transistor.content.type}-${transistor.id}`;
    const label = literal.content.value ? '1' : '0';
    return `(${transistorName}.G) node[anchor=east] {$${label}$}`;
  }

  placeLiteralLabels(hull) {
    const latexStrings = [];
    for (const literal of hull.literals) {
      for (const transistor of literal.content.connectedTo) {
        latexStrings.push(this.getLiteralTransistorLabelLatex(
          hull,
          literal,
          hull.getTransistorByContent(transistor),
        ));
      }
    }

    return latexStrings.join('\n');
  }

  placeLiteralWires(hull) {
    const latexStrings = [
      '',
      '% LITERALWIRES:',
      '',
    ];

    for (let i = 0; i < hull.literalWires.length; i += 1) {
      const wire = hull.literalWires[i];

      latexStrings.push(this.getWireLatex(hull, wire.root, true));
    }

    if (latexStrings.length > 3) {
      return latexStrings.join('\n');
    }
    return '';
  }

  getLiteralLatex(hull) {
    if (hull.info.tunnelLiterals) {
      return this.placeLiteralLabels(hull);
    }
    return this.placeLiteralWires(hull);
  }

  placeSettings(hull) {
    return [`\\ctikzset{tripoles/nmos/height=${hull.info.transistorHeight}, tripoles/pmos/height=${hull.info.transistorHeight}}`,
      `\\ctikzset{tripoles/nmos/width=${hull.info.transistorWidth}, tripoles/pmos/width=${hull.info.transistorWidth}}`].join('\n');
  }

  buildLatex(hull, labelToLatexMethod, scale = 0.5) {
    const latexString = ['\n',
      `\\begin{circuitikz}[scale=${scale}, every node/.style={scale=${scale}}]`,
      this.placeSettings(hull),
      '\\draw',
      this.placeTransistors(hull),
      this.placeConnectionWires(hull),
      this.getExpressionLatex(hull, labelToLatexMethod),
      this.getVariableLatex(hull, labelToLatexMethod),
      this.getLiteralLatex(hull),
      this.placeSupplyWires(hull),
      ';\\end{circuitikz}',
    ].join('\n');

    return latexString;
  }
}
