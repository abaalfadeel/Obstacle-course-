// engine.js - initializes PIXI application and shared tools
const Engine = {
  app: null,
  stage: null,
  width: 720,
  height: 1280,
  scaleMode: PIXI.SCALE_MODES.LINEAR,
  init(rootId = 'game-root', opts = {}){
    // adapt size to viewport preserving aspect ratio targeting 9:16
    const w = Math.min(window.innerWidth, this.width);
    const h = Math.min(window.innerHeight, this.height);
    this.app = new PIXI.Application({
      width: w, height: h,
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true
    });
    document.getElementById(rootId).appendChild(this.app.view);
    this.stage = this.app.stage;
    // scale stage to fill whole viewport while keeping aspect ratio
    this.app.view.style.width = '100%';
    this.app.view.style.height = '100%';
    window.addEventListener('resize', ()=> this.onResize());
  },
  onResize(){
    // simple: keep canvas CSS size full
    // underlying renderer auto handles density
  },
  startLoop(updateFn){
    this.app.ticker.add(updateFn);
  },
  stopLoop(){
    this.app.ticker.stop();
  }
};
