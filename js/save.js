// save.js - simple localStorage wrapper
const Save = {
  keyPrefix: 'mrunner_',
  get(key, defaultVal = null){
    try{
      const v = localStorage.getItem(this.keyPrefix + key);
      if(v === null) return defaultVal;
      return JSON.parse(v);
    }catch(e){ return defaultVal; }
  },
  set(key, val){
    try{ localStorage.setItem(this.keyPrefix + key, JSON.stringify(val)); }catch(e){}
  },
  remove(key){ localStorage.removeItem(this.keyPrefix + key); }
};
