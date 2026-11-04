/* Shrinks #stage (CSS zoom) until the slide and the controls fit the viewport, so no slide needs scrolling. */
'use strict';
(function () {
  const MIN = 0.72, STEP = 0.02;
  let queued = false;
  function overflow() { return document.scrollingElement.scrollHeight - window.innerHeight; }
  function fit() {
    queued = false;
    const stage = document.getElementById('stage');
    if (!stage || document.fullscreenElement && document.fullscreenElement !== document.documentElement) return;
    stage.style.zoom = '';
    let z = 1;
    while (overflow() > 0 && z > MIN) { z = Math.max(MIN, z - STEP); stage.style.zoom = String(z); }
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(fit); } }
  window.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('stage');
    new MutationObserver(queue).observe(stage, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden', 'aria-hidden'] });
    window.addEventListener('resize', queue);
    document.addEventListener('fullscreenchange', queue);
    stage.addEventListener('load', queue, true);
    stage.addEventListener('transitionend', queue, true);
    stage.addEventListener('animationend', queue, true);
    queue();
  });
})();
