import Experience from "../Experience.js";
import Fox from "./Fox.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.fox = new Fox();
    });
  }

  update() {
    if (this.fox) this.fox.update();
  }
}
