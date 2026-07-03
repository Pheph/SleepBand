// starfield
(function(){
  var s=document.getElementById('stars');
  if(!s) return;
  var n=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:60;
  for(var i=0;i<n;i++){
    var d=document.createElement('span');
    d.className='star';
    var size=Math.random()*2+1;
    d.style.width=size+'px';d.style.height=size+'px';
    d.style.left=Math.random()*100+'%';
    d.style.top=Math.random()*70+'%';
    d.style.animationDelay=(Math.random()*5)+'s';
    s.appendChild(d);
  }
})();

// drag the moon charm handle on the headband; the charm itself slides along
// the band's curve, and the dark eclipse disc slides across the fixed golden
// moon-big in step, like a moon crossing the sun
(function(){
  var svg=document.getElementById('bandSvg');
  var charm=document.getElementById('moonCharm');
  if(!svg||!charm) return;
  var moonBig=document.querySelector('.moon-big');
  var eclipse=moonBig?moonBig.querySelector('.eclipse'):null;

  var BASE_X=150;
  var MIN_X=29, MAX_X=271; // drag range, clear of the band's rounded ends
  var PARALLAX_PX=90; // how far the eclipse disc slides across the moon
  var dragging=false;
  var curX=BASE_X;
  var reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setX(x){
    curX=Math.max(MIN_X,Math.min(MAX_X,x));
    var dx=curX-BASE_X;
    var norm=dx/(BASE_X-MIN_X);
    // the band arcs downward toward its ends; nudge the charm down along that
    // curve so it stays sitting on the band instead of floating off the top
    var dy=0.00211*dx*dx;
    charm.setAttribute('aria-valuenow',norm.toFixed(2));
    charm.style.transform='translate('+dx+'px,'+dy+'px)';
    if(eclipse) eclipse.style.transform='translateX('+(norm*PARALLAX_PX)+'px)';
  }
  function clientXToSvgX(clientX){
    var pt=svg.createSVGPoint();
    pt.x=clientX; pt.y=0;
    return pt.matrixTransform(svg.getScreenCTM().inverse()).x;
  }

  charm.addEventListener('pointerdown',function(e){
    dragging=true;
    charm.classList.add('dragging');
    if(moonBig) moonBig.classList.add('dragging');
    charm.setPointerCapture(e.pointerId);
    setX(clientXToSvgX(e.clientX));
  });
  charm.addEventListener('pointermove',function(e){
    if(!dragging) return;
    setX(clientXToSvgX(e.clientX));
  });
  function release(){
    if(!dragging) return;
    dragging=false;
    charm.classList.remove('dragging');
    charm.setAttribute('aria-valuenow','0');
    curX=BASE_X;
    // respect prefers-reduced-motion: the drag itself is direct user
    // interaction (fine to move), but the elastic snap-back on release
    // is an automatic animation — skip it and jump straight to rest.
    if(reducedMotion){
      charm.classList.add('reduced-motion');
      if(moonBig) moonBig.classList.add('reduced-motion');
      charm.style.transform='translate(0px,0px)';
      if(moonBig){moonBig.classList.remove('dragging');}
      if(eclipse) eclipse.style.transform='translateX(0px)';
      // let the instant reset apply, then drop the override so future
      // (non-reduced) transitions, if any, aren't permanently disabled
      requestAnimationFrame(function(){
        charm.classList.remove('reduced-motion');
        if(moonBig) moonBig.classList.remove('reduced-motion');
      });
    } else {
      charm.style.transform='translate(0px,0px)';
      if(moonBig){moonBig.classList.remove('dragging');}
      if(eclipse) eclipse.style.transform='translateX(0px)';
    }
  }
  charm.addEventListener('pointerup',release);
  charm.addEventListener('pointercancel',release);

  charm.addEventListener('keydown',function(e){
    if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight') return;
    e.preventDefault();
    setX(curX+(e.key==='ArrowLeft'?-14:14));
    clearTimeout(charm._snapTimer);
    charm._snapTimer=setTimeout(release,650);
  });
})();

// mobile menu
var mb=document.getElementById('menuBtn'), nl=document.getElementById('navLinks');
mb.addEventListener('click',function(){
  var open=nl.classList.toggle('open');
  mb.setAttribute('aria-expanded',open);
});
nl.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nl.classList.remove('open');mb.setAttribute('aria-expanded',false);});});

// scroll reveal
var io=new IntersectionObserver(function(entries){
  entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

// contact form (demo — projeto escolar, sem backend real)
var contactForm=document.getElementById('contactForm');
var emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
contactForm.addEventListener('submit',function(e){
  e.preventDefault();
  var name=document.getElementById('cname').value.trim();
  var mail=document.getElementById('cmail').value.trim();
  var msg=document.getElementById('formMsg');
  if(!name||!mail){msg.style.color='#ff9d9d';msg.textContent='Please add your name and email.';return;}
  if(!emailRegex.test(mail)){msg.style.color='#ff9d9d';msg.textContent='Please enter a valid email address.';return;}
  msg.style.color='var(--gold)';
  msg.textContent='Thanks, '+name+'! We\'ll be in touch soon.';
  contactForm.reset();
});
