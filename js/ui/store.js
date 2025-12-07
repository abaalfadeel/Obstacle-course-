// store.js - simple shop
const StoreUI = {
  el: null, itemsContainer: null, items: [],
  init(){
    this.el = document.getElementById('store');
    this.itemsContainer = document.getElementById('store-items');
    document.getElementById('btn-store-close').addEventListener('click', ()=> this.hide());
    // sample items
    this.items = [
      {id:'skin_blue', name:'Skin أزرق', price:50, img:'assets/images/ui/skin_blue.png'},
      {id:'ak', name:'AK-Style', price:120, img:'assets/images/ui/ak.png'}
    ];
    this.renderItems();
  },
  renderItems(){
    this.itemsContainer.innerHTML = '';
    const coins = Save.get('coins',0);
    this.items.forEach(item=>{
      const div = document.createElement('div'); div.className='store-item';
      div.innerHTML = `<img src="${item.img}" onerror="this.style.display='none'"><div>${item.name}</div><div class="small-text">${item.price} coins</div>`;
      const btn = document.createElement('button'); btn.className='big-btn'; btn.innerText='شراء';
      btn.addEventListener('click', ()=> this.buy(item));
      div.appendChild(btn);
      this.itemsContainer.appendChild(div);
    });
  },
  buy(item){
    const coins = Save.get('coins',0);
    if(coins < item.price){ alert('لا يوجد ما يكفي'); return; }
    Save.set('coins', coins - item.price);
    Save.set('owned_'+item.id, true);
    HUD.update();
    alert('تم الشراء: ' + item.name);
  },
  show(){ this.el.classList.remove('hidden'); Engine.app.ticker.stop(); },
  hide(){ this.el.classList.add('hidden'); Engine.app.ticker.start(); }
};

const UI = { init(){ HUD.init(); Menu.init(); PauseUI.init(); StoreUI.init(); }, showStore(){ StoreUI.show(); } };
