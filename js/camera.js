// camera.js - simple 2D camera parallax
const Camera = {
  container: null,
  init(stage){
    this.container = new PIXI.Container();
    // We'll put world children under camera.container
    stage.addChild(this.container);
  },
  add(child){ this.container.addChild(child); },
  update(dt){ /* placeholder for shake / lerp */ }
};
