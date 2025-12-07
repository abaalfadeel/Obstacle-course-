// soldier.js - Player entity using spritesheet frames or simple placeholder
class Soldier {
  constructor(){
    this.container = new PIXI.Container();
    this.sprite = null;
    this.width = 120; this.height = 160;
    this.lane = 1; // 0 left,1 center,2 right
    this.lanesX = [120, 360, 600];
    this.targetX = this.lanesX[this.lane];
    this.y = Engine.app.renderer.height - 240;
    this.health = 3;
    this.coins = 0;
    this.attackCooldown = 0;
    this.attackDelay = 0.45;
    this.initSprite();
    this.container.x = this.targetX; this.container.y = this.y;
    Camera.add(this.container);
  }
  initSprite(){
    // try to use texture; otherwise draw placeholder
    const tex = AssetLoader.textures.player_idle;
    if(tex){
      // single texture fallback; wrap into sprite
      this.sprite = new PIXI.Sprite(tex);
      this.sprite.anchor.set(0.5,1);
      this.sprite.scale.set(0.6);
      this.container.addChild(this.sprite);
    } else {
      const g = new PIXI.Graphics();
      g.beginFill(0x2d9cdb); g.drawRoundedRect(-40,-160,80,160,12); g.endFill();
      this.container.addChild(g);
    }
  }
  switchLane(delta){
    this.lane = Math.max(0, Math.min(2, this.lane + delta));
    this.targetX = this.lanesX[this.lane];
  }
  update(dt){
    // smooth movement
    const dx = this.targetX - this.container.x;
    this.container.x += dx * Math.min(1, dt * 10);
    // cooldown
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
  }
  canAttack(){ return this.attackCooldown <= 0; }
  attack(){
    if(!this.canAttack()) return false;
    this.attackCooldown = this.attackDelay;
    AudioManager.play('hit', {volume:0.9});
    return true;
  }
  addCoins(n){ this.coins += n; Save.set('coins', this.coins); }
}
