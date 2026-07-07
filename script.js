document.addEventListener('DOMContentLoaded', () => {

  // 1. RESPONSIVE NAVBAR (Burger Menu)
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
    });
  });

  // 2. SCROLL REVEAL (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. CARROUSEL TESTIMONIALS (Slider Avis)
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('carousel-dots');
  
  let currentIndex = 0;

  if (track && slides.length > 0) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel__dot');
      if (idx === 0) dot.classList.add('is-active');
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => moveToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const updateDots = (targetIndex) => {
      dots.forEach(dot => dot.classList.remove('is-active'));
      dots[targetIndex].classList.add('is-active');
    };

    const moveToSlide = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
      updateDots(index);
    };

    nextBtn.addEventListener('click', () => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      moveToSlide(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = slides.length - 1;
      moveToSlide(prevIndex);
    });
  }

  // 4. FORM VALIDATION & WHATSAPP AUTO REDIRECT
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success-msg');

  const fields = [
    { id: 'fullname', group: 'group-fullname', test: val => val.trim().length > 2 },
    { id: 'email', group: 'group-email', test: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
    { id: 'phone', group: 'group-phone', test: val => val.trim().length >= 8 },
    { id: 'city', group: 'group-city', test: val => val !== '' },
    { id: 'project', group: 'group-project', test: val => val !== '' },
    { id: 'message', group: 'group-message', test: val => val.trim().length > 5 }
  ];

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isFormValid = true;

      fields.forEach(field => {
        const input = document.getElementById(field.id);
        const group = document.getElementById(field.group);
        
        if (input && group) {
          if (!field.test(input.value)) {
            group.classList.add('is-error');
            isFormValid = false;
          } else {
            group.classList.remove('is-error');
          }
        }
      });

      if (isFormValid) {
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const city = document.getElementById('city').value;
        const project = document.getElementById('project').value;
        const message = document.getElementById('message').value.trim();

        // Message WhatsApp rédigé en Français Professionnel
        const text = `Bonjour BounouliDev,%0A%0A` +
                     `Je souhaite demander un devis pour un nouveau projet :%0A%0A` +
                     `*💼 Type de Projet :* ${project}%0A` +
                     `*👤 Nom Complet :* ${fullname}%0A` +
                     `*📧 Email :* ${email}%0A` +
                     `*📞 Téléphone :* ${phone}%0A` +
                     `*📍 Ville :* ${city}%0A%0A` +
                     `*📝 Détails du projet :* %0A${message}`;

        // Lien WhatsApp de redirection directe
        const whatsappUrl = `https://wa.me/212726709746?text=${text}`;

        // Affichage du message de succès et redirection
        successMsg.classList.add('is-visible');
        form.reset();

        setTimeout(() => {
          successMsg.classList.remove('is-visible');
          window.open(whatsappUrl, '_blank');
        }, 1200);
      }
    });

    // Supprimer l'état d'erreur dès que l'utilisateur commence à corriger sa saisie
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      if (input) {
        input.addEventListener('input', () => {
          const group = document.getElementById(field.group);
          if (group) group.classList.remove('is-error');
        });
      }
    });
  }
});