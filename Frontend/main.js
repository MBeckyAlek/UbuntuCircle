/* ── Splash screen ────────────────────────────────────────────── */
window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    if (!splash) return;
    // Gone after CSS transition (opacity delay 2.4s + 0.7s = ~3.1s)
    setTimeout(() => splash.classList.add('gone'), 2400);
    // Remove from DOM after fade
    setTimeout(() => splash.remove(), 3200);
});

/* ── Hamburger nav ──────────────────────────────────────────────── */
const hbg = document.getElementById('hbg');
const navDrop = document.getElementById('navDrop');

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

function closeNav() {
    hbg.classList.remove('open');
    navDrop.classList.remove('open');
}

/* ── Placeholder overlays ───────────────────────────────────────── */
function openPH(id) {
    closeNav();
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePH() {
    document.querySelectorAll('.ph-overlay').forEach(p => p.classList.remove('active'));
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePH();
});

/* ── Email signup ────────────────────────────────────────────────── */
function handleSignup() {
    const input = document.getElementById('emailInput');
    if (!input) return;
    if (input.value.includes('@')) {
        input.value = '';
        input.placeholder = '\u2713 Welcome to the Circle.';
        input.style.borderColor = '#C8872A';
    } else {
        input.style.borderColor = '#A84B2F';
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

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Dark / Light theme toggle ───────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');

function setTheme(dark) {
    document.body.classList.toggle('dark', dark);
    if (themeToggle) themeToggle.textContent = dark ? 'Light' : 'Dark';
    try { localStorage.setItem('uc-theme', dark ? 'dark' : 'light'); } catch (e) { }
}

function toggleTheme() {
    setTheme(!document.body.classList.contains('dark'));
}

// Restore saved preference
try {
    const saved = localStorage.getItem('uc-theme');
    if (saved === 'dark') setTheme(true);
} catch (e) { }

themeToggle?.addEventListener('click', toggleTheme);

/* ── Subtle nav shadow on scroll ─────────────────────────────────── */
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 2px 24px rgba(59,26,10,0.08)' : '';
}, { passive: true });