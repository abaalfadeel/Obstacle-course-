// pooling.js - generic object pool
class Pool {
  constructor(factory, initial = 10){
    this.factory = factory;
    this.items = [];
    for(let i=0;i<initial;i++) this.items.push(this.factory());
  }
  acquire(){
    return this.items.length ? this.items.pop() : this.factory();
  }
  release(obj){
    if(obj.reset) obj.reset();
    this.items.push(obj);
  }
}
