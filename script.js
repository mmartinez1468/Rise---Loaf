// JavaScript for Navigation Bar
        document.addEventListener('DOMContentLoaded', function() {
            // Hamburger menu toggle
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Handle dropdown toggle on mobile
                    if (window.innerWidth <= 768 && this.classList.contains('has-dropdown')) {
                        e.preventDefault();
                        
                        const dropdown = this.nextElementSibling;
                        const parentItem = this.parentElement;
                        
                        // Toggle active class
                        this.classList.toggle('active');
                        dropdown.classList.toggle('active');
                        parentItem.classList.toggle('active');
                        
                        // Close other dropdowns
                        navLinks.forEach(otherLink => {
                            if (otherLink !== this && otherLink.classList.contains('has-dropdown')) {
                                otherLink.classList.remove('active');
                                otherLink.nextElementSibling.classList.remove('active');
                                otherLink.parentElement.classList.remove('active');
                            }
                        });
                    } else if (!this.classList.contains('has-dropdown')) {
                        // Close mobile menu for non-dropdown links
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                });
            });

            // Close mobile menu when clicking on dropdown items
            const dropdownLinks = document.querySelectorAll('.dropdown-item a');
            dropdownLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.navbar')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });

            // Handle scroll behavior
            let lastScroll = 0;
            const navbar = document.querySelector('.navbar');
            
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;
                
                // Add shadow on scroll
                if (currentScroll > 0) {
                    navbar.style.boxShadow = 'var(--shadowdark)';
                } else {
                    navbar.style.boxShadow = 'var(--shadow)';
                }
                
                lastScroll = currentScroll;
            });

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && document.querySelector(href)) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        const navbarHeight = navbar.offsetHeight;
                        const targetPosition = target.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });








        document.addEventListener("scroll", function () {
  const heroSection = document.getElementById("heroSection");
  const navbar = document.querySelector(".navbar");
  const navLogo = document.querySelector(".nav-logo");

  if (window.innerWidth >= 1024) {
    if (window.scrollY > heroSection.offsetHeight - navbar.offsetHeight) {
      navLogo.classList.add("shrink");
    } else {
      navLogo.classList.remove("shrink");
    }
  } else {
    // Reset logo if resizing back to mobile
    navLogo.classList.remove("shrink");
  }
});











/* HERO SLIDER (SLIDE EFFECT) */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("#heroSection .hero-slider");
  const slides = document.querySelectorAll("#heroSection .hero-slide");
  const dotsContainer = document.querySelector("#heroSection .hero-dots");
  let currentIndex = 0;
  let interval;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll("button");

  function showSlide(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${100 * currentIndex}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
    resetInterval();
  }

  function nextSlide() {
    showSlide((currentIndex + 1) % slides.length);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 10000); // 10 seconds
  }

  resetInterval();
});










// ==========================
// PREVIEW SLIDER CAROUSEL
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.preview-slider');
  if (!slider) return;

  const track = slider.querySelector('.preview-track');
  let slides = Array.from(slider.querySelectorAll('.preview-slide'));
  const dotsContainer = slider.querySelector('.preview-dots');

  let index = 1; // start on first real slide
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let slideTotal = 0;
  let centerOffset = 0;

  // clone first and last slide for infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);
  slides = Array.from(track.querySelectorAll('.preview-slide'));

  const realCount = slides.length - 2;

  // build dots
  for (let i = 0; i < realCount; i++) {
    const btn = document.createElement('button');
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => goToSlide(i + 1));
    dotsContainer.appendChild(btn);
  }
  const dots = Array.from(dotsContainer.children);

  function recalc() {
    // enforce fixed sizes (matches CSS)
    const slideWidth = 240; // px
    const margin = 24;      // 12px left + 12px right
    slideTotal = slideWidth + margin;

    centerOffset = (slider.clientWidth - slideWidth) / 2;

    // ensure index stays valid
    if (index < 1) index = 1;
    if (index > slides.length - 2) index = slides.length - 2;

    goToSlide(index, false);
  }

  function setTranslate(px) {
    currentTranslate = px;
    track.style.transform = `translateX(${px}px)`;
  }

  function goToSlide(i, animate = true) {
    index = i;
    track.style.transition = animate ? '' : 'none';
    const target = centerOffset - index * slideTotal;
    setTranslate(target);
    updateDots();
  }

  function updateDots() {
    dots.forEach(d => d.classList.remove('active'));
    let dotIndex = ((index - 1) % realCount + realCount) % realCount; // wrap safely
    dots[dotIndex].classList.add('active');
  }

  // handle wrapping after transition
  track.addEventListener('transitionend', () => {
    if (index <= 0) {
      index = realCount;
      goToSlide(index, false);
    } else if (index >= slides.length - 1) {
      index = 1;
      goToSlide(index, false);
    }
  });

  // swiping
  function pointerDown(e) {
    isDragging = true;
    startX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    prevTranslate = currentTranslate;
    track.style.transition = 'none';
  }

  function pointerMove(e) {
    if (!isDragging) return;
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const delta = clientX - startX;
    setTranslate(prevTranslate + delta);
  }

  function pointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    const clientX = e.type.startsWith('touch') ? e.changedTouches[0].clientX : e.clientX;
    const delta = clientX - startX;
    const threshold = Math.max(50, slider.clientWidth * 0.15);

    if (delta < -threshold) index += 1;
    else if (delta > threshold) index -= 1;

    if (index < 0) index = realCount;
    if (index > slides.length - 1) index = 1;

    track.style.transition = '';
    goToSlide(index);
  }

  // pointer/touch listeners
  if (window.PointerEvent) {
    slider.addEventListener('pointerdown', pointerDown);
    slider.addEventListener('pointermove', pointerMove);
    slider.addEventListener('pointerup', pointerUp);
    slider.addEventListener('pointercancel', pointerUp);
  } else {
    slider.addEventListener('touchstart', pointerDown, { passive: true });
    slider.addEventListener('touchmove', pointerMove, { passive: true });
    slider.addEventListener('touchend', pointerUp);
  }

  window.addEventListener('resize', recalc);
  window.addEventListener('orientationchange', recalc);

  // init
  recalc();
  goToSlide(1, false);
});

// handle wrapping after transition
track.addEventListener('transitionend', () => {
  if (index <= 0) {
    index = realCount;
    requestAnimationFrame(() => goToSlide(index, false));
  } else if (index >= slides.length - 1) {
    index = 1;
    requestAnimationFrame(() => goToSlide(index, false));
  }
});














































// ==========================================================================
// CONTACT FORM FUNCTIONALITY - WORKING VERSION
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const loading = document.getElementById('loading');
            const btnText = document.getElementById('btnText');
            const messageContainer = document.getElementById('messageContainer');
            
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
            }
            if (loading) {
                loading.style.display = 'block';
            }
            if (btnText) {
                btnText.textContent = 'SENDING...';
            }
            
            // Clear previous messages
            if (messageContainer) {
                messageContainer.innerHTML = '';
            }
            
            // Get form data
            const formData = new FormData(this);
            
            // Add required fields for Web3Forms
            formData.append('from_name', formData.get('name'));
            
            try {
                // Web3Forms API call
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
                    this.reset();
                } else {
                    console.error('Web3Forms error:', result);
                    throw new Error(result.message || 'Failed to send message');
                }
                
            } catch (error) {
                console.error('Error sending form:', error);
                showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            } finally {
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
                if (loading) {
                    loading.style.display = 'none';
                }
                if (btnText) {
                    btnText.textContent = 'SEND';
                }
            }
        });
    }
});

function showMessage(text, type) {
    const messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messageContainer.appendChild(messageDiv);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv && messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Email validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#dc3545';
                showMessage('Please enter a valid email address.', 'error');
            } else {
                this.style.borderColor = '#cc007e';
            }
        });
    }
});