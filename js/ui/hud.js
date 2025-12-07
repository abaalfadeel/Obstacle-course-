// hud.js - update DOM HUD
const HUD = {
  coinsEl: null, scoreEl: null,
  init(){
    this.coinsEl = document.getElementById('coins-count');
    this.scoreEl = document.getElementById('score-count');
    this.update();
  },
  update(){
    const coins = Save.get('coins', 0);
    this.coinsEl.innerText = coins;
    // score updated by Game loop
  },
  setScore(n){ this.scoreEl.innerText = Math.floor(n); }
};
