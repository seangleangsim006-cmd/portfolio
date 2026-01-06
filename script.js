
      // Theme Toggle Functions
      function initThemeToggle() {
        const body = document.body;
        const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');
        const sunIconMobile = document.getElementById('sunIconMobile');
        const moonIconMobile = document.getElementById('moonIconMobile');
        
        // Check for saved theme or prefer-color-scheme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
          body.classList.add('dark');
          body.classList.remove('light');
          if (sunIcon) sunIcon.style.display = 'block';
          if (moonIcon) moonIcon.style.display = 'none';
          if (sunIconMobile) sunIconMobile.style.display = 'block';
          if (moonIconMobile) moonIconMobile.style.display = 'none';
        } else {
          body.classList.add('light');
          body.classList.remove('dark');
          if (sunIcon) sunIcon.style.display = 'none';
          if (moonIcon) moonIcon.style.display = 'block';
          if (sunIconMobile) sunIconMobile.style.display = 'none';
          if (moonIconMobile) moonIconMobile.style.display = 'block';
        }

        // Desktop theme toggle
        const themeToggleNav = document.getElementById('themeToggleNav');
        if (themeToggleNav) {
          themeToggleNav.addEventListener('click', () => {
            toggleTheme(sunIcon, moonIcon, sunIconMobile, moonIconMobile);
          });
        }

        // Mobile theme toggle
        const themeToggleMobile = document.getElementById('themeToggleMobile');
        if (themeToggleMobile) {
          themeToggleMobile.addEventListener('click', () => {
            toggleTheme(sunIcon, moonIcon, sunIconMobile, moonIconMobile);
          });
        }
      }

      function toggleTheme(sunIcon, moonIcon, sunIconMobile, moonIconMobile) {
        const body = document.body;
        if (body.classList.contains('light')) {
          body.classList.remove('light');
          body.classList.add('dark');
          if (sunIcon) sunIcon.style.display = 'block';
          if (moonIcon) moonIcon.style.display = 'none';
          if (sunIconMobile) sunIconMobile.style.display = 'block';
          if (moonIconMobile) moonIconMobile.style.display = 'none';
          localStorage.setItem('theme', 'dark');
        } else {
          body.classList.remove('dark');
          body.classList.add('light');
          if (sunIcon) sunIcon.style.display = 'none';
          if (moonIcon) moonIcon.style.display = 'block';
          if (sunIconMobile) sunIconMobile.style.display = 'none';
          if (moonIconMobile) moonIconMobile.style.display = 'block';
          localStorage.setItem('theme', 'light');
        }
      }

      // Typing Animation
      var typed = new Typed("#typed", {
        strings: ["Seang Leangsim", "ស៊ាង លាងស៊ីម"],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        smartBackspace: true,
      });

      // Navbar scroll effect
      window.addEventListener("scroll", function () {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
          navbar.classList.add("shadow-xl", "backdrop-blur-xl");
          navbar.classList.remove("glass-effect");
        } else {
          navbar.classList.remove("shadow-xl", "backdrop-blur-xl");
          navbar.classList.add("glass-effect");
        }
      });

      // Mobile menu toggle
      const menuBtn = document.getElementById("menuBtn");
      const mobileMenu = document.getElementById("mobileMenu");
      let isMenuOpen = false;

      if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
          isMenuOpen = !isMenuOpen;
          if (isMenuOpen) {
            mobileMenu.classList.add("show");
            mobileMenu.classList.remove("hidden");
          } else {
            mobileMenu.classList.remove("show");
            setTimeout(() => {
              if (!mobileMenu.classList.contains('show')) {
                mobileMenu.classList.add("hidden");
              }
            }, 300);
          }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobileMenu a').forEach(link => {
          link.addEventListener('click', () => {
            mobileMenu.classList.remove("show");
            setTimeout(() => {
              mobileMenu.classList.add("hidden");
            }, 300);
            isMenuOpen = false;
          });
        });
      }

      // CV Modal Functions
      function openCV() {
        document.getElementById('cvModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }

      function closeCV() {
        document.getElementById('cvModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
      }

      function printCV() {
        window.print();
      }

      // Toast notification function
      function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
          toast.remove();
        }, 3000);
      }

      // Fixed PDF Download Function
      async function downloadPDF() {
        const button = event?.target?.closest('button');
        const originalText = button ? button.innerHTML : '';
        
        if (button) {
          // Show loading state
          button.innerHTML = `
            <span class="flex items-center gap-2">
              <div class="loading"></div>
              Generating PDF...
            </span>
          `;
          button.disabled = true;
        }

        try {
          const element = document.getElementById('cvContent');
          
          // Create a clone for PDF generation
          const clone = element.cloneNode(true);
          
          // Remove no-print classes and show all elements
          clone.querySelectorAll('.no-print').forEach(el => el.remove());
          
          // Optimize for PDF
          clone.style.width = '210mm'; // A4 width
          clone.style.margin = '0 auto';
          clone.style.padding = '20mm';
          clone.style.backgroundColor = 'white';
          clone.style.color = 'black';
          
          // Remove dark mode classes for PDF
          clone.classList.remove('dark:bg-gray-800');
          clone.classList.add('bg-white');
          
          // Convert all text to black for better PDF readability
          clone.querySelectorAll('*').forEach(el => {
            if (el.style) {
              el.style.color = el.style.color.includes('rgb') ? el.style.color : 'black';
            }
          });

          const opt = {
            margin: 10,
            filename: 'Seang_Leangsim_CV.pdf',
            image: { 
              type: 'jpeg', 
              quality: 1.0 
            },
            html2canvas: { 
              scale: 2,
              useCORS: true,
              logging: false,
              backgroundColor: '#ffffff',
              letterRendering: true,
              allowTaint: true,
              removeContainer: true,
              width: element.scrollWidth,
              height: element.scrollHeight
            },
            jsPDF: { 
              unit: 'mm', 
              format: 'a4', 
              orientation: 'portrait',
              compress: true
            }
          };

          // Generate PDF
          await html2pdf().set(opt).from(clone).save();
          
          // Show success message
          showToast('PDF downloaded successfully!', 'success');
          
        } catch (error) {
          console.error('PDF generation error:', error);
          showToast('Failed to generate PDF. Please try printing instead.', 'error');
          
          // Fallback: Open print dialog
          setTimeout(() => {
            window.print();
          }, 1000);
        } finally {
          // Restore button state
          if (button) {
            button.innerHTML = originalText;
            button.disabled = false;
          }
        }
      }

      // Close modal when clicking outside
      document.getElementById('cvModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
          closeCV();
        }
      });

      // Close modal with Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeCV();
        }
      });

      // Animate progress bars on scroll
      function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          if (width) {
            // Set initial width to 0
            bar.style.width = '0%';
            
            // Use Intersection Observer to animate when in view
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  setTimeout(() => {
                    bar.style.width = width + '%';
                  }, 300);
                  observer.unobserve(entry.target);
                }
              });
            }, { threshold: 0.5 });
            
            observer.observe(bar.parentElement);
          }
        });
      }

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });
            // Close mobile menu if open
            if (isMenuOpen) {
              const mobileMenu = document.getElementById("mobileMenu");
              if (mobileMenu) {
                mobileMenu.classList.remove("show");
                setTimeout(() => {
                  mobileMenu.classList.add("hidden");
                }, 300);
                isMenuOpen = false;
              }
            }
          }
        });
      });

      // Create particles
      function createParticles() {
        const particlesContainer = document.getElementById("particles");
        if (!particlesContainer) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.classList.add("particle");

          // Random position
          particle.style.left = Math.random() * 100 + "%";
          particle.style.top = Math.random() * 100 + "%";

          // Random size
          const size = Math.random() * 3 + 1;
          particle.style.width = size + "px";
          particle.style.height = size + "px";

          // Random animation delay
          particle.style.animationDelay = Math.random() * 20 + "s";

          // Random opacity
          particle.style.opacity = Math.random() * 0.5 + 0.2;

          particlesContainer.appendChild(particle);
        }
      }

      // Form submission handler
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const submitBtn = document.getElementById('submitBtn');
          const originalText = submitBtn.innerHTML;
          
          // Show loading state
          submitBtn.innerHTML = `
            <span class="flex items-center gap-2">
              <div class="loading"></div>
              Sending...
            </span>
          `;
          submitBtn.disabled = true;

          // Simulate API call
          setTimeout(() => {
            // Success message
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');

            // Reset form
            this.reset();

            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 1500);
        });
      }

      // Initialize everything on load
      window.addEventListener("load", () => {
        initThemeToggle();
        createParticles();
        animateProgressBars();

        // Add initial animations
        document
          .querySelectorAll(".fade-in-up, .slide-in-left")
          .forEach((el) => {
            el.style.opacity = "1";
          });

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.animation = 'none';
            bar.style.transition = 'none';
          });
        }
      });

      // Responsive adjustments
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
          const mobileMenu = document.getElementById("mobileMenu");
          if (mobileMenu) {
            mobileMenu.classList.remove("show");
            mobileMenu.classList.add("hidden");
            isMenuOpen = false;
          }
        }
      });
