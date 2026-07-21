// Initialize theme as early as possible to avoid screen flash
(function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const d = document.documentElement;
  const scrollTotal = d.scrollHeight - d.clientHeight;
  const pct = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
  
  const progressBar = document.getElementById('progress') || document.getElementById('bar');
  if (progressBar) {
    progressBar.style.width = pct + '%';
  }
}, { passive: true });

// Drawer Control
function openDrawer() {
  const overlay = document.getElementById('overlay') || document.getElementById('ov');
  const drawer = document.getElementById('drawer');
  if (overlay) overlay.style.display = 'block';
  if (drawer) drawer.classList.add('open');
}

function closeDrawer() {
  const overlay = document.getElementById('overlay') || document.getElementById('ov');
  const drawer = document.getElementById('drawer');
  if (overlay) overlay.style.display = 'none';
  if (drawer) drawer.classList.remove('open');
}

// Q&A Toggle
function toggleQ(btn) {
  const body = btn.nextElementSibling;
  if (!body) return;
  const isOpen = body.classList.contains('open');
  btn.classList.toggle('open', !isOpen);
  body.classList.toggle('open', !isOpen);
}

// Map tQ to toggleQ for compatibility with Phase pages
function tQ(btn) {
  toggleQ(btn);
}

// Expand / Collapse all Q&As inside a container
function xpAll(id) {
  const container = document.getElementById(id);
  if (!container) return;
  container.querySelectorAll('.qa-btn').forEach(b => {
    b.classList.add('open');
    if (b.nextElementSibling) b.nextElementSibling.classList.add('open');
  });
}

function xpNone(id) {
  const container = document.getElementById(id);
  if (!container) return;
  container.querySelectorAll('.qa-btn').forEach(b => {
    b.classList.remove('open');
    if (b.nextElementSibling) b.nextElementSibling.classList.remove('open');
  });
}

// Checklist toggle
function toggleCk(li) {
  li.classList.toggle('done');
}

// Self-assessment calculations
function updateScore() {
  const sliders = document.querySelectorAll('.s-slider, .s-range');
  if (sliders.length === 0) return;
  
  let total = 0;
  sliders.forEach(s => {
    const v = parseInt(s.value) || 0;
    const label = s.parentElement.querySelector('.s-val');
    if (label) label.textContent = v;
    total += v;
  });
  
  const scoreEl = document.getElementById('s-total') || document.getElementById('sc');
  if (scoreEl) scoreEl.textContent = total;
  
  const msgEl = document.getElementById('s-msg') || document.getElementById('sc-msg');
  if (msgEl) {
    let msg = '';
    // Decide msg based on slider count & max possible score (assuming 10 max per slider)
    const maxScore = sliders.length * 10;
    const pct = (total / maxScore) * 100;
    
    if (pct < 40) msg = '⚠ Significant preparation needed. Focus on your weakest areas first.';
    else if (pct < 60) msg = 'Good foundation. Identify the top gaps and drill them with mocks.';
    else if (pct < 80) msg = 'Strong preparation. Refine with 2–3 more mock interviews.';
    else msg = '🎯 Interview-ready. Go land that offer.';
    
    msgEl.textContent = msg;
  }
}

// Map upScore to updateScore for compatibility with Phase pages
function upScore() {
  updateScore();
}

// Theme Switcher
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// DOM Setup
document.addEventListener('DOMContentLoaded', () => {
  // Add theme switcher button dynamically to the navbar if not present
  const nav = document.querySelector('.nav');
  if (nav && !document.getElementById('theme-toggle')) {
    const rightNav = nav.querySelector('div[style*="display:flex"]') || nav.querySelector('div[style*="display: flex"]') || nav.querySelector('div') || nav;
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle';
    themeBtn.className = 'nav-btn';
    themeBtn.style.marginRight = '8px';
    themeBtn.innerHTML = '🌓 Theme';
    themeBtn.onclick = toggleTheme;
    
    if (rightNav !== nav) {
      rightNav.insertBefore(themeBtn, rightNav.firstChild);
    } else {
      nav.appendChild(themeBtn);
    }
  }

  // Bind self-assess initial values
  updateScore();

  // TOC active state on scroll
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('#drawer a');
  if (sections.length > 0 && links.length > 0) {
    window.addEventListener('scroll', () => {
      let cur = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) {
          cur = s.id;
        }
      });
      links.forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === '#' + cur);
      });
    }, { passive: true });
  }

  // Setup click listeners for checklist items to avoid inline click bindings
  document.querySelectorAll('.ck li').forEach(li => {
    li.onclick = () => toggleCk(li);
  });
});

// Export functions to global scope
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.toggleQ = toggleQ;
window.tQ = tQ;
window.xpAll = xpAll;
window.xpNone = xpNone;
window.toggleCk = toggleCk;
window.updateScore = updateScore;
window.upScore = upScore;
window.toggleTheme = toggleTheme;
