// menu.js
const Menu = {
  el: null, btnStart: null, btnStore: null,
  init(){
    this.el = document.getElementById('menu');
    this.btnStart = document.getElementById('btn-start');
    this.btnStore = document.getElementById('btn-store-open');
    this.btnStart.addEventListener('click', ()=> { this.hide(); Game.start(); });
    this.btnStore.addEventListener('click', ()=> { UI.showStore(); });
    this.show();
  },
  show(){ this.el.classList.remove('hidden'); },
  hide(){ this.el.classList.add('hidden'); }
};
