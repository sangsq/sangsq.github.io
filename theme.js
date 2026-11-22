// Day/night mode for every page of the site. Night is the default, and the choice is remembered
// in this browser. Load it synchronously in <head> so the theme is set before the page paints.
(function () {
  var root = document.documentElement;
  var theme = 'dark';
  try { theme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
  root.setAttribute('data-theme', theme);

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8' +
    'M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>';

  // Button style, plus a print rule so a page printed in night mode still prints light.
  var CSS = '#theme-toggle{position:absolute;top:1rem;right:1rem;width:2.25rem;height:2.25rem;padding:0;' +
    'display:grid;place-items:center;border:1px solid var(--rule);border-radius:50%;background:transparent;' +
    'color:var(--muted);cursor:pointer}' +
    '#theme-toggle:hover{color:var(--fg);border-color:var(--muted)}' +
    '#theme-toggle svg{width:1.1rem;height:1.1rem}' +
    '@media print{#theme-toggle{display:none}:root[data-theme]{--bg:#fff;--fg:#111;--muted:#555;--rule:#ccc;' +
    '--accent:#2c5f9e;--note-bg:#eaf2fb;--todo-bg:#e6f4e2;--todo-fg:#2e5a27;--fig-a:#7fa6d9;--fig-b:#cfe0f3;' +
    '--fig-c:#e4f3e0}}';

  function init() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);  // last in <head>, so its print rule wins ties

    var button = document.createElement('button');
    button.id = 'theme-toggle';
    button.type = 'button';
    function show() {
      var dark = root.getAttribute('data-theme') === 'dark';
      var label = dark ? 'Switch to day mode' : 'Switch to night mode';
      button.innerHTML = dark ? SUN : MOON;
      button.title = label;
      button.setAttribute('aria-label', label);
    }
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      show();
    });
    show();
    document.body.insertBefore(button, document.body.firstChild);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
