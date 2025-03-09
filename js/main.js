document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    try {
        AOS.init({
            duration: 1000,
            once: true
        });
    } catch (error) {
        console.error('Error initializing AOS:', error);
    }

    // ParticlesJS Config
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        try {
            particlesJS.load('particles-js', 'js/particles.json', function() {
                console.log('Particles.js config loaded');
            });
        } catch (error) {
            console.error('Error loading particles.js:', error);
        }
    }

    // Navbar functionality
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Handle navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (currentLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                currentLink.classList.add('active');
            }
        });
    });

    // Smooth Scroll
    const scrollLinks = document.querySelectorAll('.nav-link');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId) return;

            // Handle both internal page links and external links
            if (targetId.startsWith('#')) {
                const targetSection = document.getElementById(targetId.substring(1));
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });

                    // Close nav menu on mobile after clicking
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            } else {
                window.location.href = targetId;
            }
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        };

        window.addEventListener('scroll', toggleBackToTop);
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Countdown Timer
    const countdown = document.getElementById('countdown');
    if (countdown) {
        const eventDate = new Date('March 22, 2025 10:00:00').getTime();
        let countdownInterval;

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                }
                countdown.innerHTML = '<div class="countdown-message">Event Started!</div>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdown.innerHTML = `
                <div class="countdown-item">
                    <span>${days}</span>
                    <p>Days</p>
                </div>
                <div class="countdown-item">
                    <span>${hours}</span>
                    <p>Hours</p>
                </div>
                <div class="countdown-item">
                    <span>${minutes}</span>
                    <p>Minutes</p>
                </div>
                <div class="countdown-item">
                    <span>${seconds}</span>
                    <p>Seconds</p>
                </div>
            `;
        };

        // Initial update
        updateCountdown();
        // Update every second
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Form Submissions
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your newsletter subscription logic here
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
});

// Loading Screen
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-container');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Add smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.85) {
            section.classList.add('reveal');
        }
    });
};

window.addEventListener('scroll', revealSections);

function toggleDropdown() {
    var menu = document.getElementById("dropdownMenu");
    menu.classList.toggle("show");
}

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    var menu = document.getElementById("dropdownMenu");
    var button = document.querySelector(".dropdown-toggle");
    
    if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove("show");
    }
});