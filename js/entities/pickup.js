// pickup.js - coin pickup
class Pickup {
  constructor(){
    this.container = new PIXI.Container();
    const g = new PIXI.Graphics();
    g.beginFill(0xffcc00); g.drawCircle(0,0,18); g.endFill();
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
  collect(){
    this.active = false; this.container.visible = false;
    AudioManager.play('coin');
  }
  reset(){ this.active = false; this.container.visible = false; }
}
