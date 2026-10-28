/* KOTOHA ── 共通の動き（全ページで読み込みます） */
if (/[?&]shot/.test(location.search)) document.documentElement.classList.add('shot');
(function(){
  var hdr = document.getElementById('hdr');
  if (!hdr) return;
  var hero = document.querySelector('.hero, .phero, .rp-hero, .ptitle');

  function onScroll(){
    var y = window.scrollY || 0;
    var h = hero ? hero.offsetHeight : 0;
    hdr.classList.toggle('solid', y > 40);
    if (!hdr.classList.contains('open')) hdr.classList.toggle('onHero', !!hero && y < h - 90);
  }
  addEventListener('scroll', onScroll, { passive:true });
  addEventListener('resize', onScroll);
  onScroll();

  /* メニュー（スマホ） */
  var burger = hdr.querySelector('.burger');
  if (burger) burger.addEventListener('click', function(){
    var open = hdr.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) hdr.classList.remove('onHero'); else onScroll();
  });
  hdr.querySelectorAll('nav a').forEach(function(a){
    a.addEventListener('click', function(){
      hdr.classList.remove('open');
      if (burger) burger.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    });
  });

  /* スクロールで現れる。対象は代表的なブロックを自動で拾う */
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !/[?&]shot/.test(location.search)) {
    var sel = '.h3s, .lead-split > *, .grid > *, .steps > *, .merits > *, .checks > li,'
            + ' .two-col > *, .cards > *, .rows > *, .band, .cta-inline, .box, .faq,'
            + ' .showcase, .ig-intro, .mission, .origin, .profile, .team > *, .strengths > *,'
            + ' .kpis > *, .posts > *, .phones > *, .floors > *, .worry > *, .nums > *,'
            + ' .after > *, .ln-reasons > *, .ln-bubbles > li, .rp-days > *, .rp-journey > li,'
            + ' .rp-perks > *, .rp-reviews > *, .sch > *, .cform';
    var els = [];
    document.querySelectorAll(sel).forEach(function(el){
      if (el.closest('.hdr, .ft, .toc, .marq, .tako-follower')) return;
      if (el.classList.contains('rv')) return;
      els.push(el);
    });
    els.forEach(function(el){ el.classList.add('rv'); });
    /* 同じ親の兄弟には少しずつ遅れを付ける */
    var seen = new Map();
    els.forEach(function(el){
      var p = el.parentElement;
      var n = (seen.get(p) || 0);
      if (n) el.style.setProperty('--i', Math.min(n, 4));
      seen.set(p, n + 1);
    });
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { threshold:.08, rootMargin:'0px 0px -5% 0px' });
    els.forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function(el){ el.classList.add('on'); });
  }
})();
