/*!
 * AHSAN JANNAT — POLISHED MOTION SYSTEM v3.1
 * Burn (CSS clip-path flame) · Water (ripple) · Ghost · Flip · Fly
 */
(function () {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  const hasMouse = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 2;

  const css = document.createElement('style');
  css.textContent = `
    body{transition:opacity .16s ease,background .35s ease,color .35s ease;}
    body.aj-fade{opacity:0;}
    @media(hover:hover)and(pointer:fine){
      *,*::before,*::after{cursor:none!important;}
      #aj-cur{position:fixed;top:0;left:0;z-index:99999;pointer-events:none;}
      #aj-cur .cd{position:absolute;width:8px;height:8px;background:#6B8C6E;border-radius:50%;will-change:transform;transition:width .2s,height .2s,background .2s;}
      #aj-cur .cr{position:absolute;width:34px;height:34px;border:1.5px solid rgba(107,140,110,.55);border-radius:50%;will-change:transform;transition:width .35s,height .35s,border-color .35s;}
      body.ch #aj-cur .cd{width:14px;height:14px;background:#C9A0AC;}
      body.ch #aj-cur .cr{width:50px;height:50px;border-color:rgba(201,160,172,.7);}
    }
    #aj-canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;}
    #home,[id=home]{position:relative;overflow:hidden;}

    [data-m]{opacity:0;transform:translateY(28px);}
    [data-m].on{opacity:1;transform:translateY(0);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1);}

    /* BURN */
    @keyframes burnReveal {
      0%   {clip-path:polygon(0% 100%,0.0% 102%,4.8% 102%,9.5% 102%,14.3% 102%,19.0% 102%,23.8% 102%,28.6% 102%,33.3% 102%,38.1% 102%,42.9% 102%,47.6% 102%,52.4% 102%,57.1% 102%,61.9% 102%,66.7% 102%,71.4% 102%,76.2% 102%,81.0% 102%,85.7% 102%,90.5% 102%,95.2% 102%,100.0% 102%,100% 100%);filter:brightness(2.8) saturate(4) hue-rotate(-22deg) blur(3px);opacity:1;}
      25%  {clip-path:polygon(0% 100%,0.0% 74.0%,4.8% 80.7%,9.5% 78.8%,14.3% 74.5%,19.0% 73.8%,23.8% 74.3%,28.6% 68.6%,33.3% 66.4%,38.1% 70.9%,42.9% 79.3%,47.6% 77.8%,52.4% 75.2%,57.1% 73.5%,61.9% 75.5%,66.7% 68.7%,71.4% 66.0%,76.2% 68.2%,81.0% 78.0%,85.7% 77.0%,90.5% 75.9%,95.2% 73.6%,100.0% 77.0%,100% 100%);filter:brightness(2.0) saturate(3) hue-rotate(-14deg) blur(2px);}
      50%  {clip-path:polygon(0% 100%,0.0% 44.0%,4.8% 49.4%,9.5% 47.9%,14.3% 44.4%,19.0% 43.8%,23.8% 44.3%,28.6% 39.6%,33.3% 37.7%,38.1% 41.4%,42.9% 48.4%,47.6% 47.1%,52.4% 45.0%,57.1% 43.6%,61.9% 45.2%,66.7% 39.6%,71.4% 37.4%,76.2% 39.2%,81.0% 47.3%,85.7% 46.4%,90.5% 45.6%,95.2% 43.6%,100.0% 46.4%,100% 100%);filter:brightness(1.55) saturate(2) hue-rotate(-8deg) blur(.5px);}
      75%  {clip-path:polygon(0% 100%,0.0% 16.0%,4.8% 20.2%,9.5% 19.0%,14.3% 16.3%,19.0% 15.9%,23.8% 16.2%,28.6% 12.6%,33.3% 11.1%,38.1% 14.0%,42.9% 19.4%,47.6% 18.4%,52.4% 16.8%,57.1% 15.7%,61.9% 16.9%,66.7% 12.6%,71.4% 10.9%,76.2% 12.3%,81.0% 18.5%,85.7% 17.9%,90.5% 17.2%,95.2% 15.7%,100.0% 17.9%,100% 100%);filter:brightness(1.18) saturate(1.3) hue-rotate(-3deg) blur(0);}
      100% {clip-path:polygon(0% 100%,0.0% -2.0%,4.8% -2.0%,9.5% -2.0%,14.3% -2.0%,19.0% -2.0%,23.8% -2.0%,28.6% -2.0%,33.3% -2.0%,38.1% -2.0%,42.9% -2.0%,47.6% -2.0%,52.4% -2.0%,57.1% -2.0%,61.9% -2.0%,66.7% -2.0%,71.4% -2.0%,76.2% -2.0%,81.0% -2.0%,85.7% -2.0%,90.5% -2.0%,95.2% -2.0%,100.0% -2.0%,100% 100%);filter:brightness(1) saturate(1) hue-rotate(0) blur(0);opacity:1;}
    }
    @keyframes burnGlow {
      0%   {opacity:0;bottom:0%;}
      15%  {opacity:1;}
      85%  {opacity:1;}
      100% {opacity:0;bottom:100%;}
    }
    .burn-wrap{position:relative;overflow:hidden;}
    .burn-wrap::after{
      content:'';position:absolute;left:-5%;right:-5%;height:28px;bottom:0%;
      background:linear-gradient(to top,rgba(255,80,0,0),rgba(255,160,20,.55),rgba(255,230,60,.35),rgba(255,255,180,.15),transparent);
      filter:blur(6px);pointer-events:none;z-index:10;
      animation:burnGlow 1.25s cubic-bezier(.4,0,.6,1) forwards;
    }
    section[data-effect=burn] [data-m].on{
      animation:burnReveal 1.25s cubic-bezier(.4,0,.6,1) both;
      opacity:1;transform:none;
    }

    /* WATER */
    @keyframes waterReveal {
      0%   {opacity:0;transform:scale(1.06) translateY(-18px);filter:blur(12px) brightness(1.35) saturate(1.6);}
      28%  {opacity:.72;filter:blur(3.5px) brightness(1.1) saturate(1.15);}
      52%  {transform:scale(.982) translateY(5px);filter:blur(.5px) brightness(1.02);}
      68%  {transform:scale(1.012) translateY(-2.5px);}
      82%  {transform:scale(.996) translateY(1px);}
      100% {opacity:1;transform:scale(1) translateY(0);filter:blur(0) brightness(1) saturate(1);}
    }
    @keyframes waterRipple {
      0%   {transform:translate(-50%,-50%) scale(0);opacity:.6;border-width:3px;}
      40%  {opacity:.45;border-width:2px;}
      100% {transform:translate(-50%,-50%) scale(2.8);opacity:0;border-width:.5px;}
    }
    @keyframes waterRipple2 {
      0%   {transform:translate(-50%,-50%) scale(0);opacity:.4;border-width:2px;}
      100% {transform:translate(-50%,-50%) scale(2.2);opacity:0;border-width:.5px;}
    }
    .ripple-ring{
      position:absolute;left:50%;top:50%;width:80px;height:30px;
      border:3px solid rgba(100,180,255,.5);border-radius:50%;
      pointer-events:none;z-index:10;
      animation:waterRipple 1.0s cubic-bezier(.2,.6,.4,1) .1s forwards;
    }
    .ripple-ring-2{
      position:absolute;left:50%;top:50%;width:80px;height:30px;
      border:2px solid rgba(140,210,255,.4);border-radius:50%;
      pointer-events:none;z-index:10;
      animation:waterRipple2 1.1s cubic-bezier(.2,.6,.4,1) .25s forwards;
    }
    section[data-effect=water] [data-m].on{
      animation:waterReveal 1.1s cubic-bezier(.16,1,.3,1) both;
      opacity:1;transform:none;
    }

    /* GHOST */
    @keyframes ghostReveal {
      0%   {opacity:0;   filter:blur(14px) brightness(3) saturate(0) contrast(.35);transform:translate(-12px,-6px) skewX(-4deg);}
      7%   {opacity:.22;}
      16%  {opacity:.03; filter:blur(10px) brightness(2.2) saturate(.08);}
      28%  {opacity:.38; filter:blur(7px) brightness(1.75) saturate(.2);transform:translate(-7px,-3px) skewX(-2.5deg);}
      40%  {opacity:.08;}
      54%  {opacity:.58; filter:blur(4px) brightness(1.4) saturate(.45);transform:translate(-3px,-1px) skewX(-1deg);}
      65%  {opacity:.28;}
      78%  {opacity:.78; filter:blur(2px) brightness(1.15) saturate(.78);transform:translate(-1px,0);}
      88%  {opacity:.91;}
      100% {opacity:1;   filter:blur(0) brightness(1) saturate(1);transform:translate(0,0) skewX(0);}
    }
    section[data-effect=ghost] [data-m].on{
      animation:ghostReveal 1.85s cubic-bezier(.4,0,.2,1) both;
      opacity:1;transform:none;
    }

    /* FLIP */
    @keyframes flipReveal {
      0%   {opacity:0;transform:perspective(1100px) rotateY(-92deg) translateZ(-40px) scale(.9);}
      25%  {opacity:1;}
      70%  {transform:perspective(1100px) rotateY(7deg) translateZ(8px) scale(1.01);}
      86%  {transform:perspective(1100px) rotateY(-2.5deg) translateZ(2px) scale(1);}
      95%  {transform:perspective(1100px) rotateY(.8deg);}
      100% {opacity:1;transform:perspective(1100px) rotateY(0) translateZ(0) scale(1);}
    }
    section[data-effect=flip] [data-m].on{
      animation:flipReveal .88s cubic-bezier(.16,1,.3,1) both;
      opacity:1;transform:none;
    }

    /* FLY */
    @keyframes flyL  {from{opacity:0;transform:translateX(-110px) rotate(-8deg) scale(.88);}  to{opacity:1;transform:none;}}
    @keyframes flyR  {from{opacity:0;transform:translateX(110px)  rotate(8deg)  scale(.88);}  to{opacity:1;transform:none;}}
    @keyframes flyT  {from{opacity:0;transform:translateY(-90px)  rotate(-5deg) scale(.88);}  to{opacity:1;transform:none;}}
    @keyframes flyB  {from{opacity:0;transform:translateY(90px)   rotate(5deg)  scale(.88);}  to{opacity:1;transform:none;}}
    @keyframes flyTL {from{opacity:0;transform:translate(-85px,-85px) rotate(-11deg) scale(.78);} to{opacity:1;transform:none;}}
    @keyframes flyTR {from{opacity:0;transform:translate(85px,-85px)  rotate(11deg)  scale(.78);} to{opacity:1;transform:none;}}
    @keyframes flyBL {from{opacity:0;transform:translate(-85px,85px)  rotate(-11deg) scale(.78);} to{opacity:1;transform:none;}}
    @keyframes flyBR {from{opacity:0;transform:translate(85px,85px)   rotate(11deg)  scale(.78);} to{opacity:1;transform:none;}}
    section[data-effect=fly] [data-m]:nth-child(8n+1).on{animation:flyL  .72s cubic-bezier(.16,1,.3,1) both;opacity:1;transform:none;}
    section[data-effect=fly] [data-m]:nth-child(8n+2).on{animation:flyR  .72s cubic-bezier(.16,1,.3,1) both;opacity:1;transform:none;}
    section[data-effect=fly] [data-m]:nth-child(8n+3).on{animation:flyT  .72s cubic-bezier(.16,1,.3,1) both;opacity:1;transform:none;}
    section[data-effect=fly] [data-m]:nth-child(8n+4).on{animation:flyB  .72s cubic-bezier(.16,1,.3,1) both;opacity:1;transform:none;}
    section[data-effect=fly] [data-m]:nth-child(8n+5).on{animation:flyTL .72s cubic-bezier(.16,1,.3,1) both;opacity:1;transform:none;}
    section[data-effect=fly] [data-m]:nth-child(8n+6).on{animation:flyTR .72s cubic-bezier(.16,1,.3,1) both;opacity:1;transform:none;}
    section[data-effect=fly] [data-m]:nth-child(8n+7).on{animation:flyBL .72s cubic-bezier(.16,1,.3,1) both;opacity:1;transform:none;}
    section[data-effect=fly] [data-m]:nth-child(8n+8).on{animation:flyBR .72s cubic-bezier(.16,1,.3,1) both;opacity:1;transform:none;}
    section[data-effect=fly] [data-m].on{animation:flyL .72s cubic-bezier(.16,1,.3,1) both;opacity:1;transform:none;}

    .tag-label{opacity:0;transform:translateX(-14px);transition:opacity .55s ease,transform .55s ease;}
    .tag-label.on{opacity:1;transform:translateX(0);}
    .w-reveal{display:inline-block;opacity:0;transform:perspective(500px) translateY(36px) rotateX(22deg);animation:wrev .85s cubic-bezier(.16,1,.3,1) forwards;}
    @keyframes wrev{to{opacity:1;transform:perspective(500px) translateY(0) rotateX(0);}}
    .svc-card,.case-card,.testi-card,.proj-card,.tool-card,.blog-card,.post-card,.callout,.why-card,.tool-badge,.cert-card,.achieve-card{transform-style:preserve-3d;transition:transform .5s cubic-bezier(.25,.46,.45,.94),box-shadow .5s;}
    .portrait-wrap,.hero-split-portrait{transform-style:preserve-3d;transition:transform .55s cubic-bezier(.25,.46,.45,.94);}
    .btn{display:inline-block;position:relative;overflow:hidden;transition:transform .15s ease;}
    .btn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.1);transform:translateX(-110%) skewX(-10deg);transition:transform .45s cubic-bezier(.25,.46,.45,.94);pointer-events:none;}
    .btn:hover::after{transform:translateX(110%) skewX(-10deg);}
    .tl-dot{animation:tlp 2.4s ease-in-out infinite;}
    @keyframes tlp{0%,100%{box-shadow:0 0 0 0 rgba(107,140,110,.4);}50%{box-shadow:0 0 0 7px rgba(107,140,110,0);}}
    #navbar.glass{backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);background:var(--navbar-bg)!important;}
    .sparkline polyline{stroke-dasharray:300;stroke-dashoffset:300;transition:stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1);}
    .sparkline polyline.drawn{stroke-dashoffset:0;}
    #aj-read-bar{position:fixed;top:0;left:0;height:2px;z-index:99998;background:linear-gradient(90deg,#6B8C6E,#C9A0AC);width:0;transition:width .1s linear;}
    #loader{transition:transform .75s cubic-bezier(.76,0,.24,1),opacity .5s!important;}
    #loader.done{transform:perspective(500px) rotateX(-90deg) translateY(-60%)!important;opacity:0!important;}
    .n-box,.logo-box-f{transition:transform .5s cubic-bezier(.25,.46,.45,.94);backface-visibility:hidden;}
    .n-box:hover,.logo-box-f:hover{transform:rotateY(180deg) scale(1.05);}
    .para-hidden{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1);}
    .para-hidden.para-on{opacity:1;transform:translateY(0);}

    @keyframes navFlyL{from{opacity:0;transform:translateX(-80px) rotate(-10deg);} to{opacity:1;transform:none;}}
    @keyframes navFlyR{from{opacity:0;transform:translateX(80px)  rotate(10deg); } to{opacity:1;transform:none;}}
    @keyframes navFlyT{from{opacity:0;transform:translateY(-70px) scale(.75);   } to{opacity:1;transform:none;}}
    @keyframes navFlyB{from{opacity:0;transform:translateY(70px)  scale(.75);   } to{opacity:1;transform:none;}}
    @keyframes navFlyTL{from{opacity:0;transform:translate(-70px,-70px) rotate(-12deg) scale(.65);} to{opacity:1;transform:none;}}
    @keyframes navFlyTR{from{opacity:0;transform:translate(70px,-70px)  rotate(12deg)  scale(.65);} to{opacity:1;transform:none;}}
    @keyframes navFlyBL{from{opacity:0;transform:translate(-70px,70px)  rotate(-10deg) scale(.65);} to{opacity:1;transform:none;}}
    @keyframes navFlyBR{from{opacity:0;transform:translate(70px,70px)   rotate(10deg)  scale(.65);} to{opacity:1;transform:none;}}

    @media(prefers-reduced-motion:reduce){
      *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
      [data-m],.tag-label,.w-reveal,.para-hidden{opacity:1!important;transform:none!important;animation:none!important;}
      #aj-cur,#aj-read-bar{display:none!important;}
      *{cursor:auto!important;}
    }
  `;
  document.head.appendChild(css);

  if (reduceMotion) {
    document.querySelectorAll('[data-reveal],[data-m]').forEach(el=>{el.setAttribute('data-m','');el.classList.add('on');});
    document.querySelectorAll('.tag-label').forEach(el=>el.classList.add('on'));
    document.querySelectorAll('.count[data-target]').forEach(el=>{el.textContent=el.dataset.target;});
    return;
  }

  const FX=['fly','burn','water','ghost','flip','burn','water','fly','ghost','flip'];
  document.querySelectorAll('section.section:not([id=home]):not([data-effect])').forEach((s,i)=>{s.dataset.effect=FX[i%FX.length];});

  function addRipple(el) {
    if (!el.style.position || el.style.position==='static') el.style.position='relative';
    const r1=document.createElement('div'); r1.className='ripple-ring';
    const r2=document.createElement('div'); r2.className='ripple-ring-2';
    el.appendChild(r1); el.appendChild(r2);
    setTimeout(()=>{r1.remove();r2.remove();}, 1400);
  }
  function wrapBurn(el) { el.classList.add('burn-wrap'); }

  let navigating=false,safetyT=null;
  function triggerFade(dest){
    if(navigating)return;navigating=true;
    document.body.classList.add('aj-fade');
    sessionStorage.setItem('aj-nav','1');
    safetyT=setTimeout(()=>{navigating=false;document.body.classList.remove('aj-fade');},1200);
    setTimeout(()=>{ window.location.href=dest; },150);
  }
  document.querySelectorAll('a[href]').forEach(link=>{const h=link.getAttribute('href')||'';if(!h||h.startsWith('#')||h.startsWith('mailto:')||h.startsWith('tel:')||h.startsWith('http')||link.hasAttribute('download')||link.target==='_blank')return;link.addEventListener('click',e=>{e.preventDefault();triggerFade(h);});});
  if(sessionStorage.getItem('aj-nav')){
    sessionStorage.removeItem('aj-nav');
    document.body.style.transition='none';
    document.body.classList.add('aj-fade');
    requestAnimationFrame(()=>{
      document.body.style.removeProperty('transition');
      requestAnimationFrame(()=>{ document.body.classList.remove('aj-fade'); });
    });
    const ldr=document.getElementById('loader');if(ldr)ldr.style.cssText='opacity:0!important;visibility:hidden!important;z-index:0!important;';
  }
  window.addEventListener('pageshow',()=>{
    navigating=false;
    if(safetyT){clearTimeout(safetyT);safetyT=null;}
    document.body.style.transition='none';
    document.body.classList.remove('aj-fade');
    requestAnimationFrame(()=>{ document.body.style.removeProperty('transition'); });
  });

  if(hasMouse){const cur=document.createElement('div');cur.id='aj-cur';cur.innerHTML='<div class="cd"></div><div class="cr"></div>';document.body.appendChild(cur);const dot=cur.querySelector('.cd'),ring=cur.querySelector('.cr');let mx=-200,my=-200,rx=-200,ry=-200;document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});document.addEventListener('mousedown',()=>document.body.classList.add('cd'));document.addEventListener('mouseup',()=>document.body.classList.remove('cd'));document.addEventListener('mouseover',e=>{document.body.classList.toggle('ch',!!e.target.closest('a,button,.btn,.svc-card,.proj-card,.testi-card,.case-card,.blog-card,.tool-card,.post-card,.callout,.why-card,.tool-badge'));});(function loop(){dot.style.transform='translate('+mx+'px,'+my+'px) translate(-50%,-50%)';rx+=(mx-rx)*.09;ry+=(my-ry)*.09;ring.style.transform='translate('+rx+'px,'+ry+'px) translate(-50%,-50%)';requestAnimationFrame(loop);})();}

  if(document.querySelector('.post-body,.blog-post-body,article')){const bar=document.createElement('div');bar.id='aj-read-bar';document.body.appendChild(bar);window.addEventListener('scroll',()=>{const s=document.documentElement;bar.style.width=(s.scrollTop/(s.scrollHeight-s.clientHeight)*100)+'%';},{passive:true});}

  const heroSec=document.getElementById('home');
  if(heroSec&&!isMobile){
    const s3=document.createElement('script');
    s3.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s3.onload=function(){
      const canvas=document.createElement('canvas');canvas.id='aj-canvas';heroSec.insertBefore(canvas,heroSec.firstChild);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x000000,0);
      const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,1000);cam.position.z=5;
      const resize=()=>{const w=heroSec.offsetWidth,h=heroSec.offsetHeight;renderer.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix();};resize();window.addEventListener('resize',resize);
      const N=isLowEnd?130:270,pos=new Float32Array(N*3),col=new Float32Array(N*3),vel=[];
      const C1=new THREE.Color('#6B8C6E'),C2=new THREE.Color('#C9A0AC');
      for(let i=0;i<N;i++){pos[i*3]=(Math.random()-.5)*18;pos[i*3+1]=(Math.random()-.5)*11;pos[i*3+2]=(Math.random()-.5)*7;const c=Math.random()>.5?C1:C2;col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b;vel.push({x:(Math.random()-.5)*.003,y:(Math.random()-.5)*.003,z:(Math.random()-.5)*.002});}
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('color',new THREE.BufferAttribute(col,3));
      const pts=new THREE.Points(geo,new THREE.PointsMaterial({size:.08,vertexColors:true,transparent:true,opacity:.65,sizeAttenuation:true}));scene.add(pts);
      const lp=[];for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const dx=pos[i*3]-pos[j*3],dy=pos[i*3+1]-pos[j*3+1],dz=pos[i*3+2]-pos[j*3+2];if(dx*dx+dy*dy+dz*dz<7.5){lp.push(new THREE.Vector3(pos[i*3],pos[i*3+1],pos[i*3+2]));lp.push(new THREE.Vector3(pos[j*3],pos[j*3+1],pos[j*3+2]));}}
      scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lp),new THREE.LineBasicMaterial({color:0x6B8C6E,transparent:true,opacity:.07})));
      const gems=[];[0x6B8C6E,0xC9A0AC,0x4F6E52,0xB07888,0x9AB89D].forEach((c,i)=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.1+Math.random()*.12,0),new THREE.MeshPhongMaterial({color:c,transparent:true,opacity:.5,wireframe:i%2===0,shininess:100}));m.position.set((Math.random()-.5)*10,(Math.random()-.5)*5,(Math.random()-.5)*3);m.userData={vy:(Math.random()-.5)*.007,vx:(Math.random()-.5)*.005,rx:(Math.random()-.5)*.02,ry:(Math.random()-.5)*.015};scene.add(m);gems.push(m);});
      scene.add(new THREE.AmbientLight(0xffffff,.5));const dl=new THREE.DirectionalLight(0x6B8C6E,1.2);dl.position.set(5,3,5);scene.add(dl);const pl=new THREE.PointLight(0xC9A0AC,.8,20);pl.position.set(-5,-3,3);scene.add(pl);
      let tx=0,ty=0,cx=0,cy=0,t=0;
      document.addEventListener('mousemove',e=>{tx=(e.clientX/innerWidth-.5)*1.1;ty=(e.clientY/innerHeight-.5)*.7;});
      (function loop(){requestAnimationFrame(loop);t+=.007;cx+=(tx-cx)*.04;cy+=(ty-cy)*.04;for(let i=0;i<N;i++){pos[i*3]+=vel[i].x;pos[i*3+1]+=vel[i].y+Math.sin(t+i*.4)*.0007;pos[i*3+2]+=vel[i].z;if(Math.abs(pos[i*3])>9){pos[i*3]*=-.95;vel[i].x*=-1;}if(Math.abs(pos[i*3+1])>6){pos[i*3+1]*=-.95;vel[i].y*=-1;}if(Math.abs(pos[i*3+2])>4){pos[i*3+2]*=-.95;vel[i].z*=-1;}}geo.attributes.position.needsUpdate=true;gems.forEach(g=>{g.rotation.x+=g.userData.rx;g.rotation.y+=g.userData.ry;g.position.y+=g.userData.vy;g.position.x+=g.userData.vx;if(Math.abs(g.position.y)>4)g.userData.vy*=-1;if(Math.abs(g.position.x)>6)g.userData.vx*=-1;});pts.rotation.y=cx*.1;pts.rotation.x=-cy*.07;scene.rotation.y=cx*.05;renderer.render(scene,cam);})();
    };
    document.head.appendChild(s3);
  }

  const h1=document.querySelector('.hero-h1');
  if(h1){
    const tw=document.createTreeWalker(h1,NodeFilter.SHOW_TEXT);
    const nodes=[];let tn;
    while((tn=tw.nextNode())){let skip=false,p=tn.parentNode;while(p&&p!==h1){if(p.id==='typedText'||p.id==='cursor'){skip=true;break;}p=p.parentNode;}if(!skip)nodes.push(tn);}
    let wi=0;
    nodes.forEach(node=>{
      const words=node.textContent.split(/(\s+)/),frag=document.createDocumentFragment();
      words.forEach(w=>{
        if(!w.trim()){frag.appendChild(document.createTextNode(w));return;}
        const sp=document.createElement('span');sp.className='w-reveal';sp.textContent=w;sp.style.animationDelay=(wi++*.06)+'s';frag.appendChild(sp);
      });
      node.parentNode.replaceChild(frag,node);
    });
  }

  document.querySelectorAll('.tag-label').forEach(el=>el.setAttribute('data-tag',''));
  const tagIO=new IntersectionObserver(entries=>{entries.forEach(en=>{if(!en.isIntersecting)return;en.target.classList.add('on');tagIO.unobserve(en.target);});},{threshold:.4});
  document.querySelectorAll('[data-tag]').forEach(el=>tagIO.observe(el));
  document.querySelectorAll('[data-reveal]').forEach(el=>{el.setAttribute('data-m',el.getAttribute('data-reveal'));el.removeAttribute('data-reveal');});

  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting)return;
      const el=en.target;
      const section=el.closest('section[data-effect]');
      const effect=section?section.dataset.effect:'default';
      const delay=parseFloat(el.style.animationDelay||el.style.transitionDelay)||0;
      el.style.animationDelay=delay+'s';
      if(effect==='burn'){wrapBurn(el);}
      else if(effect==='water'){addRipple(el);}
      el.classList.add('on');
      io.unobserve(el);
    });
  },{threshold:.08});

  document.querySelectorAll('[data-m]').forEach(el=>io.observe(el));
  const GRIDS='.svc-grid,.cases-grid,.testi-grid,.proj-grid,.tools-grid,.blog-grid,.blog-posts-grid,.post-grid,.certs-grid,.why-grid,.tool-badge-grid';
  document.querySelectorAll(GRIDS).forEach(parent=>{
    Array.from(parent.children).forEach((child,i)=>{
      if(!child.hasAttribute('data-m')){
        child.setAttribute('data-m','up');
        child.style.animationDelay=(i*.08)+'s';
        io.observe(child);
      }
    });
  });

  const NDIRS=['navFlyL','navFlyR','navFlyTL','navFlyBR','navFlyT','navFlyBL','navFlyTR','navFlyBR'];
  const mobNav=document.querySelector('nav.mob-menu,#mob-nav,.mob-nav');
  if(mobNav){
    const nlinks=Array.from(mobNav.querySelectorAll('a,.btn'));
    nlinks.forEach(el=>{el.style.opacity='0';});
    new MutationObserver(()=>{
      const open=mobNav.classList.contains('open')||mobNav.classList.contains('active')||getComputedStyle(mobNav).display!=='none';
      nlinks.forEach((el,i)=>{
        if(open){
          el.style.animation='none';
          requestAnimationFrame(()=>requestAnimationFrame(()=>{
            el.style.animation=NDIRS[i%8]+' .55s cubic-bezier(.16,1,.3,1) '+(i*.07)+'s both';
          }));
        }else{
          el.style.animation='';el.style.opacity='0';
        }
      });
    }).observe(mobNav,{attributes:true,attributeFilter:['class','style']});
  }

  document.querySelectorAll('.svc-card,.case-card,.testi-card,.proj-card,.tool-card,.blog-card,.post-card,.callout,.why-card,.achieve-card,.cert-card').forEach(card=>{
    let raf=null,le=null;
    card.addEventListener('mousemove',e=>{le=e;if(raf)return;raf=requestAnimationFrame(()=>{const r=card.getBoundingClientRect(),x=(le.clientX-r.left)/r.width-.5,y=(le.clientY-r.top)/r.height-.5;card.style.transform='perspective(750px) rotateY('+(x*13)+'deg) rotateX('+(-y*9)+'deg) translateZ(10px)';raf=null;});});
    card.addEventListener('mouseleave',()=>{raf=null;card.style.transform='perspective(750px) rotateY(0) rotateX(0) translateZ(0)';});
  });
  const portrait=document.querySelector('.portrait-wrap,.hero-split-portrait');
  if(portrait){
    portrait.addEventListener('mousemove',e=>{const r=portrait.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;portrait.style.transform='perspective(650px) rotateY('+(x*17)+'deg) rotateX('+(-y*13)+'deg) scale(1.03)';});
    portrait.addEventListener('mouseleave',()=>{portrait.style.transform='perspective(650px) rotateY(0) rotateX(0) scale(1)';});
  }

  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.transform='translate('+((e.clientX-r.left-r.width/2)*.2)+'px,'+((e.clientY-r.top-r.height/2)*.2)+'px)';});
    btn.addEventListener('mouseleave',()=>{btn.style.transition='transform .5s cubic-bezier(.25,.46,.45,.94)';btn.style.transform='';});
    btn.addEventListener('mouseenter',()=>{btn.style.transition='transform .12s ease';});
  });

  const cntIO=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting)return;
      const el=en.target,target=+el.dataset.target,t0=performance.now(),DUR=1600;
      (function tick(now){
        const p=Math.min((now-t0)/DUR,1),ease=1-Math.pow(1-p,4);
        el.textContent=Math.round(ease*target);el.style.transform='perspective(180px) rotateX('+((1-ease)*40)+'deg)';el.style.opacity=.2+ease*.8;
        if(p<1)requestAnimationFrame(tick);else{el.style.transform='';el.style.opacity='';}
      })(t0);
      cntIO.unobserve(el);
    });
  },{threshold:.5});
  document.querySelectorAll('.count[data-target]').forEach(el=>cntIO.observe(el));

  const spIO=new IntersectionObserver(entries=>{entries.forEach(en=>{if(!en.isIntersecting)return;en.target.classList.add('drawn');spIO.unobserve(en.target);});},{threshold:.5});
  document.querySelectorAll('.sparkline polyline').forEach(el=>{el.style.strokeDasharray=300;el.style.strokeDashoffset=300;spIO.observe(el);});

  const nav=document.getElementById('navbar');
  if(nav){const f=()=>nav.classList.toggle('glass',scrollY>50);window.addEventListener('scroll',f,{passive:true});f();}

  const blobs=[{el:document.querySelector('.hero-blob-1'),f:.055},{el:document.querySelector('.hero-blob-2'),f:-.04},{el:document.querySelector('.dot-pattern'),f:.03}].filter(b=>b.el);
  window.addEventListener('scroll',()=>{const y=scrollY;blobs.forEach(b=>{b.el.style.transform='translateY('+(y*b.f)+'px)';});},{passive:true});

  const pb=document.querySelector('.post-body,.blog-post-body,article .content');
  if(pb){
    const pIO=new IntersectionObserver(entries=>{entries.forEach(en=>{if(!en.isIntersecting)return;en.target.classList.add('para-on');pIO.unobserve(en.target);});},{threshold:.15});
    pb.querySelectorAll('p,h2,h3,h4,ul,ol,blockquote,.callout').forEach(el=>{el.classList.add('para-hidden');pIO.observe(el);});
  }

  const loader=document.getElementById('loader');
  if(loader){
    new MutationObserver(()=>{
      if(loader.classList.contains('done')){loader.style.transform='perspective(500px) rotateX(-90deg) translateY(-60%)';loader.style.opacity='0';}
    }).observe(loader,{attributes:true,attributeFilter:['class']});
  }

})();
