// audio.js - simple AudioManager
const AudioManager = {
  sounds: {},
  muted: false,
  init(){
    for(const k in AssetLoader.sounds){
      const a = AssetLoader.sounds[k];
      if(a) this.sounds[k] = a;
    }
  },
  play(key, opts = {}){
    if(this.muted) return;
    const a = this.sounds[key];
    if(!a) return;
    try{
      const clone = a.cloneNode(); // ensure overlap
      clone.volume = opts.volume ?? 0.9;
      clone.play().catch(()=>{});
    }catch(e){
      // fallback: set currentTime and play
      try{ a.currentTime = 0; a.play(); }catch{}
    }
  },
  toggleMute(){
    this.muted = !this.muted;
  }
};
