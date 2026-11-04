// Tailwind CSS configuration
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Lexend', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        }
      }
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Copy email to clipboard
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-email-tooltip');
  if (copyEmailBtn && copyTooltip) {
    const emailToCopy = "chuaseanmanuel3@gmail.com";
    
    copyEmailBtn.addEventListener('mouseenter', () => {
      copyTooltip.textContent = "Copy email";
      copyTooltip.classList.remove('opacity-0');
    });

    copyEmailBtn.addEventListener('mouseleave', () => {
      copyTooltip.classList.add('opacity-0');
    });

    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        copyTooltip.textContent = "Copied";
        copyTooltip.classList.remove('opacity-0');
        setTimeout(() => copyTooltip.classList.add('opacity-0'), 2000);
      } catch (err) {
        window.location.href = `mailto:${emailToCopy}`;
      }
    });
  }

  // Mobile drawer controls
  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileClose = document.getElementById('mobile-close-btn');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  function openMobileMenu() {
    if (!sidebar || !mobileBackdrop) return;
    sidebar.classList.remove('-translate-x-full');
    mobileBackdrop.classList.remove('hidden');
    setTimeout(() => mobileBackdrop.classList.remove('opacity-0'), 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeMobileMenu() {
    if (!sidebar || !mobileBackdrop) return;
    sidebar.classList.add('-translate-x-full');
    mobileBackdrop.classList.add('opacity-0');
    setTimeout(() => mobileBackdrop.classList.add('hidden'), 200);
    document.body.classList.remove('overflow-hidden');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  // Modal dialog management
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtns = document.querySelectorAll('.close-modal-btn');
  const navLinks = document.querySelectorAll('#sidebar-nav .nav-link');
  const homeNavBtn = document.querySelector('[data-view="home"]');

  function setActiveNavLink(targetId) {
    navLinks.forEach(link => {
      const modalTarget = link.getAttribute('data-target');
      if (modalTarget === targetId) {
        link.classList.add('active');
      } else if (!targetId && link.getAttribute('data-view') === 'home') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;

    modalOverlays.forEach(m => {
      if (m !== targetModal && !m.classList.contains('hidden')) {
        m.classList.add('hidden', 'opacity-0');
      }
    });

    targetModal.classList.remove('hidden');
    setTimeout(() => {
      targetModal.classList.remove('opacity-0');
      const inner = targetModal.querySelector('.transform');
      if (inner) inner.classList.remove('scale-95');
    }, 10);

    document.body.classList.add('overflow-hidden');
    setActiveNavLink(modalId);

    if (window.innerWidth < 1024) {
      closeMobileMenu();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeModal(targetModal) {
    if (!targetModal) return;
    targetModal.classList.add('opacity-0');
    const inner = targetModal.querySelector('.transform');
    if (inner) inner.classList.add('scale-95');

    setTimeout(() => {
      targetModal.classList.add('hidden');
      const anyOpen = Array.from(modalOverlays).some(m => !m.classList.contains('hidden'));
      if (!anyOpen) {
        document.body.classList.remove('overflow-hidden');
        setActiveNavLink(null);
      }
    }, 200);
  }

  function closeAllModals() {
    modalOverlays.forEach(modal => {
      if (!modal.classList.contains('hidden')) {
        closeModal(modal);
      }
    });
    setActiveNavLink(null);
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      if (targetId) openModal(targetId);
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-overlay');
      if (parentModal) closeModal(parentModal);
    });
  });

  modalOverlays.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  if (homeNavBtn) {
    homeNavBtn.addEventListener('click', () => {
      closeAllModals();
      if (window.innerWidth < 1024) closeMobileMenu();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && submitBtn && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
        contactForm.reset();
        formFeedback.classList.remove('hidden');
        setTimeout(() => formFeedback.classList.add('hidden'), 5000);
      }, 500);
    });
  }
});
