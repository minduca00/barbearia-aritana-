/* ============================================
   BARBEARIA ARITANA - SCRIPT
   Interações: Navbar, Menu Mobile, Reveal, Lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ===== PRELOADER ===== */
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
            }
        }, 1800);
    });

    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 4000);

    /* ===== SCROLL PROGRESS ===== */
    const scrollProgress = document.getElementById('scrollProgress');

    function handleScrollProgress() {
        if (!scrollProgress) return;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', handleScrollProgress);
    handleScrollProgress();

    /* ===== BACK TO TOP ===== */
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);
    handleBackToTop();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ===== HERO PARTICLES ===== */
    const heroParticles = document.getElementById('heroParticles');

    function createParticles() {
        if (!heroParticles) return;

        const particleCount = window.innerWidth < 768 ? 15 : 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 6 + 3;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 8;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.5 + 0.3;

            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = left + '%';
            particle.style.bottom = '-10px';
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            particle.style.opacity = opacity;

            heroParticles.appendChild(particle);
        }
    }

    createParticles();

    /* ===== COUNTER ANIMATION ===== */
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const decimals = parseInt(el.dataset.decimals || '0');
                const duration = 2000;
                const start = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = target * eased;

                    el.textContent = decimals > 0
                        ? current.toFixed(decimals).replace('.', ',')
                        : Math.round(current).toString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* ===== CARD TILT 3D ===== */
    const tiltCards = document.querySelectorAll('.servico-card, .equipe-card, .experiencia-item, .depoimento-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ===== NAVBAR SCROLL ===== */
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    /* ===== MENU MOBILE ===== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function toggleMenu() {
        if (!navToggle || !navMenu) return;
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            navToggle && !navToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* ===== REVEAL ANIMATIONS ===== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ===== AVALIAÇÕES CARROSSEL ===== */
    const carouselTrack = document.getElementById('depoimentosTrack');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');

    if (carouselTrack && prevBtn && nextBtn) {
        const cards = Array.from(carouselTrack.children);
        let currentIndex = 0;
        let dragStartX = 0;
        let dragDelta = 0;
        let isDragging = false;

        function getCardsPerView() {
            if (window.innerWidth <= 560) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        function getMaxIndex() {
            return Math.max(0, cards.length - getCardsPerView());
        }

        function updateCarousel() {
            const cardsPerView = getCardsPerView();
            const gap = 24;
            const cardWidth = cards[0].offsetWidth + gap;
            currentIndex = Math.min(currentIndex, getMaxIndex());
            carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            carouselTrack.style.transition = 'transform 0.45s ease';

            carouselDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            const maxIndex = getMaxIndex();
            currentIndex = Math.min(Math.max(index, 0), maxIndex);
            updateCarousel();
        }

        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        const trackWrap = document.querySelector('.carousel-track-wrap');

        if (trackWrap) {
            trackWrap.addEventListener('pointerdown', (event) => {
                isDragging = true;
                dragStartX = event.clientX;
                dragDelta = 0;
                carouselTrack.style.transition = 'none';
            });

            trackWrap.addEventListener('pointermove', (event) => {
                if (!isDragging) return;
                dragDelta = event.clientX - dragStartX;
                const shift = -(currentIndex * (cards[0].offsetWidth + 24)) + dragDelta;
                carouselTrack.style.transform = `translateX(${shift}px)`;
            });

            const endDrag = () => {
                if (!isDragging) return;
                isDragging = false;
                if (dragDelta < -50) {
                    goToSlide(currentIndex + 1);
                } else if (dragDelta > 50) {
                    goToSlide(currentIndex - 1);
                } else {
                    updateCarousel();
                }
            };

            trackWrap.addEventListener('pointerup', endDrag);
            trackWrap.addEventListener('pointerleave', endDrag);
            trackWrap.addEventListener('pointercancel', endDrag);
        }

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    }

    /* ===== LIGHTBOX ===== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.galeria-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('.instagram-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* ===== ANO ATUAL NO FOOTER ===== */
    const yearElements = document.querySelectorAll('.footer-bottom p:first-child');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        el.innerHTML = `&copy; ${currentYear} Barbearia Aritana. Todos os direitos reservados.`;
    });

    /* ===== SMOOTH SCROLL PARA ÂNCORAS ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
