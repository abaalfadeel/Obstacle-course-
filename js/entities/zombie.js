// zombie.js - pooled enemy
class Zombie {
  constructor(){
    this.container = new PIXI.Container();
    this.sprite = null;
    this.active = false;
    this.speed = 120; // pixels per second toward player
    this.lane = 1;
    this.health = 1;
    this.initSprite();
  }
  initSprite(){
    const tex = AssetLoader.textures.zombie_run;
    if(tex){
      this.sprite = new PIXI.Sprite(tex);
      this.sprite.anchor.set(0.5,1);
      this.sprite.scale.set(0.55);
      this.container.addChild(this.sprite);
    } else {
      const g = new PIXI.Graphics();
      g.beginFill(0x7a2a2a); g.drawEllipse(0,-40,40,60); g.endFill();
      this.container.addChild(g);
    }
    Camera.add(this.container);
  }
  spawn(lane, z){
    this.lane = lane;
    const lanesX = [120,360,600];
    this.container.x = lanesX[lane];
    this.container.y = -50 - (z||0); // spawn offscreen above
    this.active = true;
    this.health = 1;
    this.container.visible = true;
  }
  update(dt){
    if(!this.active) return;
    this.container.y += this.speed * dt;
    // if past bottom, deactivate
    if(this.container.y > Engine.app.renderer.height + 100) this.die(true);
  }
  takeHit(){
    this.health--;
    if(this.health <= 0) this.die(false);
  }
  die(escaped = false){
    this.active = false;
    this.container.visible = false;
    if(!escaped) AudioManager.play('coin');
    // will be returned to pool by manager
  }
  reset(){
    this.active = false;
    this.container.visible = false;
    this.container.y = -9999;
  }
}
