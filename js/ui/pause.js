// pause.js
const PauseUI = {
  el: null, btnResume: null, btnRestart: null,
  init(){
    this.el = document.getElementById('pause');
    this.btnResume = document.getElementById('btn-resume');
    this.btnRestart = document.getElementById('btn-restart');
    document.getElementById('btn-pause').addEventListener('click', ()=> this.show());
    this.btnResume.addEventListener('click', ()=> this.hide());
    this.btnRestart.addEventListener('click', ()=> { this.hide(); Game.restart(); });
  },
  show(){ this.el.classList.remove('hidden'); Engine.app.ticker.stop(); },
  hide(){ this.el.classList.add('hidden'); Engine.app.ticker.start(); }
};
