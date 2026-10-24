(function(c,l,a,r,i,t,y){
  if (l.querySelector('script[src*="clarity.ms/tag/'+i+'"]')) return;
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "z2uh5qzthv");

document.querySelector('.menu-btn')?.addEventListener('click', () => document.querySelector('.mobile-nav')?.classList.toggle('open'));
document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => document.querySelector('.mobile-nav')?.classList.remove('open')));
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Comrade Services virtual assistant — deterministic first version.
// It answers only from approved business information and never invents pricing or project-specific promises.
(function initComradeAssistant(){
  if (document.getElementById('comrade-assistant')) return;

  const style = document.createElement('style');
  style.textContent = `
    .ca-launcher{position:fixed;right:22px;bottom:22px;z-index:9998;border:0;border-radius:999px;background:#0b0e0f;color:#fff;box-shadow:0 14px 40px rgba(0,0,0,.28);padding:13px 17px;display:flex;align-items:center;gap:10px;font:800 12px/1 DM Sans,sans-serif;cursor:pointer;transition:.2s}
    .ca-launcher:hover{transform:translateY(-2px)}
    .ca-launcher-dot{width:9px;height:9px;border-radius:50%;background:#c9a35a;box-shadow:0 0 0 5px rgba(201,163,90,.14)}
    .ca-panel{position:fixed;right:22px;bottom:78px;z-index:10000;width:min(390px,calc(100vw - 28px));height:min(620px,calc(100vh - 110px));background:#fff;border:1px solid #e3e3df;border-radius:20px;box-shadow:0 26px 80px rgba(0,0,0,.25);overflow:hidden;display:none;grid-template-rows:auto 1fr auto;font-family:DM Sans,sans-serif}
    .ca-panel.open{display:grid;animation:ca-in .18s ease-out}
    @keyframes ca-in{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}
    .ca-head{background:#0b0e0f;color:#fff;padding:17px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px}
    .ca-head-main{display:flex;align-items:center;gap:11px}.ca-mark{width:35px;height:35px;border:1px solid #c9a35a;border-radius:9px;color:#e2c489;display:grid;place-items:center;font:800 16px Manrope,sans-serif}
    .ca-head strong{display:block;font:800 14px Manrope,sans-serif}.ca-head small{display:block;color:#9da4a6;font-size:10px;margin-top:3px}.ca-close{background:transparent;border:0;color:#fff;font-size:24px;line-height:1;cursor:pointer;padding:3px 5px}
    .ca-body{overflow:auto;padding:16px;background:#f7f6f2;scroll-behavior:smooth}.ca-msg{max-width:86%;padding:11px 13px;border-radius:14px;margin-bottom:10px;font-size:13px;line-height:1.45}.ca-msg.bot{background:#fff;border:1px solid #e3e3df;border-bottom-left-radius:5px;color:#202526}.ca-msg.user{background:#171b1d;color:#fff;margin-left:auto;border-bottom-right-radius:5px}.ca-msg a{font-weight:800;text-decoration:underline}.ca-typing{opacity:.62;font-size:12px}
    .ca-chips{display:flex;flex-wrap:wrap;gap:7px;margin:4px 0 14px}.ca-chip{border:1px solid #d9d7cf;background:#fff;border-radius:999px;padding:9px 11px;font:700 11px DM Sans,sans-serif;color:#343a3c;cursor:pointer}.ca-chip:hover{border-color:#c9a35a;background:#fcfaf4}
    .ca-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px}.ca-action{display:flex;align-items:center;justify-content:center;min-height:42px;border-radius:10px;font:800 11px DM Sans,sans-serif;text-decoration:none!important}.ca-action.primary{background:linear-gradient(135deg,#e2c489,#c9a35a);color:#18140d}.ca-action.dark{background:#14191b;color:#fff}
    .ca-foot{background:#fff;border-top:1px solid #e4e4df;padding:10px}.ca-form{display:grid;grid-template-columns:1fr auto;gap:8px}.ca-input{min-width:0;border:1px solid #d7d9da;border-radius:12px;padding:0 12px;height:44px;font:500 13px DM Sans,sans-serif;outline:none}.ca-input:focus{border-color:#c9a35a;box-shadow:0 0 0 3px rgba(201,163,90,.12)}.ca-send{height:44px;border:0;border-radius:12px;background:#0b0e0f;color:#fff;padding:0 14px;font:800 11px DM Sans,sans-serif;cursor:pointer}.ca-note{text-align:center;color:#92989a;font-size:9px;margin:7px 0 0}
    @media(max-width:680px){.ca-launcher{right:12px;bottom:84px;padding:12px 14px}.ca-panel{right:7px;left:7px;bottom:74px;width:auto;height:min(610px,calc(100vh - 90px));border-radius:18px}.ca-actions{grid-template-columns:1fr 1fr}}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'comrade-assistant';
  root.innerHTML = `
    <button class="ca-launcher" type="button" aria-label="Ask Comrade Services a question"><span class="ca-launcher-dot"></span><span>Ask a question</span></button>
    <section class="ca-panel" aria-label="Comrade Services assistant">
      <div class="ca-head">
        <div class="ca-head-main"><div class="ca-mark">C</div><div><strong>Comrade Assistant</strong><small>Windows & Doors • Local answers</small></div></div>
        <button class="ca-close" type="button" aria-label="Close assistant">×</button>
      </div>
      <div class="ca-body">
        <div class="ca-msg bot">Hi! I can help with replacement windows, doors, estimates, service areas, installation and warranty questions.</div>
        <div class="ca-chips">
          <button class="ca-chip" data-q="How much does window replacement cost?">Window pricing</button>
          <button class="ca-chip" data-q="How soon can you install?">How soon?</button>
          <button class="ca-chip" data-q="Do you provide the windows and doors?">Do you supply products?</button>
          <button class="ca-chip" data-q="What brands do you work with?">Brands</button>
          <button class="ca-chip" data-q="What areas do you serve?">Service area</button>
          <button class="ca-chip" data-q="What warranty do you offer?">Warranty</button>
        </div>
      </div>
      <div class="ca-foot">
        <form class="ca-form"><input class="ca-input" aria-label="Type your question" placeholder="Ask about your project…" autocomplete="off"><button class="ca-send" type="submit">Send</button></form>
        <p class="ca-note">Project-specific pricing and scheduling are confirmed by the Comrade Services team.</p>
      </div>
    </section>`;
  document.body.appendChild(root);

  const launcher = root.querySelector('.ca-launcher');
  const panel = root.querySelector('.ca-panel');
  const close = root.querySelector('.ca-close');
  const body = root.querySelector('.ca-body');
  const form = root.querySelector('.ca-form');
  const input = root.querySelector('.ca-input');

  const clarityEvent = name => {
    try { if (typeof window.clarity === 'function') window.clarity('event', name); } catch(e) {}
  };

  function openPanel(){
    panel.classList.add('open');
    launcher.style.display='none';
    clarityEvent('assistant_open');
    setTimeout(()=>input.focus(),120);
  }
  function closePanel(){
    panel.classList.remove('open');
    launcher.style.display='flex';
  }
  launcher.addEventListener('click', openPanel);
  close.addEventListener('click', closePanel);

  function addMessage(text, who='bot', html=false){
    const el=document.createElement('div');
    el.className='ca-msg '+who;
    if(html) el.innerHTML=text; else el.textContent=text;
    body.appendChild(el);
    body.scrollTop=body.scrollHeight;
    return el;
  }

  function actions(){
    return `<div class="ca-actions"><a class="ca-action primary" href="contact.html" data-ca="estimate">Free Estimate</a><a class="ca-action dark" href="tel:+12674428205" data-ca="call">Call Now</a></div>`;
  }

  function getAnswer(raw){
    const q=raw.toLowerCase().replace(/[’']/g,"'");

    if(/price|pricing|cost|how much|estimate|quote/.test(q)){
      return `Pricing depends on the number of units, size, style, material and installation conditions. We don't want to guess at a price without seeing the project. Comrade Services offers free estimates, often with appointments available as soon as the next day.${actions()}`;
    }
    if(/how soon|when can|schedule|lead time|how long.*before|install date/.test(q)){
      return `Free estimates can often be scheduled as soon as the next day. Installation timing depends on the products being ordered, manufacturing availability and the project itself. The team can give you a project-specific timeline after measuring.${actions()}`;
    }
    if(/how long.*install|one day|days to install|installation take/.test(q)){
      return `Many residential installations can be completed efficiently, and some projects are finished in a day. The exact time depends on the number of windows or doors, opening conditions and finish work required.${actions()}`;
    }
    if(/provide|supply|order|buy.*window|buy.*door|do you sell/.test(q)){
      return `Yes. Comrade Services can help with product selection and ordering, then handle removal, installation, insulation, weather sealing, capping, trim and cleanup from start to finish.${actions()}`;
    }
    if(/brand|andersen|pella|marvin|provia|okna/.test(q)){
      return `Comrade Services works with common window and door manufacturers in the local market, including Andersen, Pella, Marvin, ProVia and OKNA. The best product depends on your opening, performance goals and budget.${actions()}`;
    }
    if(/warranty|guarantee/.test(q)){
      return `Comrade Services includes a 2-year labor warranty on installation work. Product warranties vary by manufacturer.${actions()}`;
    }
    if(/where|area|serve|service area|county|philadelphia|bucks|montgomery|southampton|newtown|yardley|doylestown|warminster|king of prussia/.test(q)){
      return `Comrade Services is based in Southampton, PA and serves Bucks County, Montgomery County, Philadelphia and surrounding communities. Larger projects may be considered farther out as well.${actions()}`;
    }
    if(/window/.test(q) && /type|style|kind|options/.test(q)){
      return `We install double-hung, single-hung, casement, awning, sliding, picture, bay, bow, garden, basement/hopper and custom or specialty windows. If you're not sure what style you need, we can help during the estimate.${actions()}`;
    }
    if(/door/.test(q) && /type|style|kind|options/.test(q)){
      return `We handle entry doors, sliding patio doors, French or hinged patio doors, storm doors and larger specialty or multi-panel systems.${actions()}`;
    }
    if(/repair|glass only|pane|broken glass|fix/.test(q)){
      return `Comrade Services focuses mainly on window and door replacement and installation rather than simple glass-only repairs. For a damaged unit, the team can look at the situation and tell you whether replacement makes sense.${actions()}`;
    }
    if(/financ|payment plan|monthly payment/.test(q)){
      return `Financing isn't currently offered. The team can still provide a free estimate so you know the project cost before deciding how to proceed.${actions()}`;
    }
    if(/licensed|insured|experience|years/.test(q)){
      return `Yes — Comrade Services is licensed and insured, with 10+ years of installation experience and two professional crews.${actions()}`;
    }
    if(/free estimate|free quote|appointment|come out|measure/.test(q)){
      return `Yes. Estimates are free, with no obligation, and appointments are often available as soon as the next day. The team can measure the openings and discuss the right products for the project.${actions()}`;
    }
    if(/phone|call|text|contact/.test(q)){
      return `You can call or text Comrade Services at <a href="tel:+12674428205">(267) 442-8205</a>.${actions()}`;
    }
    return `I don't want to make up a project-specific answer. Comrade Services can give you an exact answer after learning a little more about your home and what you're replacing.${actions()}`;
  }

  function ask(question){
    const q=(question||'').trim();
    if(!q) return;
    addMessage(q,'user');
    input.value='';
    clarityEvent('assistant_question');
    const typing=addMessage('Checking that for you…','bot');
    typing.classList.add('ca-typing');
    setTimeout(()=>{
      typing.remove();
      addMessage(getAnswer(q),'bot',true);
      body.querySelectorAll('[data-ca="estimate"]').forEach(a=>a.onclick=()=>clarityEvent('assistant_estimate_click'));
      body.querySelectorAll('[data-ca="call"]').forEach(a=>a.onclick=()=>clarityEvent('assistant_call_click'));
    },260);
  }

  root.querySelectorAll('.ca-chip').forEach(btn=>btn.addEventListener('click',()=>ask(btn.dataset.q)));
  form.addEventListener('submit',e=>{e.preventDefault();ask(input.value);});
})();