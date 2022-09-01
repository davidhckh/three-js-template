import StatsJs from "stats.js";

export default class Stats {
  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.activate();
    }
  }

  activate() {
    this.instance = new StatsJs();
    this.instance.showPanel(0);
    document.body.appendChild(this.instance.dom);
  }

  beforeRender() {
    this.instance.begin();
  }

  afterRender() {
    this.instance.end();
  }
}
