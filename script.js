// Animación de contador para las estadísticas
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observer para detectar cuando las estadísticas son visibles
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar la sección de estadísticas
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animación de las letras del grid
document.addEventListener('DOMContentLoaded', () => {
    const letterBoxes = document.querySelectorAll('.letter-box');
    
    letterBoxes.forEach((box, index) => {
        box.addEventListener('mouseenter', () => {
            box.style.animationPlayState = 'paused';
        });
        
        box.addEventListener('mouseleave', () => {
            box.style.animationPlayState = 'running';
        });
    });
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de hover en las tarjetas de servicios
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const icon = card.querySelector('.icon-box');
        icon.style.transform = 'rotate(360deg) scale(1.1)';
        icon.style.transition = 'transform 0.6s ease';
    });
    
    card.addEventListener('mouseleave', (e) => {
        const icon = card.querySelector('.icon-box');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});

// Validación del formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Efecto de envío
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.style.background = 'linear-gradient(90deg, #00ff00, #00ff00)';
        
        // Simular envío
        setTimeout(() => {
            submitButton.textContent = '✓ Mensaje Enviado';
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'linear-gradient(90deg, var(--neon-cyan), var(--neon-pink))';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Efecto de partículas en el fondo (opcional)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--neon-cyan)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.zIndex = '1';
    particle.style.opacity = '0.6';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 0.6 },
        { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Crear partículas periódicamente
setInterval(createParticle, 300);

// Efecto de cursor personalizado
const cursor = document.createElement('div');
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.border = '2px solid var(--neon-cyan)';
cursor.style.borderRadius = '50%';
cursor.style.position = 'fixed';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';
cursor.style.transition = 'transform 0.1s ease';
cursor.style.display = 'none';

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Escalar cursor en elementos interactivos
const interactiveElements = document.querySelectorAll('button, a, .service-card, .gallery-item');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'rgba(0, 255, 245, 0.2)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'transparent';
    });
});
