
class Game{
 constructor(){this.deck=[...cardDatabase];this.hand=[];this.field=[];this.turn=1;}
 shuffle(){this.deck.sort(()=>Math.random()-.5)}
 start(){this.shuffle();for(let i=0;i<5;i++)this.draw();show('game');this.render();}
 draw(){if(this.deck.length)this.hand.push(this.deck.pop());}
 render(){
  document.getElementById('status').textContent='Turn '+this.turn+' | Deck '+this.deck.length;
  const hand=document.getElementById('hand'); hand.innerHTML='';
  this.hand.forEach((c,i)=>{
   const el=document.createElement('div');
   el.className='card'; el.draggable=true;
   el.innerHTML='<h4>'+c.name+'</h4><p>'+c.description+'</p>';
   el.addEventListener('dragstart',e=>e.dataTransfer.setData('text',i));
   hand.appendChild(el);
  });
 }
 endTurn(){this.turn++;this.draw();this.render();}
}
function show(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');}
let game;
window.addEventListener('DOMContentLoaded',()=>{
 game=new Game();
 document.getElementById('startBtn').onclick=()=>game.start();
 document.getElementById('endTurn').onclick=()=>game.endTurn();
 const field=document.getElementById('field');
 field.addEventListener('dragover',e=>e.preventDefault());
 field.addEventListener('drop',e=>{
  e.preventDefault();
  const i=+e.dataTransfer.getData('text');
  const card=game.hand.splice(i,1)[0];
  const p=document.createElement('div');
  p.className='card'; p.innerHTML='<h4>'+card.name+'</h4>';
  field.appendChild(p);
  game.render();
 });
});
