// obstacle.js - stationary obstacle on lane
class Obstacle {
  constructor(){
    this.container = new PIXI.Container();
    const g = new PIXI.Graphics();
    g.beginFill(0x333333); g.drawRoundedRect(-40,-40,80,80,8); g.endFill();
    this.container.addChild(g);
    Camera.add(this.container);
    this.active = false;
  }
  spawn(lane, y){
    const lanesX = [120,360,600];
    this.container.x = lanesX[lane];
    this.container.y = y;
    this.active = true; this.container.visible = true;
  }
  reset(){ this.active = false; this.container.visible = false; }
}
