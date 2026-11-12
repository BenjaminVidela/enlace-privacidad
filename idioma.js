// Idioma de las páginas legales (privacidad y condiciones).
// Página pública, sin acceso al localStorage de la app (otro origen):
// arranca en ?lang=es|pt|en si viene en el link, y si no según el idioma del
// navegador. El selector cambia solo esta vista, y los links entre las dos
// páginas llevan el idioma elegido.
(function () {
  var soportados = ['es', 'pt', 'en'];
  var param = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1];
  var nav = (navigator.language || 'es').slice(0, 2).toLowerCase();
  var inicial = soportados.indexOf(param) !== -1 ? param : (soportados.indexOf(nav) !== -1 ? nav : 'es');

  var switchEl = document.getElementById('langSwitch');

  function mostrarIdioma(lang) {
    document.querySelectorAll('.policy').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    soportados.forEach(function (l) {
      document.querySelectorAll('[data-t-' + l + ']').forEach(function (el) { el.hidden = l !== lang; });
    });
    switchEl.querySelectorAll('button').forEach(function (btn) {
      btn.classList.toggle('activo', btn.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('.tabs a, a[data-link-lang]').forEach(function (a) {
      a.setAttribute('href', a.getAttribute('href').split('?')[0] + '?lang=' + lang);
    });
    document.documentElement.lang = lang;
  }

  switchEl.querySelectorAll('button').forEach(function (btn) {
    btn.addEventListener('click', function () { mostrarIdioma(btn.getAttribute('data-lang')); });
  });

  mostrarIdioma(inicial);
})();
