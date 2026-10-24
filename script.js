(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "z2uh5qzthv");

document.querySelector('.menu-btn')?.addEventListener('click', () => document.querySelector('.mobile-nav')?.classList.toggle('open')); document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => document.querySelector('.mobile-nav')?.classList.remove('open'))); document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());