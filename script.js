document.addEventListener('DOMContentLoaded', function(){
    // Smooth anchor scrolling with header offset
    const nav = document.querySelector('nav');
    function headerOffset(){ return nav ? nav.offsetHeight + 12 : 84; }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e){
            const href = this.getAttribute('href');
            if(!href || href === '#' || href === '#!' ) return;
            if(href.startsWith('#')){
                const target = document.querySelector(href);
                if(target){
                    e.preventDefault();
                    const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
                    window.scrollTo({ top, behavior: 'smooth' });
                    history.replaceState(null, '', href);
                }
            }
        });
    });

    // Mobile menu toggle for better mobile experience
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    
    if (window.innerWidth <= 768) {
        // Add touch-friendly improvements
        const allLinks = document.querySelectorAll('.nav-links a');
        allLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close mobile menu if needed
                setTimeout(() => {
                    // Smooth scroll already handled
                }, 100);
            });
        });
    }

    // Popup click animation for interactive elements
    const interactiveSelector = '.btn, .contact-link, .nav-links a, .project-card, .skill-card, .education-card, .contact-card, .exp-item';
    function applyPop(el){
        if(!el) return;
        el.classList.remove('pop');
        el.classList.remove('pop-glow');
        void el.offsetWidth;
        el.classList.add('pop');
        el.classList.add('pop-glow');
        const tidy = () => {
            el.classList.remove('pop');
            el.classList.remove('pop-glow');
            el.removeEventListener('animationend', tidy);
        };
        el.addEventListener('animationend', tidy);
    }

    document.addEventListener('click', function(e){
        const btn = e.target.closest(interactiveSelector);
        if(btn) applyPop(btn);
    });
});
