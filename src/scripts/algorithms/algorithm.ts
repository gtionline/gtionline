export interface Step {
  name: string;
  data: Record<string, any>;
  addDataPoint(name: string, value: any): void;
}

export interface WatcherSteps {
  [key: string]: Step;
}

class StepImpl implements Step {
  name: string;
  data: Record<string, any>;

  constructor(name: string) {
    this.name = name;
    this.data = {};
  }

  addDataPoint(name: string, value: any): void {
    this.data[name] = value;
  }
}

/**
 * The Algorithm class saves the steps while the calculation,
 * so it is used for testing the intermediate steps and also
 * to display them at the gui.
 */
export class Algorithm {
  steps: WatcherSteps;
  protected curr: Step;

  constructor() {
    this.steps = {};
    this.curr = new StepImpl('');
  }

  step(name: string): this {
    const act = this.steps[name];
    if (!act) {
      this.steps[name] = new StepImpl(name);
    }
    this.curr = this.steps[name];
    return this;
  }

  saveVariable(name: string, value: any): this {
    this.curr.addDataPoint(name, value);
    return this;
  }

  get watcher(): { steps: WatcherSteps } {
    return { steps: this.steps };
  }

  public getSteps() {
    return this.steps;
  }
}
