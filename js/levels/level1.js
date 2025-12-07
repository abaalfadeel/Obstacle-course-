// level1.js - simple spawner manager
const Level1 = {
  pool: null,
  npcList: [],
  timeAcc: 0,
  score: 0,
  init(){
    // create zombie pool
    this.pool = new Pool(()=> new Zombie(), 20);
    this.timeAcc = 0; this.score = 0;
  },
  update(dt){
    this.timeAcc += dt;
    if(this.timeAcc >= LevelConfig.spawnInterval){
      this.timeAcc = 0;
      // spawn 1-2 zombies
      const count = Math.random() > 0.6 ? 2 : 1;
      for(let i=0;i<count;i++){
        const z = this.pool.acquire();
        z.spawn(Math.floor(Math.random()*LevelConfig.lanes), -200 * Math.random());
        this.npcList.push(z);
      }
      // slightly ramp difficulty
      LevelConfig.spawnInterval = Math.max(0.25, LevelConfig.spawnInterval * LevelConfig.difficultyRamp);
    }
    // update NPCs
    for(let i=this.npcList.length-1;i>=0;i--){
      const z = this.npcList[i];
      if(!z.active){ this.pool.release(z); this.npcList.splice(i,1); continue; }
      z.update(dt);
      // collision with player attack: simple range check
      if(z.container.y > Engine.app.renderer.height - 300 && Math.abs(z.container.x - Game.player.container.x) < 60){
        // reached player -> damage (for now just remove)
        z.die(true);
        this.pool.release(z);
        this.npcList.splice(i,1);
        // penalty
        Game.player.health = Math.max(0, Game.player.health - 1);
        if(Game.player.health <= 0) Game.gameOver();
      }
    }
    // pickups etc could be updated here
    // score increment
    this.score += dt * 10;
  }
};
