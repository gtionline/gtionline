import {
  CMOSVisual,
  CMOSVisualExpression,
  CMOSVisualSeriesElement,
  CMOSVisualParallelElement,
  CMOSVisualTransistor,
} from '../CMOSVisual';

import {
  CMOSTransistorType,
} from '../../cmos/CMOSTransistor';

import {
  WireBuilder,
} from '../WireBuilder';

import {
  Wire,
  WireBendNode,
  WireConnectionNode,
  TRANSISTOR_CONNECTION_TYPES,
} from '../WireNode';

/**
 * Responsible for generating the connectionWires for the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The visual hull for which the connectionWires will be generated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class GenerateConnectionWires {
  constructor(hull, info) {
    this.info = info;
    this.result = this._generateConnectionWires(hull, hull, null, null);
  }

  /**
     * Determines how the given VisualElement will be handled.
     * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
     * The VisualElement to be handled.
     * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
     * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */
  _generateConnectionWires(hull, visualElement, upperNode, lowerNode) {
    if (visualElement instanceof CMOSVisual) {
      this._handleCMOSVisual(hull, visualElement);
    } else if (visualElement instanceof CMOSVisualExpression) {
      this._handleCMOSVisualExpression(hull, visualElement, upperNode, lowerNode);
    } else if (visualElement instanceof CMOSVisualSeriesElement) {
      this._handleCMOSVisualSeriesElement(hull, visualElement, upperNode, lowerNode);
    } else if (visualElement instanceof CMOSVisualParallelElement) {
      this._handleCMOSVisualParallelElement(hull, visualElement, upperNode, lowerNode);
    } else if (visualElement instanceof CMOSVisualTransistor) {
      this._handleCMOSVisualTransistor(hull, visualElement, upperNode, lowerNode);
    } else {
      throw Error('GenerateConnectionWires._generateConnectionWires(CMOSVisual, CMOSVisual, WireNode, WireNode): visualElement is of unknown type.');
    }

    return visualElement;
  }

  /**
     * Generates the connectionWires for a CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
     * @param {CMOSVisual} [visualElement] The given CMOSVisual.
     */
  _handleCMOSVisual(hull, visualElement) {
    // Establish supplyWires.
    const vcc = new Wire(new WireBendNode(0, 0, null, false));
    const gnd = new Wire(new WireBendNode(0, visualElement.height, null, false));

    // Create builders for the supplyWires.
    const builderVCC = new WireBuilder(vcc.root);
    const builderGND = new WireBuilder(gnd.root);

    for (const visualExpression of visualElement.children) {
      // Advance the supplyWires.
      builderVCC.advanceX(
        visualExpression.upperConnectionPoint.x,
        this.info.enableConnectionLineJoints,
      );
      builderGND.advanceX(
        visualExpression.lowerConnectionPoint.x,
        this.info.enableConnectionLineJoints,
      );

      this._generateConnectionWires(hull, visualExpression, builderVCC.current, builderGND.current);
    }

    // Finish the supplyWires.
    builderVCC.advanceX(visualElement.width, this.info.enableConnectionLineJoints);
    builderGND.advanceX(visualElement.width, this.info.enableConnectionLineJoints);

    hull.addConnectionWire(vcc);
    hull.addConnectionWire(gnd);
  }

  /**
     * Generates the connectionWires for a CMOSVisualExpression.
     * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
     * @param {CMOSVisualExpression} [visualElement] The given CMOSVisualExpression.
     * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
     * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
     */
  _handleCMOSVisualExpression(hull, visualElement, upperNode, lowerNode) {
    // Create the connectionWire at the middle the CMOSVisualExpression.
    const exitPoint = visualElement.getExitPoint();
    const middle = new Wire(new WireBendNode(exitPoint.x, exitPoint.y, null, false));

    // Create builders for existing wires.
    const builderTop = new WireBuilder(upperNode);
    const builderMiddle = new WireBuilder(middle.root);
    const builderBottom = new WireBuilder(lowerNode);

    // Handle the PullUp-Network
    builderMiddle.advanceX(
      visualElement.children[0].lowerConnectionPoint.x,
      this.info.enableConnectionLineJoints,
    );
    builderMiddle.advanceY(
      visualElement.children[0].lowerConnectionPoint.y,
      this.info.enableConnectionLineJoints,
    );

    builderTop.advanceX(
      visualElement.children[0].upperConnectionPoint.x,
      this.info.enableConnectionLineJoints,
    );
    builderTop.advanceY(
      visualElement.children[0].upperConnectionPoint.y,
      this.info.enableConnectionLineJoints,
    );

    this._generateConnectionWires(
      hull,
      visualElement.children[0],
      builderTop.current,
      builderMiddle.current,
    );

    // Reset and handle the PullDown-Network
    builderMiddle.current = middle.root;
    builderMiddle.advanceX(
      visualElement.children[1].upperConnectionPoint.x,
      this.info.enableConnectionLineJoints,
    );
    builderMiddle.advanceY(
      visualElement.children[1].upperConnectionPoint.y,
      this.info.enableConnectionLineJoints,
    );

    builderBottom.advanceX(
      visualElement.children[1].lowerConnectionPoint.x,
      this.info.enableConnectionLineJoints,
    );
    builderBottom.advanceY(
      visualElement.children[1].lowerConnectionPoint.y,
      this.info.enableConnectionLineJoints,
    );

    this._generateConnectionWires(
      hull,
      visualElement.children[1],
      builderMiddle.current,
      builderBottom.current,
    );

    // If expressions are tunneled, take care of the expressionWire.
    builderMiddle.current = middle.root;
    if (this.info.tunnelExpressions && visualElement.content.id < hull.children.length - 1) {
      builderMiddle.advanceX(visualElement.x + visualElement.width
        - visualElement.content.name.length
        * this.info.charWidth, this.info.enableConnectionLineJoints);
    } else if (visualElement.content.id === hull.children.length - 1) {
      builderMiddle.advanceX(hull.width, this.info.enableConnectionLineJoints);
    }

    hull.addConnectionWire(middle);
  }

  /**
     * Generates the connectionWires for a CMOSVisualSeriesElement.
     * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
     * @param {CMOSVisualSeriesElement} [visualElement] The given CMOSVisualSeriesElement.
     * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
     * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
     */
  _handleCMOSVisualSeriesElement(hull, visualElement, upperNode, lowerNode) {
    // Create builders for existing wires.
    const builderTop = new WireBuilder(upperNode);
    const builderBottom = new WireBuilder(lowerNode);

    // Go from top to bottom.
    for (let i = 0; i < visualElement.children.length; i += 1) {
      const child = visualElement.children[i];

      if (child instanceof CMOSVisualTransistor) {
        // Connect the transistor and create a new wire if necessary.
        const connectionUp = child.content.type === CMOSTransistorType.PMOS
          ? TRANSISTOR_CONNECTION_TYPES.SOURCE : TRANSISTOR_CONNECTION_TYPES.DRAIN;
        const connectionDown = child.content.type === CMOSTransistorType.PMOS
          ? TRANSISTOR_CONNECTION_TYPES.DRAIN : TRANSISTOR_CONNECTION_TYPES.SOURCE;

        builderTop.advanceX(child.upperConnectionPoint.x, this.info.enableConnectionLineJoints);
        builderTop.connectTransistor(child, connectionUp, this.info);
        if (i < visualElement.children.length - 1) {
          const newConnectionNode = new WireConnectionNode(
            child.lowerConnectionPoint.x,
            child.lowerConnectionPoint.y,
            null,
            child,
            connectionDown,
          );
          const newNode = new WireBendNode(
            child.lowerConnectionPoint.x,
            child.lowerConnectionPoint.y,
            null,
            false,
          );
          newNode.addChild(newConnectionNode);
          const newWire = new Wire(newNode);

          hull.addConnectionWire(newWire);

          builderTop.current = newNode;
        } else {
          builderBottom.connectTransistor(child, connectionDown, this.info);
        }
      } else {
        // Connect the element and create a new wire if necessary.
        builderTop.advanceX(child.upperConnectionPoint.x, this.info.enableConnectionLineJoints);
        builderTop.advanceY(child.upperConnectionPoint.y, this.info.enableConnectionLineJoints);
        if (i < visualElement.children.length - 1) {
          const newNode = new WireBendNode(
            child.lowerConnectionPoint.x,
            child.lowerConnectionPoint.y,
            null,
            false,
          );

          this._generateConnectionWires(hull, child, builderTop.current, newNode);

          builderTop.current = newNode;

          const newWire = new Wire(newNode);
          hull.addConnectionWire(newWire);
        } else {
          builderBottom.advanceY(child.lowerConnectionPoint.y);
          this._generateConnectionWires(hull, child, builderTop.current, builderBottom.current);
        }
      }
    }
  }

  /**
     * Generates the connectionWires for a CMOSVisualParallelElement.
     * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
     * @param {CMOSVisualParallelElement} [visualElement] The given CMOSVisualParallelElement.
     * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
     * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
     */
  _handleCMOSVisualParallelElement(hull, visualElement, upperNode, lowerNode) {
    // Create builders for existing wires.
    const builderTop = new WireBuilder(upperNode);
    const builderBottom = new WireBuilder(lowerNode);

    // Go from left to right.
    for (const child of visualElement.children) {
      builderTop.advanceX(child.upperConnectionPoint.x, this.info.enableConnectionLineJoints);
      builderBottom.advanceX(child.lowerConnectionPoint.x, this.info.enableConnectionLineJoints);

      this._generateConnectionWires(hull, child, builderTop.current, builderBottom.current);
    }
  }

  /**
     * Generates the connectionWires for a CMOSVisualTransistor.
     * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
     * @param {CMOSVisualTransistor} [visualElement] The given CMOSVisualTransistor.
     * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
     * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
     */
  _handleCMOSVisualTransistor(hull, visualElement, upperNode, lowerNode) {
    // Create builders for existing wires.
    const builderTop = new WireBuilder(upperNode);
    const builderBottom = new WireBuilder(lowerNode);

    const connectionUp = visualElement.content.type === CMOSTransistorType.PMOS
      ? TRANSISTOR_CONNECTION_TYPES.SOURCE : TRANSISTOR_CONNECTION_TYPES.DRAIN;
    const connectionDown = visualElement.content.type === CMOSTransistorType.PMOS
      ? TRANSISTOR_CONNECTION_TYPES.DRAIN : TRANSISTOR_CONNECTION_TYPES.SOURCE;

    // Connect the transistor.
    builderTop.connectTransistor(visualElement, connectionUp, this.info);
    builderBottom.connectTransistor(visualElement, connectionDown, this.info);
  }

  /**
   * Used to retrieve the visual hull after generating the connectionWires.
   * @return {CMOSVisual} The resulting CMOSVisual.
   */
  getResult() {
    return this.result;
  }
}
