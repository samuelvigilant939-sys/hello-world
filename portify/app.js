// Portify single-file mock app with hash routing
(function() {
  const app = document.getElementById('app');

  const routes = {
    '': renderWelcome,
    '#/welcome': renderWelcome,
    '#/auth': renderAuth,
    '#/home': renderHome,
    '#/upload': renderUpload,
    '#/portfolio': renderPortfolio,
    '#/settings': renderSettings,
  };

  window.addEventListener('hashchange', () => navigate(location.hash));
  window.addEventListener('DOMContentLoaded', () => navigate(location.hash || '#/welcome'));

  function navigate(hash) {
    const route = routes[hash] || renderWelcome;
    app.innerHTML = '';
    route();
  }

  function logo(size = 96) {
    return `
      <svg class="logo" width="${size}" height="${size}" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Portify">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#5B8CFF" />
            <stop offset="100%" stop-color="#8B5CF6" />
          </linearGradient>
        </defs>
        <rect rx="20" ry="20" x="8" y="8" width="80" height="80" fill="url(#g)"/>
        <path d="M36 28h16c9 0 16 7 16 16s-7 16-16 16H36V28z" fill="white"/>
        <path d="M36 28v32h8c9 0 16-7 16-16s-7-16-16-16h-8z" fill="#0B1220" fill-opacity="0.08"/>
        <circle cx="60" cy="44" r="6" fill="#FFFFFF"/>
      </svg>`;
  }

  function topbar(title = '') {
    return `
      <div class="topbar">
        <button class="button ghost" onclick="location.hash='#/home'" aria-label="Home">🏠</button>
        <div class="h2">${title}</div>
        <button class="button ghost" onclick="location.hash='#/settings'" aria-label="Settings">⚙️</button>
      </div>
    `;
  }

  function bottomNav(active = 'home') {
    const items = [
      { id: 'home', label: 'Home', hash: '#/home' },
      { id: 'create', label: 'Create', hash: '#/upload' },
      { id: 'library', label: 'Library', hash: '#/portfolio' },
      { id: 'bell', label: 'Alerts', hash: '#/home' },
      { id: 'profile', label: 'Profile', hash: '#/settings' },
    ];
    const html = items.map(i => `<button onclick=\"location.hash='${i.hash}'\" aria-current="${i.id===active}">${i.label}</button>`).join('');
    return `<nav class="bottom-nav">${html}</nav>`;
  }

  function renderWelcome() {
    app.innerHTML = `
      <section class="welcome">
        <div class="container">
          ${logo(96)}
          <div class="h1">Portify</div>
          <div class="p tagline">Show your talent beautifully</div>
          <div class="cta">
            <button class="button primary" onclick="location.hash='#/auth'">Get Started</button>
            <button class="button ghost" onclick="location.hash='#/portfolio'">Explore Portfolios</button>
          </div>
        </div>
      </section>`;
  }

  function renderAuth() {
    app.innerHTML = `
      ${topbar('Sign in')}
      <div class="container auth">
        <div class="field">
          <label>Email</label>
          <input class="input" type="email" placeholder="you@studio.com" />
        </div>
        <div class="field">
          <label>Password</label>
          <input class="input" type="password" placeholder="••••••••" />
        </div>
        <button class="button primary" onclick="location.hash='#/home'">Continue</button>
        <div class="spacer-8"></div>
        <div class="social">
          <button class="button"><span>🔵</span> Continue with Google</button>
          <button class="button"><span></span> Continue with Apple</button>
        </div>
        <div class="p">New here? <a href="#/auth">Create an account</a></div>
      </div>
    `;
  }

  function renderHome() {
    const recent = [
      { title: 'UI Kit — Aurora', img: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop' },
      { title: 'Landing — Indigo', img: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1200&auto=format&fit=crop' },
      { title: 'Brand — Nova', img: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop' },
    ];

    app.innerHTML = `
      ${topbar('Dashboard')}
      <div class="container dashboard">
        <div class="stats">
          <div class="card stat">
            <div class="h2">12</div><div class="p">Projects</div>
          </div>
          <div class="card stat">
            <div class="h2">4.2k</div><div class="p">Views</div>
          </div>
          <div class="card stat">
            <div class="h2">980</div><div class="p">Likes</div>
          </div>
        </div>

        <button class="button primary" onclick="location.hash='#/upload'">✏️ Create New Portfolio</button>

        <div class="carousel">
          <div class="row">
            ${recent.map(r => `
              <div class="card project-card">
                <img src="${r.img}" alt="${r.title}" />
                <div class="overlay"></div>
                <div class="title">${r.title}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      ${bottomNav('home')}
    `;
  }

  function renderUpload() {
    app.innerHTML = `
      ${topbar('Upload Project')}
      <div class="container">
        <div class="stepper">
          <span class="step">1 Media</span>
          <span class="step">2 Details</span>
          <span class="step">3 Publish</span>
        </div>

        <div class="upload-tile">
          <div>📤 Drag & drop images or <button class="button ghost">Add from gallery</button></div>
        </div>

        <div class="spacer-16"></div>
        <div class="field"><label>Title</label><input class="input" placeholder="Project title"/></div>
        <div class="field"><label>Description</label><textarea class="textarea" placeholder="Describe your process..."></textarea></div>
        <div class="field"><label>Tags</label><input class="input" placeholder="e.g. UI, Web, 3D"/></div>

        <div class="field">
          <label>Links</label>
          <input class="input" placeholder="Website URL"/>
          <div class="spacer-8"></div>
          <input class="input" placeholder="GitHub / Dribbble / Behance"/>
        </div>

        <div class="spacer-16"></div>
        <div class="preview">
          <div class="p">Preview</div>
          <div class="card" style="height: 160px; display: grid; place-items: center; color: var(--slate-600);">Your project preview will appear here</div>
        </div>

        <div class="spacer-16"></div>
        <div class="row">
          <button class="button ghost">Save Draft</button>
          <button class="button primary" onclick="location.hash='#/portfolio'">Publish</button>
        </div>
      </div>
      ${bottomNav('create')}
    `;
  }

  function renderPortfolio() {
    const items = Array.from({ length: 12 }).map((_, i) => ({
      title: `Project ${i+1}`,
      img: `https://picsum.photos/seed/portify-${i}/600/600`
    }));

    app.innerHTML = `
      ${topbar('Portfolio')}
      <div class="container">
        <div class="card" style="padding:16px; display:grid; grid-template-columns:auto 1fr auto; gap:12px; align-items:center;">
          <img src="https://i.pravatar.cc/144?img=12" alt="avatar" style="width:72px;height:72px;border-radius:50%;"/>
          <div>
            <div class="h2">Alex Morgan</div>
            <div class="p">Product Designer · alex.design</div>
          </div>
          <button class="button ghost" onclick="location.hash='#/settings'">Edit Profile</button>
        </div>

        <div class="spacer-12"></div>
        <div class="filters">
          ${['All','UI','Web','3D','Photo'].map(f => `<span class="chip">${f}</span>`).join('')}
        </div>

        <div class="spacer-12"></div>
        <div class="grid">
          ${items.map(it => `
            <div class="card grid-item">
              <img src="${it.img}" alt="${it.title}" style="width:100%;height:100%;object-fit:cover;"/>
            </div>
          `).join('')}
        </div>
      </div>
      ${bottomNav('library')}
    `;
  }

  function renderSettings() {
    app.innerHTML = `
      ${topbar('Settings')}
      <div class="container settings">
        <div class="card" style="padding:16px; display:grid; grid-template-columns:auto 1fr auto; gap:12px; align-items:center;">
          <img src="https://i.pravatar.cc/144?img=12" alt="avatar" style="width:72px;height:72px;border-radius:50%;"/>
          <div>
            <div class="h2">Alex Morgan</div>
            <div class="p">alex@studio.com</div>
          </div>
          <button class="button ghost">Change</button>
        </div>

        <div class="card plan">
          <div class="h2">Portify Pro</div>
          <div class="p">$5.99/mo — Custom domain, analytics, unlimited projects</div>
          <div class="spacer-12"></div>
          <button class="button primary">Upgrade to Pro</button>
        </div>

        <div class="card" style="padding:16px; display:grid; gap:12px;">
          <div class="h2">Preferences</div>
          <div class="row"><span>Theme</span><button class="button ghost">Light</button></div>
          <div class="row"><span>Notifications</span><button class="button ghost">On</button></div>
        </div>

        <div class="card" style="padding:16px; display:grid; gap:12px;">
          <div class="h2">Account</div>
          <button class="button ghost">Restore Purchases</button>
          <button class="button ghost" style="color:#EF4444">Logout</button>
        </div>
      </div>
      ${bottomNav('profile')}
    `;
  }
})();
