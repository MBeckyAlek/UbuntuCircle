// ── Hamburger nav ────────────────────────────────────────────
const hbg = document.getElementById('hbg');
const navDrop = document.getElementById('navDrop');

hbg.addEventListener('click', () => {
    hbg.classList.toggle('open');
    navDrop.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!hbg.contains(e.target) && !navDrop.contains(e.target)) {
        hbg.classList.remove('open');
        navDrop.classList.remove('open');
    }
});

// ── Placeholder page overlays ────────────────────────────────
function openPH(id) {
    hbg.classList.remove('open');
    navDrop.classList.remove('open');
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePH() {
    document.querySelectorAll('.ph-overlay').forEach(p => p.classList.remove('active'));
    document.body.style.overflow = '';
}

// Close overlay on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePH();
});

// ── Email signup ──────────────────────────────────────────────
function handleSignup() {
    const input = document.getElementById('emailInput');
    if (input && input.value.includes('@')) {
        input.value = '';
        input.placeholder = '✓ Welcome to the Circle.';
        input.style.borderColor = '#C8872A';
    } else {
        if (input) {
            input.style.borderColor = '#A84B2F';
            input.placeholder = 'Please enter a valid email';
        }
    }
}

// ── Scroll reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));