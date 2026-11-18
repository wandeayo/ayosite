  // Kind words: sticky notes you can drag, throw, tidy, mess up, or add your own to
  (function(){const board=document.getElementById('kw-board');if(!board)return;
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tidyBtn=document.getElementById('kw-tidy'),pad=document.getElementById('kw-pad'),hint=document.getElementById('kw-hint'),count=document.getElementById('kw-n');
    const EMAIL='ayowandeolubo@gmail.com';
    const ROT=[-2.6,1.8,-1.2,2.4,-1.8,1.4],JIT=[[-6,8],[10,-4],[-4,14],[8,-6],[-10,6],[4,10]];
    let notes=[],W=0,H=0,mode='scatter',deck=false,Z=10,order=[],raf=0,dealt=false,mine=null;
    board.classList.add('js');
    const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
    function mk(el){const n={el,x:0,y:0,r:0,base:0,tr:0,vx:0,vy:0,drag:false,moving:false,w:0,h:0};el._n=n;return n}
    notes=[...board.querySelectorAll('.note')].map(mk);
    const paint=n=>{n.el.style.transform=`translate3d(${n.x}px,${n.y}px,0) rotate(${n.r}deg)`};
    const front=n=>{n.el.style.zIndex=++Z};
    const loose=n=>n.el.classList.add('loose');
    function repin(n){const el=n.el;el.classList.remove('loose','repin');void el.offsetWidth;el.classList.add('repin');setTimeout(()=>el.classList.remove('repin'),700)}
    function ease(list,on){list.forEach(n=>n.el.classList.toggle('ease',on&&!reduce))}
    function measure(){W=board.clientWidth;deck=W<640;board.classList.toggle('deck',deck);count.hidden=!deck;tidyBtn.hidden=deck;
      const nw=deck?Math.min(320,W-28):Math.min(264,Math.floor((W-40)/3));board.style.setProperty('--nw',nw+'px');
      notes.forEach(n=>{n.w=n.el.offsetWidth;n.h=n.el.offsetHeight})}

    // desktop: three loose columns, or a neat grid when tidied
    function rowsOf(list){const rows=[];list.forEach((n,i)=>{(rows[i/3|0]=rows[i/3|0]||[]).push(n)});return rows}
    function layoutDesk(kind){const list=notes.filter(n=>n!==mine),colW=W/3;let y=kind==='tidy'?0:18;
      rowsOf(list).forEach((row,ri)=>{const rh=Math.max(...row.map(n=>n.h));
        row.forEach((n,ci)=>{const i=ri*3+ci,j=kind==='tidy'?[0,0]:JIT[i%6];
          n.x=ci*colW+(colW-n.w)/2+j[0];n.y=y+j[1];n.base=n.tr=n.r=kind==='tidy'?0:ROT[i%6]});
        y+=rh+(kind==='tidy'?20:34)});
      H=Math.round(y+(kind==='tidy'?140:120));board.style.height=H+'px';
      pad.style.left=(W-170)+'px';pad.style.top=(H-150)+'px';hint.textContent='psst, they move.';hint.style.left='2px';hint.style.top=(H-70)+'px';
      if(mine){mine.x=clamp(mine.x,0,W-mine.w);mine.y=clamp(mine.y,0,H-mine.h)}}
    function messUp(){const list=notes.filter(n=>n!==mine);
      list.forEach(n=>{n.x=Math.random()*(W-n.w);n.y=Math.random()*Math.max(0,H-180-n.h*.6);n.base=n.tr=n.r=(Math.random()*2-1)*11;front(n)})}

    // phone: a stack you flick through
    function layoutDeck(){const h=Math.max(...notes.map(n=>n.h));H=h+24;board.style.height=(H+130)+'px';
      order.forEach((n,d)=>{n.x=(W-n.w)/2;n.y=Math.min(d,2)*7;n.base=n.tr=n.r=d===0?0:(d%2?2.2:-2.4);n.el.style.zIndex=100-d;
        n.el.style.opacity=d>2?0:1;n.el.setAttribute('aria-hidden',d===0?'false':'true');n.el.tabIndex=d===0?0:-1});
      pad.style.left='6px';pad.style.top=(H+4)+'px';hint.textContent='flick the top one away →';hint.style.left='150px';hint.style.top=(H+52)+'px';const real=notes.filter(n=>n!==mine),top=order[0];
      count.textContent=top===mine?'Your note':String(real.indexOf(top)+1).padStart(2,'0')+' / '+String(real.length).padStart(2,'0')}

    function layout(animate){measure();if(deck){if(!order.length||order.length!==notes.length)order=notes.slice();ease(notes,animate);layoutDeck()}
      else{notes.forEach(n=>{n.el.style.opacity='';n.el.removeAttribute('aria-hidden');n.el.tabIndex=0});ease(notes,animate);if(mode==='mess'){layoutDesk('scatter');messUp()}else layoutDesk(mode)}
      notes.forEach(paint)}

    // drag + throw
    let drag=null;
    function loop(){let busy=false;
      notes.forEach(n=>{if(n.drag){n.r+=(n.tr-n.r)*.25;paint(n);busy=true;return}
        if(n.moving){n.x+=n.vx;n.y+=n.vy;n.vx*=.9;n.vy*=.9;
          if(n.x<0||n.x>W-n.w){n.x=clamp(n.x,0,W-n.w);n.vx*=-.45}
          if(n.y<0||n.y>H-n.h){n.y=clamp(n.y,0,H-n.h);n.vy*=-.45}
          n.tr=n.base+clamp(n.vx*.8,-14,14);n.r+=(n.tr-n.r)*.2;paint(n);
          if(Math.hypot(n.vx,n.vy)<.15&&Math.abs(n.r-n.base)<.05){n.moving=false;n.r=n.base;paint(n);repin(n)}else busy=true}});
      raf=busy?requestAnimationFrame(loop):0}
    const kick=()=>{if(!raf)raf=requestAnimationFrame(loop)};
    const pt=e=>{const b=board.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]};
    board.addEventListener('pointerdown',e=>{const el=e.target.closest('.note');if(!el||e.button>0||e.target.closest('textarea,input,a,button'))return;
      const n=el._n;if(deck&&n!==order[0])return;
      const [px,py]=pt(e);drag={n,ox:px-n.x,oy:py-n.y,sx:px,lx:px,ly:py,lt:performance.now(),id:e.pointerId,moved:false};
      ease([n],false);n.moving=false;n.vx=n.vy=0;if(!deck)front(n)});
    board.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const n=drag.n,[px,py]=pt(e);
      if(!drag.moved){if(Math.hypot(px-drag.lx,py-drag.ly)<4)return;drag.moved=true;n.drag=true;n.el.classList.add('held');loose(n);try{n.el.setPointerCapture(e.pointerId)}catch(_){}
        if(hint&&!hint.classList.contains('gone'))hint.classList.add('gone')}
      const t=performance.now(),dt=Math.max(8,t-drag.lt);
      n.vx=n.vx*.5+((px-drag.lx)/dt*16)*.5;n.vy=n.vy*.5+((py-drag.ly)/dt*16)*.5;drag.lx=px;drag.ly=py;drag.lt=t;
      if(deck){n.x=(W-n.w)/2+(px-drag.sx);n.tr=(px-drag.sx)*.06}
      else{n.x=clamp(px-drag.ox,0,W-n.w);n.y=clamp(py-drag.oy,0,H-n.h);n.tr=n.base+clamp(n.vx*.8,-14,14)}
      if(reduce){n.r=n.tr=deck?0:n.base;paint(n)}else kick()});
    function end(e){if(!drag||(e&&e.pointerId!==drag.id))return;const {n,moved,sx}=drag;drag=null;n.drag=false;n.el.classList.remove('held');if(!moved)return;
      if(deck){const dx=n.x-(W-n.w)/2;if(Math.abs(dx)>W*.25||Math.abs(n.vx)>9)toss(n,Math.sign(dx||n.vx));else{ease([n],true);layoutDeck();paint(n);setTimeout(()=>repin(n),300)}return}
      if(reduce){n.vx=n.vy=0;repin(n);return}
      n.base=clamp(n.base+clamp(n.vx*.3,-4,4),-12,12);n.moving=true;kick()}
    board.addEventListener('pointerup',end);board.addEventListener('pointercancel',end);

    // phone: flick the top note away and it goes to the back of the pile
    function toss(n,dir){ease([n],true);n.x=(W-n.w)/2+dir*(W+40);n.r=dir*18;paint(n);
      setTimeout(()=>{order.push(order.shift());ease(notes,false);n.el.style.zIndex=0;n.x=(W-n.w)/2;n.y=14;n.r=0;paint(n);
        requestAnimationFrame(()=>requestAnimationFrame(()=>{ease(notes,true);layoutDeck();notes.forEach(paint);setTimeout(()=>repin(n),reduce?0:450)}))},reduce?0:320)}

    // keyboard: arrows nudge the focused note (or flip through the stack on a phone)
    board.addEventListener('keydown',e=>{const el=e.target.closest('.note');if(!el||e.target.closest('textarea,input'))return;const n=el._n;
      const k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!k)return;e.preventDefault();
      if(deck){if(k[0])toss(n,k[0]);return}
      const s=e.shiftKey?48:16;ease([n],true);front(n);n.x=clamp(n.x+k[0]*s,0,W-n.w);n.y=clamp(n.y+k[1]*s,0,H-n.h);paint(n)});
    board.addEventListener('focusin',e=>{const el=e.target.closest('.note');if(el&&!deck&&el.style.zIndex<Z)front(el._n)});

    tidyBtn.addEventListener('click',()=>{mode=mode==='tidy'?'mess':'tidy';tidyBtn.textContent=mode==='tidy'?'Mess it up':'Tidy up';
      notes.forEach((n,i)=>{n.moving=false;loose(n);n.el.style.transitionDelay=reduce?'0ms':(i*45)+'ms'});layout(true);
      setTimeout(()=>notes.forEach(n=>n.el.style.transitionDelay=''),900);
      notes.forEach((n,i)=>setTimeout(()=>repin(n),reduce?0:620+i*90))});

    // the pad: peel off a blank note and write Ayo something
    // the pad: peel off a blank note, write Ayo something, and it's sent from the site (no email app needed)
    const ENDPOINT=board.dataset.endpoint||'/api/note',DEMO=board.dataset.demo==='true';
    const padLabel=pad.querySelector('.pad-top b');
    function removeMine(){if(!mine)return;const el=mine.el;notes=notes.filter(n=>n!==mine);order=order.filter(n=>n!==mine);el.remove();mine=null;if(deck){ease(notes,true);layoutDeck();notes.forEach(paint)}}
    pad.addEventListener('click',()=>{if(mine){if(deck){order=[mine,...order.filter(n=>n!==mine)];ease(notes,true);layoutDeck();notes.forEach(paint)}else front(mine);mine.el.querySelector('textarea').focus();return}
      const el=document.createElement('figure');el.className='note mine';el.dataset.c='w';el.tabIndex=0;el.setAttribute('aria-label','Your note to Ayo');
      el.classList.add('loose');el.innerHTML='<svg class="pin" aria-hidden="true" focusable="false"><use href="#pin-black"/></svg><form class="paper" novalidate><label class="sr-only" for="kw-msg">Your note to Ayo</label><textarea id="kw-msg" name="message" maxlength="500" required placeholder="Hi Ayo, …"></textarea>'+
        '<label class="sr-only" for="kw-from">Your email, if you want a reply</label><input class="mine-mail" id="kw-from" name="email" type="email" autocomplete="email" maxlength="120" placeholder="Your email, if you want a reply">'+
        '<input class="kw-trap" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'+
        '<div class="mine-foot"><b>You</b><span class="mine-btns"><button type="button" class="bin" aria-label="Throw your note away">Bin</button><button type="submit" class="send" disabled>Send ↗</button></span></div>'+
        '<p class="mine-msg" role="status" aria-live="polite"></p></form>';
      board.appendChild(el);mine=mk(el);notes.push(mine);measure();const opened=Date.now();
      const form=el.querySelector('form'),ta=form.message,mail=form.email,send=form.querySelector('.send'),msg=form.querySelector('.mine-msg');
      const ok=()=>ta.value.trim().length>0&&(!mail.value.trim()||mail.checkValidity());
      form.addEventListener('input',()=>{send.disabled=!ok();el.classList.remove('err');msg.textContent=''});
      form.querySelector('.bin').addEventListener('click',()=>{removeMine();pad.focus()});
      form.addEventListener('submit',async e=>{e.preventDefault();if(!ok()){if(!mail.checkValidity()){msg.textContent='That email doesn’t look right.';el.classList.add('err')}return}
        const body={message:ta.value.trim(),email:mail.value.trim(),website:form.website.value,ms:Date.now()-opened};
        el.classList.add('sending');send.disabled=true;send.textContent='Sending…';ta.readOnly=mail.readOnly=true;
        try{if(DEMO)await new Promise(r=>setTimeout(r,700));
          else{const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});if(!r.ok)throw new Error(r.status)}
          sent(el)}
        catch(_){el.classList.remove('sending');ta.readOnly=mail.readOnly=false;send.disabled=false;send.textContent='Try again ↗';el.classList.add('err');
          msg.innerHTML=`Didn’t send. <a href="mailto:${EMAIL}?subject=${encodeURIComponent('A note from waande.com')}&body=${encodeURIComponent(ta.value)}">Email me instead ↗</a>`}});
      if(deck){order=[mine,...order];ease(notes,false);layoutDeck();notes.forEach(paint);repin(mine);ta.focus({preventScroll:true});return}
      const px=parseFloat(pad.style.left),py=parseFloat(pad.style.top);mine.x=px-10;mine.y=py-20;mine.r=4;paint(mine);front(mine);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{ease([mine],true);mine.x=clamp(W/2-mine.w/2+30,0,W-mine.w);mine.y=clamp(H-mine.h-110,0,H-mine.h);mine.base=mine.r=-2.5;paint(mine);const m=mine;
        setTimeout(()=>{ta.focus({preventScroll:true});repin(m)},reduce?0:600)}))});
    // sent: a stamp lands on the note, then it flies off the desk to Ayo
    function sent(el){const n=el._n;el.classList.remove('sending');el.classList.add('sent');
      el.querySelector('.mine-msg').textContent='Pinned to Ayo’s board ✓';
      setTimeout(()=>{if(!el.isConnected)return;loose(n);ease([n],true);el.style.opacity=0;n.y-=deck?0:60;n.x+=deck?W:80;n.r+=12;paint(n);
        setTimeout(()=>{removeMine();padLabel.textContent='Sent. Thank you.';pad.focus({preventScroll:true});setTimeout(()=>padLabel.textContent='Your turn.',5000)},reduce?0:650)},reduce?600:1500)}

    // first time the board scrolls into view, the notes land one by one
    layout(false);
    if(!reduce&&'IntersectionObserver' in window){notes.forEach(n=>{n.el.classList.add('pre','loose');n.el.style.transform=`translate3d(${n.x}px,${n.y-28}px,0) rotate(${n.r*2}deg)`});
      const io=new IntersectionObserver(es=>{if(!es[0].isIntersecting||dealt)return;dealt=true;io.disconnect();
        notes.forEach((n,i)=>{n.el.style.transitionDelay=(i*80)+'ms';ease([n],true);n.el.classList.remove('pre');paint(n);setTimeout(()=>repin(n),560+i*110)});
        setTimeout(()=>notes.forEach(n=>{n.el.style.transitionDelay='';ease([n],false)}),1400)},{threshold:.25});io.observe(board)}
    let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{const was=deck;measure();if(was!==deck||!deck)layout(false);else{layoutDeck();notes.forEach(paint)}},150)});
    document.fonts&&document.fonts.ready.then(()=>{if(!drag)layout(false)});
  })();
