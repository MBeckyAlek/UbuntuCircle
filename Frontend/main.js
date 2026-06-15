/* ── Splash screen (home page only) ─────────────────────────────── */
window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    if (!splash) return;
    setTimeout(() => {
        splash.classList.add('gone');
        const cleanup = () => {
            splash.remove();
            splash.removeEventListener('transitionend', cleanup);
        };
        splash.addEventListener('transitionend', cleanup);
        setTimeout(cleanup, 1200);
    }, 2400);
});

/* ── Active nav link ────────────────────────────────────────────── */
(function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        const target = link.getAttribute('data-page');
        if (target === page || (page === '' && target === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
})();

/* ── Hamburger nav ──────────────────────────────────────────────── */
const hbg = document.getElementById('hbg');
const navDrop = document.getElementById('navDrop');

if (hbg && navDrop) {
    hbg.addEventListener('click', (e) => {
        e.stopPropagation();
        hbg.classList.toggle('open');
        navDrop.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!hbg.contains(e.target) && !navDrop.contains(e.target)) {
            hbg.classList.remove('open');
            navDrop.classList.remove('open');
        }
    });
}

function closeNav() {
    if (hbg) hbg.classList.remove('open');
    if (navDrop) navDrop.classList.remove('open');
}

/* ── Email signup ────────────────────────────────────────────────── */
function handleSignup() {
    const input = document.getElementById('emailInput');
    if (!input) return;
    if (input.value.includes('@')) {
        input.value = '';
        input.placeholder = '\u2713 Welcome to the Circle.';
        input.style.borderColor = '#AC5421';
    } else {
        input.style.borderColor = '#301E14';
        input.placeholder = 'Please enter a valid email';
        setTimeout(() => {
            input.placeholder = 'Your email address';
            input.style.borderColor = '';
        }, 2500);
    }
}

/* ── Scroll reveal ───────────────────────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObs.observe(el));

/* ── Nav shadow on scroll ────────────────────────────────────────── */
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 2px 24px rgba(48,30,20,0.08)' : '';
}, { passive: true });

/* ── Lucide icons ────────────────────────────────────────────────── */
function initIcons() {
    if (window.lucide) lucide.createIcons();
}

initIcons();
window.addEventListener('load', initIcons);
