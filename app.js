// Interacciones de UI: menú móvil, lightbox, reveal y utilidades
(function(){
  const menuBtn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mainmenu');
  if(menuBtn && menu){
    menuBtn.addEventListener('click', ()=>{
      const open = menu.style.display === 'flex';
      menu.style.display = open ? 'none' : 'flex';
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
    // Cerrar menú cuando se hace click en un enlace (móvil)
    menu.addEventListener('click', (e)=>{
      const t = e.target;
      if(t && t.tagName === 'A' && window.innerWidth < 840){
        menu.style.display = 'none';
        menuBtn.setAttribute('aria-expanded','false');
      }
    });
  }

  // Scroll suave para anclas internas
  document.addEventListener('click', (e)=>{
    const link = e.target.closest('a[href^="#"]');
    if(!link) return;
    const id = link.getAttribute('href');
    if(id && id.length > 1){
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth'});
      }
    }
  });

  // FAQ acordeón
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = btn.nextElementSibling;
      if(panel){ panel.hidden = expanded; }
    });
  });

  // Lightbox de galería
  const gallery = document.querySelector('.gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if(gallery && lightbox && lightboxImg){
    gallery.addEventListener('click', (e)=>{
      const img = e.target.closest('img');
      if(!img) return;
      const full = img.getAttribute('data-full') || img.src;
      lightboxImg.src = full;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden','false');
    });
    lightbox.addEventListener('click', ()=>{
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden','true');
      setTimeout(()=>{ lightboxImg.src=''; }, 200);
    });
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden','true');
        setTimeout(()=>{ lightboxImg.src=''; }, 200);
      }
    });
  }

  // Reveal sincronizado con IntersectionObserver
  const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15}) : null;

  if(io){
    // Stagger reveal para entrada más profesional
    const targets = document.querySelectorAll('.gallery img, .contact-card, .career-card');
    targets.forEach((el, idx)=>{
      el.style.transitionDelay = (idx * 60)+'ms';
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.gallery img, .contact-card, .career-card').forEach(el=> el.classList.add('reveal'));
  }

  // Año dinámico en el footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
