// assets.js - loader and asset manifest
const ASSET_MANIFEST = {
  images: {
    // replace these with your sprite sheet paths (PNG) or atlas
    player_run: 'assets/spritesheets/player_run.png',
    player_idle: 'assets/spritesheets/player_idle.png',
    player_attack: 'assets/spritesheets/player_attack.png',
    zombie_run: 'assets/spritesheets/zombie_run.png',
    zombie_dead: 'assets/spritesheets/zombie_dead.png',
    obstacles: 'assets/images/obstacles.png',
    pickups: 'assets/images/pickups.png',
    ui_icons: 'assets/images/ui/icons.png'
  },
  audio: {
    hit: 'assets/audio/hit.wav',
    coin: 'assets/audio/coin.wav',
    bgm: 'assets/audio/bgm_loop.mp3'
  }
};

const AssetLoader = {
  textures: {},
  sounds: {},
  loaded: false,
  async loadAll(onProgress){
    // PIXI.Loader deprecated names differ; use PIXI.Assets when available
    const toLoad = Object.values(ASSET_MANIFEST.images);
    const promises = toLoad.map(u => PIXI.Texture.fromURL(u).catch(e=>{
      console.warn('Image load fail', u, e);
      return null;
    }));
    const results = await Promise.all(promises);
    let idx = 0;
    for(const key of Object.keys(ASSET_MANIFEST.images)){
      const tex = results[idx++];
      AssetLoader.textures[key] = tex || AssetLoader._createPlaceholder();
      if(onProgress) onProgress(idx / toLoad.length);
    }
    // audio using HTMLAudioElement for cross-compat
    for(const [k,v] of Object.entries(ASSET_MANIFEST.audio)){
      try{
        const audio = new Audio(v);
        audio.preload = 'auto';
        AssetLoader.sounds[k] = audio;
      }catch(e){ console.warn('Audio load fail',v); AssetLoader.sounds[k] = null; }
    }
    AssetLoader.loaded = true;
  },
  _createPlaceholder(){
    // small 128x128 texture as fallback
    const g = new PIXI.Graphics();
    g.beginFill(0x666666); g.drawRect(0,0,128,128); g.endFill();
    const tex = g.generateCanvasTexture();
    return tex;
  }
};
