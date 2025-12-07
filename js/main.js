// main.js - orchestrator
const Game = {
  player: null,
  running: false,
  init: async function(){
    Engine.init();
    await AssetLoader.loadAll();
    AudioManager.init();
    Save.set('coins', Save.get('coins', 0)); // ensure key exists
    Camera.init(Engine.stage);
    Input.init(Engine.app.view);
    // assign input callbacks
    Input.swipeCallback = dir => {
      if(!this.player) return;
      if(dir === 'right') this.player.switchLane(1); else this.player.switchLane(-1);
    };
    Input.tapCallback = ()=>{ if(this.player) { if(this.player.attack()) { this.handleAttack(); } } };
    // init UI
    UI.init();
    // create player entity
    this.player = new Soldier();
    // init level
    Level1.init();
    // start with menu visible
    HUD.update();
  },
  start: function(){
    Menu.hide();
    Engine.startLoop(this.update.bind(this));
    this.running = true;
  },
  update: function(delta){
    const dt = Engine.app.ticker.deltaMS / 1000;
    if(!this.running) return;
    // update player
    this.player.update(dt);
    // update level
    Level1.update(dt);
    // update hud
    HUD.setScore(Level1.score);
    HUD.update();
    Camera.update(dt);
  },
  handleAttack: function(){
    // simple attack: hit zombies close to player
    const list = Level1.npcList;
    for(const z of list){
      if(!z.active) continue;
      const distY = z.container.y - this.player.container.y;
      const dx = Math.abs(z.container.x - this.player.container.x);
      if(distY > -200 && distY < 80 && dx < 80){
        z.takeHit();
        if(!z.active){
          Save.set('coins', Save.get('coins',0) + 5);
          HUD.update();
        }
      }
    }
  },
  restart: function(){
    // simple restart: reload page
    location.reload();
  },
  gameOver: function(){
    this.running = false;
    Engine.app.ticker.stop();
    alert('Game Over');
    this.restart();
  }
};

window.addEventListener('load', ()=> {
  Game.init();
  // menu visible already
});
