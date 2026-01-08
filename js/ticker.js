(function(){
  const defaultItems = [
    'New shops now available — Visit our Properties page',
    'Phase 2 residential towers now open for pre-sale',
    'Special launch offers: financing plans available',
    'Contact us for leasing information'
  ];

  async function loadData() {
    const paths = ['data/ticker.json','/data/ticker.json','../data/ticker.json'];
    for (const p of paths) {
      try {
        console.debug('[ticker] trying', p);
        const resp = await fetch(p,{cache:'no-store'});
        if (!resp.ok) { console.debug('[ticker] fetch failed', p, resp.status); continue; }
        const json = await resp.json();
        if (Array.isArray(json) && json.length) { console.debug('[ticker] loaded', p); return json; }
      } catch (e) { console.debug('[ticker] fetch error', p, e); }
    }
    console.debug('[ticker] using default items');
    return defaultItems;
  }

  function buildStrip(containerEl, items){
    // leave existing markup if fetch fails but ensure we have at least the items
    containerEl.innerHTML = '';
    const frag = document.createDocumentFragment();
    items.forEach(text => {
      const span = document.createElement('span');
      span.className = 'news-item';
      span.innerHTML = text;
      frag.appendChild(span);
    });
    // duplicate once for seamless loop on wide screens
    items.forEach(text => {
      const span = document.createElement('span');
      span.className = 'news-item';
      span.innerHTML = text;
      frag.appendChild(span);
    });
    containerEl.appendChild(frag);
  }

  function setupControls(root, strip) {
    const pauseBtn = root.querySelector('.ticker-pause');
    if (!pauseBtn) return;
    pauseBtn.style.display = 'inline-flex';
    pauseBtn.addEventListener('click', () => {
      strip.classList.toggle('paused');
      pauseBtn.textContent = strip.classList.contains('paused') ? '▶' : '❚❚';
    });
    strip.addEventListener('mouseenter', () => strip.classList.add('paused'));
    strip.addEventListener('mouseleave', () => strip.classList.remove('paused'));
    pauseBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pauseBtn.click(); } });
  }

  function startJSFallback(strip, viewport, durationSec = 18) {
    // Uses requestAnimationFrame to translate the strip continuously from 0 to -halfWidth
    let width = Math.max(1, strip.scrollWidth / 2);
    let startTime = null;
    let rafId = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      if (strip.classList.contains('paused')) { startTime = ts; rafId = requestAnimationFrame(step); return; }
      const elapsed = (ts - startTime) / 1000; // seconds
      const progress = (elapsed % durationSec) / durationSec; // 0..1
      const offset = -progress * width;
      strip.style.transform = `translateX(${offset}px)`;
      rafId = requestAnimationFrame(step);
    }

    function onResize() { width = Math.max(1, strip.scrollWidth / 2); }
    window.addEventListener('resize', onResize);
    if (strip.__tickerRaf) cancelAnimationFrame(strip.__tickerRaf);
    strip.__tickerStop = () => { if (rafId) cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); strip.style.transform = ''; };
    strip.__tickerRaf = requestAnimationFrame(step);
    console.debug('[ticker] JS fallback started (duration sec):', durationSec, 'width:', width);
  }

  // main init
  async function init() {
    const roots = document.querySelectorAll('.news-ticker');
    console.debug('[ticker] init: page=', location.href, 'roots found=', roots.length);
    if (!roots.length) return;
    const items = await loadData();

    // Ensure we have a shared start time so animation can continue across pages
    const DURATION = 18; // seconds (keeps in sync with CSS)
    if (!localStorage.getItem('tickerStart')) {
      localStorage.setItem('tickerStart', String(Date.now()));
      console.debug('[ticker] set tickerStart');
    }
    const startMs = Number(localStorage.getItem('tickerStart')) || Date.now();
    const elapsedSec = (Date.now() - startMs) / 1000;
    const initialProgress = (elapsedSec % DURATION) / DURATION; // 0..1
    const globalPaused = localStorage.getItem('tickerPaused') === '1';

    roots.forEach(root => {
      const strip = root.querySelector('.news-ticker__strip');
      const viewport = root.querySelector('.news-ticker__viewport');
      const pauseBtn = root.querySelector('.ticker-pause');
      if (!strip || !viewport) return;

      buildStrip(strip, items);
      setupControls(root, strip);

      // Sync pause button to stored state
      if (pauseBtn) {
        pauseBtn.textContent = globalPaused ? '▶' : '❚❚';
        if (globalPaused) strip.classList.add('paused');
      }

      // if CSS animation available, set negative animation-delay to resume from shared start
      const computed = window.getComputedStyle(strip);
      const animName = computed.animationName || computed.getPropertyValue('animation-name');
      const contentWidth = strip.scrollWidth;
      const viewWidth = viewport.clientWidth;

      console.debug('[ticker] computed', { animName, contentWidth, viewWidth, initialProgress });

      if (animName && animName !== 'none' && contentWidth / 2 > viewWidth) {
        // set animation-delay to negative elapsed so it appears continuous across pages
        const delay = - (elapsedSec % DURATION);
        strip.style.animationDelay = delay + 's';
        // ensure CSS paused state reflects stored pause flag
        if (globalPaused) strip.classList.add('paused');
        else strip.classList.remove('paused');
        // stop any existing JS fallback
        if (strip.__tickerStop) { strip.__tickerStop(); strip.__tickerRaf = null; }
      } else {
        // use JS fallback with initial progress offset
        if (strip.__tickerStop) { strip.__tickerStop(); }
        startJSFallback(strip, viewport, DURATION, initialProgress);
        if (globalPaused) strip.classList.add('paused');
      }

      // Update global pause when user toggles pause (persist across pages)
      if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
          const paused = strip.classList.contains('paused');
          // toggle happened in setupControls; persist the new state
          localStorage.setItem('tickerPaused', paused ? '1' : '0');
        });
      }

      // Re-evaluate on resize to switch between CSS/JS if necessary
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const newContentW = strip.scrollWidth;
          const newViewW = viewport.clientWidth;
          const newComputed = window.getComputedStyle(strip);
          const newAnim = newComputed.animationName || newComputed.getPropertyValue('animation-name');
          if (newAnim && newAnim !== 'none' && newContentW / 2 > newViewW) {
            // switch to CSS
            const elapsed = (Date.now() - startMs) / 1000;
            strip.style.animationDelay = - (elapsed % DURATION) + 's';
            if (strip.__tickerStop) { strip.__tickerStop(); strip.__tickerRaf = null; }
          } else {
            // switch to JS fallback
            if (!strip.__tickerRaf) startJSFallback(strip, viewport, DURATION, ((Date.now() - startMs) / 1000 % DURATION) / DURATION);
          }
        }, 150);
      });
    });
  }

  // Defer until DOM ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();