document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Live Local Clock in Sidebar Footer
  const timeDisplay = document.getElementById('live-time-display');
  function updateClock() {
    if (!timeDisplay) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    timeDisplay.textContent = `${timeStr} (Local)`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 3. One-Click Copy Email with Tooltip
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-email-tooltip');
  if (copyEmailBtn && copyTooltip) {
    const emailToCopy = "your.email@example.com";
    
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
        copyTooltip.textContent = "Copied to clipboard!";
        copyTooltip.classList.remove('opacity-0');
        setTimeout(() => {
          copyTooltip.classList.add('opacity-0');
        }, 2000);
      } catch (err) {
        window.location.href = `mailto:${emailToCopy}`;
      }
    });
  }

  // 4. Mobile Navigation Drawer Controls
  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileClose = document.getElementById('mobile-close-btn');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    sidebar.classList.remove('-translate-x-full');
    mobileBackdrop.classList.remove('hidden');
    setTimeout(() => mobileBackdrop.classList.remove('opacity-0'), 10);
    document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
  }

  function closeMobileMenu() {
    sidebar.classList.add('-translate-x-full');
    mobileBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      mobileBackdrop.classList.add('hidden');
    }, 200);
    document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        closeMobileMenu();
      }
    });
  });

  // 5. ScrollSpy Navigation Highlighting
  const sections = document.querySelectorAll('section[id], div[id="about"], div[id="skills"]');
  
  function updateActiveNavLink() {
    let currentSectionId = 'home';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = id;
      }
    });

    navLinks.forEach(link => {
      const target = link.getAttribute('data-section');
      if (target === currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // 6. "View All Projects" Modal
  const modal = document.getElementById('projects-modal');
  const viewAllBtn = document.getElementById('view-all-projects-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');

  function openModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      const inner = modal.querySelector('.transform');
      if (inner) inner.classList.remove('scale-95');
    }, 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('opacity-0');
    const inner = modal.querySelector('.transform');
    if (inner) inner.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 250);
  }

  if (viewAllBtn) viewAllBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 7. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending message...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
        
        contactForm.reset();
        formFeedback.classList.remove('hidden');

        setTimeout(() => {
          formFeedback.classList.add('hidden');
        }, 5000);
      }, 600);
    });
  }
});
