// input.js - touch & swipe handling, virtual lanes
const Input = {
  startX: 0,
  startY: 0,
  threshold: 40,
  init(canvas){
    canvas.addEventListener('touchstart', e=>{
      const t = e.touches[0];
      this.startX = t.clientX; this.startY = t.clientY;
    }, {passive:true});
    canvas.addEventListener('touchend', e=>{
      const t = e.changedTouches[0];
      const dx = t.clientX - this.startX;
      const dy = t.clientY - this.startY;
      if(Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > this.threshold){
        if(dx > 0) this.onSwipe('right'); else this.onSwipe('left');
      } else {
        this.onTap();
      }
    }, {passive:true});

    // mouse fallback
    canvas.addEventListener('mousedown', e=>{
      this.startX = e.clientX;
    });
    canvas.addEventListener('mouseup', e=>{
      const dx = e.clientX - this.startX;
      if(Math.abs(dx) > this.threshold){
        if(dx>0) this.onSwipe('right'); else this.onSwipe('left');
      } else this.onTap();
    });
  },
  onSwipe(dir){
    // to be assigned by game
    // Example: Game.player.switchLane( dir === 'right' ? 1 : -1 );
    if(typeof this.swipeCallback === 'function') this.swipeCallback(dir);
  },
  onTap(){
    if(typeof this.tapCallback === 'function') this.tapCallback();
  }
};
