/* =====================================================================
   MARMITA A MARI QUE FEZ — SCRIPT.JS
   JavaScript puro (Vanilla JS) — sem dependências externas.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------------
     1. HEADER — muda de transparente para sólido ao rolar a página
     ------------------------------------------------------------------- */
  const header = document.getElementById('header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // executa uma vez ao carregar, caso a página abra já rolada


  /* -------------------------------------------------------------------
     2. MENU MOBILE — hambúrguer animado
     ------------------------------------------------------------------- */
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  const toggleMobileMenu = () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    burgerBtn.classList.toggle('is-active', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  burgerBtn.addEventListener('click', toggleMobileMenu);

  // Fecha o menu mobile ao clicar em qualquer link
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) {
        toggleMobileMenu();
      }
    });
  });


  /* -------------------------------------------------------------------
     3. PARALLAX SUAVE NO HERO
     A imagem de fundo se move em velocidade diferente do scroll,
     criando sensação de profundidade.
     ------------------------------------------------------------------- */
  const heroBg = document.querySelector('[data-parallax]');
  const heroBgImg = heroBg ? heroBg.querySelector('.hero__bg-img') : null;

    const heroCarouselImages = [
    { src: 'banner/hero1.png', alt: 'Filé de tilápia grelhado com acompanhamentos' },
    { src: 'banner/hero2.png', alt: 'Frango ao molho servido com arroz e salada' },
    { src: 'banner/hero3.png', alt: 'Feijoada caseira com arroz e farofa' },
    { src: 'banner/hero4.png', alt: 'Bife acebolado suculento com cebolas caramelizadas' },
    { src: 'banner/hero5.png', alt: 'Prato especial da Marmita A Mari Que Fez' },
    { src: 'banner/hero6.png', alt: 'Entregador levando marmita quentinha até o cliente' },
    { src: 'banner/hero7.png', alt: 'Prato caseiro saboroso preparado com carinho' },
    { src: 'banner/hero8.png', alt: 'Refeição apetitoso para solução diária' },
    { src: 'banner/hero9.png', alt: 'Marmita caseira com acompanhamentos frescos' },
    { src: 'banner/hero11.png', alt: 'Moela ao molho temperada e bem servida' },
    { src: 'banner/hero12.png', alt: 'Marmita mista completa com variados acompanhamentos' }
  ];
  const heroDotsContainer = document.getElementById('hero-carousel-dots');
  const heroPrevBtn = document.getElementById('hero-carousel-prev');
  const heroNextBtn = document.getElementById('hero-carousel-next');
  let currentHeroIndex = 0;
  let heroAutoplayTimer = null;

  const updateHeroSlide = (index) => {
    if (!heroBgImg) return;
    currentHeroIndex = (index + heroCarouselImages.length) % heroCarouselImages.length;
    heroBgImg.src = heroCarouselImages[currentHeroIndex].src;
    heroBgImg.alt = heroCarouselImages[currentHeroIndex].alt;
    if (heroDotsContainer) {
      Array.from(heroDotsContainer.children).forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === currentHeroIndex);
      });
    }
  };

  const goToHeroSlide = (index) => {
    updateHeroSlide(index);
    resetHeroAutoplay();
  };

  const nextHeroSlide = () => goToHeroSlide(currentHeroIndex + 1);
  const prevHeroSlide = () => goToHeroSlide(currentHeroIndex - 1);

  const startHeroAutoplay = () => {
    heroAutoplayTimer = setInterval(nextHeroSlide, 5000);
  };

  const resetHeroAutoplay = () => {
    clearInterval(heroAutoplayTimer);
    startHeroAutoplay();
  };

  if (heroBgImg && heroDotsContainer && heroPrevBtn && heroNextBtn) {
    heroCarouselImages.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero__carousel-dot';
      dot.setAttribute('aria-label', `Ir para imagem ${index + 1}`);
      dot.addEventListener('click', () => goToHeroSlide(index));
      heroDotsContainer.appendChild(dot);
    });

    heroPrevBtn.addEventListener('click', prevHeroSlide);
    heroNextBtn.addEventListener('click', nextHeroSlide);
    updateHeroSlide(0);
    startHeroAutoplay();
  }

  const handleParallax = () => {
    if (!heroBgImg) return;
    const scrollY = window.scrollY;
    // Limita o efeito à altura do Hero para não gerar espaços vazios
    if (scrollY < window.innerHeight) {
      heroBgImg.style.transform = `scale(1.15) translateY(${scrollY * 0.25}px)`;
    }
  };

  window.addEventListener('scroll', handleParallax, { passive: true });


  /* -------------------------------------------------------------------
     4. SCROLL REVEAL — anima elementos ao entrarem na viewport
     Usa IntersectionObserver para melhor performance (evita
     recalcular no scroll).
     ------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // anima apenas uma vez
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));


  /* -------------------------------------------------------------------
     5. PORTFÓLIO — filtros por categoria
     ------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.portfolio__filter');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      // Atualiza estado visual dos botões
      filterButtons.forEach((btn) => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('is-active');
      button.setAttribute('aria-selected', 'true');

      // Mostra ou esconde os cards conforme a categoria
      portfolioCards.forEach((card) => {
        const matches = selectedFilter === 'all' || card.dataset.category === selectedFilter;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });


  /* -------------------------------------------------------------------
     6. PORTFÓLIO — Modal Premium
     ------------------------------------------------------------------- */
  const portfolioModal = document.getElementById('portfolio-modal');
  const portfolioModalOverlay = document.getElementById('portfolio-modal-overlay');
  const portfolioModalClose = document.getElementById('portfolio-modal-close');
  const portfolioModalImage = document.getElementById('portfolio-modal-image');
  const portfolioModalTitle = document.getElementById('portfolio-modal-title');
  const portfolioModalDescription = document.getElementById('portfolio-modal-description');
  const portfolioModalAccompaniments = document.getElementById('portfolio-modal-accompaniments');
  const portfolioModalPrep = document.getElementById('portfolio-modal-prep');
  const portfolioModalBadges = document.getElementById('portfolio-modal-badges');
  const portfolioModalWhatsapp = document.getElementById('portfolio-modal-whatsapp');
  const portfolioModalImageWrap = document.querySelector('.portfolio-modal__image-wrap');

    const portfolioData = {
    tilapia: {
      name: 'Filé de Tilápia',
      image: 'banner/hero1.png',
      description: 'Filé de tilápia cuidadosamente temperado e frito até atingir uma textura crocante por fora e macia por dentro.',
      accompaniments: ['Arroz branco', 'Feijão', 'Farofa', 'Legumes frescos'],
      preparation: 'Preparado diariamente com ingredientes frescos, temperos selecionados e cozimento artesanal para garantir sabor e qualidade.',
      badges: ['🥘 Feito na Hora', '🌿 Ingredientes Frescos', '🚚 Entrega Rápida', '❤️ Receita Caseira'],
      whatsapp: 'https://wa.me/5561991527783?text=Quero%20pedir%20o%20Fil%C3%A9%20de%20Til%C3%A1pia'
    },
    frango: {
      name: 'Frango ao Molho',
      image: 'banner/hero2.png',
      description: 'Frango ao molho caseiro, macio e suculento, servido com um tempero que lembra aquele almoço de família.',
      accompaniments: ['Arroz branco', 'Purê de batata', 'Salada verde', 'Farofa crocante'],
      preparation: 'Cozido com cuidado e temperos especiais, garantindo um molho cremoso e sabor marcante a cada garfada.',
      badges: ['🥘 Feito na Hora', '🌿 Ingredientes Frescos', '🚚 Entrega Rápida', '❤️ Receita Caseira'],
      whatsapp: 'https://wa.me/5561991527783?text=Quero%20pedir%20o%20Frango%20ao%20Molho'
    },
    feijoada: {
      name: 'Feijoada',
      image: 'banner/hero3.png',
      description: 'Feijoada completa com carne de qualidade, acompanhada de arroz, farofa e couve para uma experiência tradicional e reconfortante.',
      accompaniments: ['Arroz branco', 'Farofa', 'Couve refogada', 'Laranja fatiada'],
      preparation: 'Preparada lentamente com ingredientes selecionados e temperos caseiros para extrair todo o sabor típico brasileiro.',
      badges: ['🥘 Feito na Hora', '🌿 Ingredientes Frescos', '🚚 Entrega Rápida', '❤️ Receita Caseira'],
      whatsapp: 'https://wa.me/5561991527783?text=Quero%20pedir%20a%20Feijoada'
    },
    bife: {
      name: 'Bife Acebolado',
      image: 'banner/hero4.png',
      description: 'Bife acebolado suculento, grelhado na medida certa e servido com cebolas caramelizadas que realçam o sabor.',
      accompaniments: ['Arroz branco', 'Batata frita', 'Salada fresca', 'Vinagrete'],
      preparation: 'Cozido com cuidado em fogo médio para manter a suculência, acompanhado de cebolas douradas no ponto perfeito.',
      badges: ['🥘 Feito na Hora', '🌿 Ingredientes Frescos', '🚚 Entrega Rápida', '❤️ Receita Caseira'],
      whatsapp: 'https://wa.me/5561991527783?text=Quero%20pedir%20o%20Bife%20Acebolado'
    },
    moela: {
      name: 'Moela ao Molho',
      image: 'banner/hero11.png',
      description: 'Moela ao molho enriquecida com temperos selecionados, ideal para quem procura um prato cheio de personalidade.',
      accompaniments: ['Arroz branco', 'Purê de mandioca', 'Salada de tomate', 'Farofa'],
      preparation: 'Cozida lentamente até ficar macia e saborosa, com um molho encorpado que penetra em cada pedaço.',
      badges: ['🥘 Feito na Hora', '🌿 Ingredientes Frescos', '🚚 Entrega Rápida', '❤️ Receita Caseira'],
      whatsapp: 'https://wa.me/5561991527783?text=Quero%20pedir%20a%20Moela%20ao%20Molho'
    },
    mista: {
      name: 'Marmita Mista',
      image: 'banner/hero12.png',
      description: 'Marmita mista completa com variedade de sabores, ideal para quem deseja uma refeição equilibrada e prática.',
      accompaniments: ['Arroz branco', 'Feijão', 'Salada', 'Acompanhamento do dia'],
      preparation: 'Montada com ingredientes frescos e preparada diariamente para manter o sabor autêntico e caseiro.',
      badges: ['🥘 Feito na Hora', '🌿 Ingredientes Frescos', '🚚 Entrega Rápida', '❤️ Receita Caseira'],
      whatsapp: 'https://wa.me/5561991527783?text=Quero%20pedir%20a%20Marmita%20Mista'
    },
    entrega: {
      name: 'Entrega',
      image: 'banner/hero6.png',
      description: 'Serviço de entrega rápida e segura para que você receba a comida quentinha direto em sua casa.',
      accompaniments: ['Opções variadas', 'Embalagem segura', 'Condimentos incluídos'],
      preparation: 'Preparamos e entregamos com todo cuidado para preservar o sabor e a temperatura ideal até sua casa.',
      badges: ['🚚 Entrega Rápida', '📦 Embalagem Segura', '❤️ Atendimento Dedicado'],
      whatsapp: 'https://wa.me/5561991527783?text=Quero%20informações%20sobre%20a%20Entrega'
    }
  };

  const openPortfolioModal = (id) => {
    const dish = portfolioData[id];
    if (!dish) return;

    portfolioModalImage.src = dish.image;
    portfolioModalImage.alt = dish.name;
    portfolioModalTitle.textContent = dish.name;
    portfolioModalDescription.textContent = dish.description;
    portfolioModalPrep.textContent = dish.preparation;
    portfolioModalWhatsapp.href = dish.whatsapp;
    portfolioModalWhatsapp.textContent = 'Pedir pelo WhatsApp';

    portfolioModalAccompaniments.innerHTML = dish.accompaniments.map(item => `<li>${item}</li>`).join('');
    portfolioModalBadges.innerHTML = dish.badges.map(badge => `<span class="portfolio-modal__badge">${badge}</span>`).join('');

    portfolioModal.hidden = false;
    portfolioModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closePortfolioModal = () => {
    portfolioModal.hidden = true;
    portfolioModal.setAttribute('aria-hidden', 'true');
    portfolioModalImageWrap.classList.remove('is-zoomed');
    document.body.style.overflow = '';
  };

  const portfolioButtons = document.querySelectorAll('.portfolio-card__button');
  portfolioButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.portfolioId;
      openPortfolioModal(id);
    });
  });

  portfolioModalClose.addEventListener('click', closePortfolioModal);
  portfolioModalOverlay.addEventListener('click', closePortfolioModal);

  portfolioModalImage.addEventListener('click', () => {
    portfolioModalImageWrap.classList.toggle('is-zoomed');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !portfolioModal.hidden) {
      closePortfolioModal();
    }
  });

  /* PORTFÓLIO — Modal Premium end */

  /* -------------------------------------------------------------------
     7. CARROSSEL DE DEPOIMENTOS
     ------------------------------------------------------------------- */
  const track = document.getElementById('testimonial-track');
  const slides = track ? Array.from(track.children) : [];
  const dotsContainer = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  let currentSlide = 0;
  let autoplayTimer = null;

  // Cria os indicadores (dots) dinamicamente
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
    if (index === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === currentSlide));
  }

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    updateCarousel();
    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  if (slides.length) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    startAutoplay();
  }


  /* -------------------------------------------------------------------
     8. RODAPÉ — ano atual automático
     ------------------------------------------------------------------- */
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

});
