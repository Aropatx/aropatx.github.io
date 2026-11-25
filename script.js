/* =========================================================
   SAT — biblioteka aplikacji
   Dane aplikacji są w apps.js. Ten plik tylko je wyświetla.
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sel = (s) => (window.CSS && CSS.escape ? CSS.escape(s) : s);
  const ic = (name, cls = '') => `<svg class="ic${cls ? ' ' + cls : ''}" aria-hidden="true"><use href="#i-${esc(name)}"/></svg>`;

  const APPS = Array.isArray(window.APPS) ? window.APPS : [];
  const byId = (id) => APPS.find((a) => a.id === id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------- UI strings ---------------- */
  const UI = {
    pl: {
      title: 'SAT — aplikacje dla Windows',
      desc: 'Pobierz Downloader Studio i Replay na Windows ze strony SAT.',
      skip: 'Przejdź do treści',
      library: 'Biblioteka',
      allApps: 'Wszystkie aplikacje',
      coffee: 'Kup mi kawę',
      coffeeShort: 'Kawa',
      coffeeSub: 'Wesprzyj rozwój',
      appsLabel: 'Aplikacje',
      appsNav: 'Aplikacje',
      search: 'Szukaj',
      homeSub: 'Aplikacje na Windows 10 i 11',
      noResults: 'Brak aplikacji pasujących do wyszukiwania.',
      noResultsFor: 'Nic nie pasuje do „{q}”.',
      noResultsHint: 'Spróbuj innej nazwy albo wyczyść wyszukiwanie.',
      results: 'Wyniki wyszukiwania',
      featuredAria: 'Podgląd aplikacji',
      prev: 'Poprzednia',
      next: 'Następna',
      newBadge: 'Nowa wersja',
      download: 'Pobierz',
      downloadApp: 'Pobierz {app}',
      installer: 'Instalator',
      details: 'Szczegóły',
      back: 'Biblioteka',
      breadcrumbs: 'Ścieżka nawigacji',
      version: 'Wersja',
      size: 'Rozmiar',
      released: 'Wydano',
      system: 'System',
      about: 'Opis',
      features: 'Funkcje',
      info: 'Informacje',
      links: 'Linki',
      others: 'Inne aplikacje',
      releaseNotes: 'Informacje o wydaniu',
      repo: 'Repozytorium GitHub',
      allReleases: 'Wszystkie wydania',
      notFound: 'Nie znaleziono aplikacji.',
      notFoundHint: 'Ta aplikacja nie istnieje albo została przeniesiona.',
      disclaimer: 'Aplikacje nie są powiązane z YouTube ani Google. Znaki towarowe należą do ich właścicieli.',
      privacy: 'Prywatność',
      privacyIntro: 'SAT to katalog aplikacji prowadzony przez Aropatx. Strona nie ma kont użytkowników, reklam ani narzędzi analitycznych.',
      privacyHosting: 'Hosting i informacje o wydaniach',
      privacyHostingText: 'GitHub Pages zapisuje adres IP odwiedzających w celach bezpieczeństwa. Przeglądarka łączy się też z GitHubem, żeby pobrać informacje o aktualnych wydaniach. Przycisk pobierania prowadzi do instalatora w GitHub Releases. Szczegóły dotyczące danych przetwarzanych przez GitHub i Twoich praw opisuje jego polityka prywatności.',
      privacyGithubLink: 'Polityka prywatności GitHuba',
      privacySettings: 'Język strony',
      privacySettingsText: 'Strona domyślnie używa języka przeglądarki. Wybranie PL lub EN zapisuje ten wybór w adresie strony.',
      privacySupport: 'Wsparcie przez Buy Me a Coffee',
      privacySupportText: 'Przycisk „Kup mi kawę” otwiera zewnętrzny serwis Buy Me a Coffee. Przy wpłacie serwis może udostępnić twórcy nazwę, adres e-mail, wiadomość oraz kwotę i datę wpłaty.',
      privacySupportLink: 'Polityka prywatności Buy Me a Coffee',
      privacyContact: 'Kontakt',
      privacyContactText: 'Profil autora katalogu znajduje się na GitHubie. W sprawach danych przetwarzanych przez GitHub skorzystaj z jego formularza dotyczącego prywatności.',
      privacyAuthorLink: 'Aropatx na GitHubie',
      privacyGithubContactLink: 'Formularz GitHub Privacy',
      close: 'Zamknij',
      mdTitle: 'Pobieranie {app}',
      mdSub: 'Instalator dla Windows 10 i 11',
      md1: 'Znajdź plik <code>{file}</code> w folderze Pobrane.',
      md2: 'Sprawdź, czy plik pochodzi z wydania SAT na GitHubie. Jeśli pojawi się ostrzeżenie SmartScreen, zweryfikuj nazwę pliku i jego źródło przed uruchomieniem.',
      md3: 'Otwórz zweryfikowany plik i postępuj zgodnie z instrukcjami instalatora.',
      mdRetryTxt: 'Pobieranie nie rozpoczęło się?',
      mdRetry: 'Pobierz ponownie',
      copied: 'Link skopiowany',
      copy: 'Kopiuj link',
      os: 'Korzystasz z systemu {os}. Skopiuj link, aby otworzyć go na komputerze z Windows.',
    },
    en: {
      title: 'SAT — apps for Windows',
      desc: 'Download Downloader Studio and Replay for Windows from SAT.',
      skip: 'Skip to content',
      library: 'Library',
      allApps: 'All apps',
      coffee: 'Buy me a coffee',
      coffeeShort: 'Coffee',
      coffeeSub: 'Support development',
      appsLabel: 'Apps',
      appsNav: 'Apps',
      search: 'Search',
      homeSub: 'Apps for Windows 10 and 11',
      noResults: 'No apps match your search.',
      noResultsFor: 'Nothing matches “{q}”.',
      noResultsHint: 'Try another name or clear the search.',
      results: 'Search results',
      featuredAria: 'App preview',
      prev: 'Previous',
      next: 'Next',
      newBadge: 'New version',
      download: 'Download',
      downloadApp: 'Download {app}',
      installer: 'Installer',
      details: 'Details',
      back: 'Library',
      breadcrumbs: 'Breadcrumb',
      version: 'Version',
      size: 'Size',
      released: 'Released',
      system: 'System',
      about: 'About',
      features: 'Features',
      info: 'Information',
      links: 'Links',
      others: 'More apps',
      releaseNotes: 'Release notes',
      repo: 'GitHub repository',
      allReleases: 'All releases',
      notFound: 'App not found.',
      notFoundHint: "This app doesn't exist or has moved.",
      disclaimer: 'These apps are not affiliated with YouTube or Google. Trademarks belong to their respective owners.',
      privacy: 'Privacy',
      privacyIntro: 'SAT is an app catalog maintained by Aropatx. The site has no user accounts, ads, or analytics tools.',
      privacyHosting: 'Hosting and release information',
      privacyHostingText: 'GitHub Pages logs visitors’ IP addresses for security purposes. Your browser also requests current release information from GitHub. Download buttons lead to installers published on GitHub Releases. See GitHub’s privacy statement for how GitHub handles data and how to exercise your rights.',
      privacyGithubLink: 'GitHub Privacy Statement',
      privacySettings: 'Site language',
      privacySettingsText: 'The site starts in your browser’s preferred language. Choosing PL or EN keeps the selection in the page address.',
      privacySupport: 'Support through Buy Me a Coffee',
      privacySupportText: 'The “Buy me a coffee” link opens the external Buy Me a Coffee website. For a contribution, the service may share your name, email address, message, and the amount and date of the contribution with the creator.',
      privacySupportLink: 'Buy Me a Coffee Privacy Policy',
      privacyContact: 'Contact',
      privacyContactText: 'The catalog maintainer has a profile on GitHub. For questions about data handled by GitHub, use its privacy contact form.',
      privacyAuthorLink: 'Aropatx on GitHub',
      privacyGithubContactLink: 'GitHub privacy contact form',
      close: 'Close',
      mdTitle: 'Downloading {app}',
      mdSub: 'Installer for Windows 10 and 11',
      md1: 'Find <code>{file}</code> in your Downloads folder.',
      md2: 'Check that the file came from a SAT release on GitHub. If SmartScreen displays a warning, verify the filename and its source before running it.',
      md3: 'Open the verified file and follow the installer instructions.',
      mdRetryTxt: "Download didn't start?",
      mdRetry: 'Download again',
      copied: 'Link copied',
      copy: 'Copy link',
      os: "You're on {os}. Copy this link to open it on a Windows PC.",
    },
  };

  let lang = 'pl';
  const t = (k) => UI[lang][k];
  const tx = (obj) => (obj && typeof obj === 'object') ? (obj[lang] || obj.pl || obj.en || '') : (obj || '');

  function detectLang() {
    const selected = new URLSearchParams(location.search).get('lang');
    if (selected === 'pl' || selected === 'en') return selected;
    const list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for (const l of list) {
      const code = String(l || '').toLowerCase().slice(0, 2);
      if (code === 'pl') return 'pl';
      if (code === 'en') return 'en';
    }
    return 'en';
  }

  function applyStaticText() {
    document.documentElement.lang = lang;
    $$('[data-ui]').forEach((el) => { el.textContent = t(el.dataset.ui); });
    $$('[data-ui-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.uiAria)));
    $$('[data-ui-placeholder]').forEach((el) => el.setAttribute('placeholder', t(el.dataset.uiPlaceholder)));
    const md = $('meta[name="description"]');
    if (md) md.setAttribute('content', t('desc'));
    $$('.lang__btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('.lang').dataset.active = lang;
  }

  function setLang(next) {
    if (next === lang) return;
    const url = new URL(location.href);
    url.searchParams.set('lang', next);
    history.replaceState(history.state, '', url);
    lang = next;
    applyStaticText();
    render();
  }
  $$('.lang__btn').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------------- Release data (GitHub API) ---------------- */
  const rel = {};
  const relState = {};
  // Nazwa instalatora: prawdziwa z najnowszego wydania, a do czasu jej pobrania — z apps.js.
  const assetName = (app) => (rel[app.id] && rel[app.id].file) || app.asset;
  const downloadUrl = (app) => `https://github.com/${app.repo}/releases/latest/download/${encodeURIComponent(assetName(app))}`;
  const repoUrl = (app) => `https://github.com/${app.repo}`;
  const fmtSize = (b) => new Intl.NumberFormat(lang === 'pl' ? 'pl-PL' : 'en-US', { maximumFractionDigits: 1 }).format(b / 1048576) + ' MB';
  const fmtDate = (iso) => {
    try { return new Intl.DateTimeFormat(lang === 'pl' ? 'pl-PL' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso)); } catch (e) { return '—'; }
  };
  const version = (app) => 'v' + ((rel[app.id] && rel[app.id].v) || app.fallbackVersion || '—');
  const FRESH_DAYS = 21;
  const isFresh = (app) => {
    const d = rel[app.id];
    if (!d || !d.date) return false;
    const age = Date.now() - new Date(d.date).getTime();
    return age >= 0 && age < FRESH_DAYS * 864e5;
  };

  function fillMeta() {
    for (const app of APPS) {
      const d = rel[app.id] || {};
      const pending = relState[app.id] === 'loading';
      const id = sel(app.id);
      $$(`[data-ver="${id}"]`).forEach((el) => { el.textContent = version(app); });
      $$(`[data-size="${id}"]`).forEach((el) => {
        el.classList.toggle('sk', pending && !d.size);
        el.textContent = d.size ? fmtSize(d.size) : (pending ? '' : '—');
      });
      $$(`[data-date="${id}"]`).forEach((el) => {
        el.classList.toggle('sk', pending && !d.date);
        el.textContent = d.date ? fmtDate(d.date) : (pending ? '' : '—');
        if (d.date) el.setAttribute('datetime', d.date);
      });
      $$(`[data-new="${id}"]`).forEach((el) => { el.hidden = !isFresh(app); });
      $$(`[data-notes="${id}"]`).forEach((el) => { if (d.url) el.href = d.url; });
      if (app.repo) $$(`[data-download="${id}"]`).forEach((el) => { el.href = downloadUrl(app); });
    }
  }

  // Wersja z tagu: "v2.5.2", "2.5.2", "Replay-v2.5.2" -> "2.5.2".
  const cleanVersion = (tag) => {
    const str = String(tag || '').trim();
    const m = str.match(/\d+(?:\.\d+)+[0-9A-Za-z.+-]*/);
    return m ? m[0] : (str.replace(/^v/i, '') || null);
  };

  // Kopia danych zapisywana co godzinę przez GitHub Action (.github/workflows/update-releases.yml).
  // Używana, gdy API GitHuba odmówi (limit 60 zapytań/h na adres IP).
  const SNAPSHOT_URLS = [
    'https://raw.githubusercontent.com/Aropatx/aropatx.github.io/main/releases.json',
    'releases.json',
  ];
  let snapshotPromise = null;
  const loadSnapshot = () => snapshotPromise || (snapshotPromise = (async () => {
    for (const url of SNAPSHOT_URLS) {
      try {
        const res = await fetch(url, { cache: 'no-cache', credentials: 'omit', referrerPolicy: 'no-referrer' });
        if (!res.ok) continue;
        const j = await res.json();
        if (j && j.apps) return j.apps;
      } catch (e) { /* następne źródło */ }
    }
    return {};
  })());

  // Instalator z wydania: dokładna nazwa z apps.js, a gdy jej nie ma — pierwszy plik .exe/.msi.
  const pickAsset = (assets, name) => {
    const list = Array.isArray(assets) ? assets : [];
    return list.find((a) => a.name === name)
      || list.find((a) => name && a.name.toLowerCase() === String(name).toLowerCase())
      || list.find((a) => /\.(exe|msi)$/i.test(a.name))
      || null;
  };

  async function loadRelease(app) {
    if (!app.repo) { relState[app.id] = 'fail'; return; }
    let data;
    try {
      const res = await fetch(`https://api.github.com/repos/${app.repo}/releases/latest`, {
        headers: { Accept: 'application/vnd.github+json' },
        cache: 'no-cache',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
      });
      if (!res.ok) throw new Error(String(res.status));
      const j = await res.json();
      const asset = pickAsset(j.assets, app.asset);
      data = {
        v: cleanVersion(j.tag_name),
        date: j.published_at || j.created_at || null,
        size: asset ? asset.size : null,
        file: asset ? asset.name : null,
        url: j.html_url || null,
      };
      // Brakujące pola uzupełnij z kopii, jeśli dotyczy tej samej wersji.
      if (!data.size || !data.date) {
        const s = (await loadSnapshot())[app.id];
        if (s && s.v === data.v) {
          data.size = data.size || s.size || null;
          data.date = data.date || s.date || null;
          data.file = data.file || s.file || null;
        }
      }
    } catch (e) {
      const snapshot = await loadSnapshot();
      data = snapshot[app.id];
    }

    if (!data) {
      relState[app.id] = 'fail';
      fillMeta();
      return;
    }
    rel[app.id] = data;
    relState[app.id] = 'ok';
    fillMeta();
  }

  /* ---------------- OS ---------------- */
  const userOs = (() => {
    const ua = navigator.userAgent || '';
    const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
    if (/Windows/i.test(ua) || /Win/i.test(platform)) return null;
    if (/Android/i.test(ua)) return 'Android';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
    if (/Mac/i.test(platform) || /Mac OS X/i.test(ua)) return 'macOS';
    if (/CrOS/i.test(ua)) return 'ChromeOS';
    if (/Linux/i.test(ua) || /Linux/i.test(platform)) return 'Linux';
    return null;
  })();

  /* ---------------- Rendering helpers ---------------- */
  const view = $('#view');
  const sideList = $('#sideList');
  const search = $('#search');
  let query = '';

  const accent = (app) => `--a1:${esc(app.colors && app.colors[0] || '#6e6bf5')};--a2:${esc(app.colors && app.colors[1] || '#4a3fd0')}`;
  const vtName = (app) => 'icon-' + String(app.id).toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const matches = (app) => {
    if (!query) return true;
    const hay = [app.name, tx(app.tagline), tx(app.description)].join(' ').toLowerCase();
    return hay.includes(query);
  };
  const highlight = (text) => {
    const s = String(text || '');
    if (!query) return esc(s);
    const i = s.toLowerCase().indexOf(query);
    if (i < 0) return esc(s);
    return esc(s.slice(0, i)) + '<mark>' + esc(s.slice(i, i + query.length)) + '</mark>' + esc(s.slice(i + query.length));
  };
  const route = () => decodeURIComponent((location.hash || '').replace(/^#\/?/, '')) || '';
  const rings = (n = 3) => `<div class="rings" aria-hidden="true">${'<i></i>'.repeat(n)}</div>`;
  const dlIcon = () => `<span class="btn__ic">${ic('download', 'ic-dl')}${ic('check', 'ic-ok')}</span>`;
  const newBadge = (app) => `<span class="badge badge--new" data-new="${esc(app.id)}"${isFresh(app) ? '' : ' hidden'}>${esc(t('newBadge'))}</span>`;
  const artwork = (app, transitionName = 'none') => `
    <div class="app-art" aria-hidden="true">
      ${rings(2)}
      <span class="app-art__frame">
        <img src="${esc(app.icon)}" alt="" width="180" height="180" style="view-transition-name:${transitionName}">
      </span>
    </div>`;

  /* ---------------- Sidebar ---------------- */
  function renderSidebar(activeId) {
    const list = APPS.filter(matches);
    sideList.innerHTML = list.map((app) => `
      <a class="side-item${app.id === activeId ? ' is-active' : ''}" href="#/${esc(app.id)}" style="${accent(app)}"${app.id === activeId ? ' aria-current="page"' : ''}>
        <img src="${esc(app.icon)}" alt="" width="34" height="34">
        <span><b>${highlight(app.name)}</b><small data-ver="${esc(app.id)}">${esc(version(app))}</small></span>
      </a>`).join('') || `<p class="side-empty">${esc(t('noResults'))}</p>`;
    const home = $('#sideHome');
    home.classList.toggle('is-active', !activeId);
    if (!activeId) home.setAttribute('aria-current', 'page'); else home.removeAttribute('aria-current');
  }

  /* ---------------- Home ---------------- */
  let spotIdx = 0;

  function spotlight() {
    if (!APPS.length) return '';
    spotIdx = Math.min(spotIdx, APPS.length - 1);
    const auto = !reduceMotion && APPS.length > 1;
    const slides = APPS.map((app, i) => `
      <article class="spot__slide${i === spotIdx ? ' is-active' : ''}" style="${accent(app)}" aria-roledescription="slide" aria-label="${esc(app.name)}"${i === spotIdx ? '' : ' inert aria-hidden="true"'}>
        <div class="spot__content">
          <div class="spot__meta">
            <span class="badge" data-ver="${esc(app.id)}">${esc(version(app))}</span>
          </div>
          <h2>${esc(app.name)}</h2>
          <p>${esc(tx(app.tagline))}</p>
          <div class="spot__actions">
            <a class="btn btn--accent btn--lg" href="${esc(downloadUrl(app))}" data-download="${esc(app.id)}">${dlIcon()}${esc(t('download'))}</a>
            <a class="btn btn--ghost btn--lg" href="#/${esc(app.id)}">${esc(t('details'))}${ic('arrow', 'ic--sm ic-arrow')}</a>
          </div>
        </div>
        ${artwork(app)}
      </article>`).join('');
    const thumbs = APPS.length > 1 ? `
      <div class="spot__nav">
        ${APPS.map((app, i) => `
          <button type="button" class="spot__thumb${i === spotIdx ? ' is-active' : ''}" data-spot="${i}" aria-label="${esc(app.name)}" aria-pressed="${i === spotIdx}">
            <img src="${esc(app.icon)}" alt="" width="32" height="32"><span>${esc(app.name)}</span>
            <span class="spot__bar" aria-hidden="true"><i></i></span>
          </button>`).join('')}
        <div class="spot__arrows">
          <button type="button" class="icon-btn" data-spot-step="-1" aria-label="${esc(t('prev'))}">${ic('chevron')}</button>
          <button type="button" class="icon-btn" data-spot-step="1" aria-label="${esc(t('next'))}">${ic('chevron')}</button>
        </div>
      </div>` : '';
    return `<section class="spot${auto ? ' spot--auto' : ''}" aria-roledescription="carousel" aria-label="${esc(t('featuredAria'))}">
      <div class="spot__track">${slides}</div>${thumbs}
    </section>`;
  }

  function spotGo(i) {
    const spot = $('.spot');
    if (!spot || !APPS.length) return;
    spotIdx = (i + APPS.length) % APPS.length;
    $$('.spot__slide', spot).forEach((s, k) => {
      const on = k === spotIdx;
      s.classList.toggle('is-active', on);
      s.inert = !on;
      if (on) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true');
    });
    $$('.spot__thumb', spot).forEach((b, k) => {
      b.classList.toggle('is-active', k === spotIdx);
      b.setAttribute('aria-pressed', String(k === spotIdx));
    });
  }

  view.addEventListener('click', (e) => {
    const th = e.target.closest('[data-spot]');
    if (th) { spotGo(Number(th.dataset.spot)); return; }
    const st = e.target.closest('[data-spot-step]');
    if (st) spotGo(spotIdx + Number(st.dataset.spotStep));
  });
  view.addEventListener('animationend', (e) => {
    if (e.animationName === 'spotProg') spotGo(spotIdx + 1);
  });
  // Swipe between featured slides on touch screens
  let swipe = null;
  view.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' || !e.target.closest('.spot')) return;
    swipe = { x: e.clientX, y: e.clientY };
  }, { passive: true });
  view.addEventListener('pointerup', (e) => {
    if (!swipe) return;
    const dx = e.clientX - swipe.x, dy = e.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) spotGo(spotIdx + (dx < 0 ? 1 : -1));
  }, { passive: true });
  view.addEventListener('pointercancel', () => { swipe = null; });

  function tile(app) {
    return `
      <article class="tile" style="${accent(app)}">
        <a class="tile__link" href="#/${esc(app.id)}" aria-label="${esc(app.name)} — ${esc(t('details'))}"></a>
        <div class="tile__cover">
          <img class="tile__icon" src="${esc(app.icon)}" alt="" width="54" height="54" style="view-transition-name:${vtName(app)}">
          <div class="tile__tags"><span class="badge" data-ver="${esc(app.id)}">${esc(version(app))}</span>${newBadge(app)}</div>
        </div>
        <div class="tile__body">
          <h3>${highlight(app.name)}</h3>
          <p>${highlight(tx(app.tagline))}</p>
        </div>
        <div class="tile__meta">
          <span class="tile__cta">${esc(t('details'))}${ic('arrow', 'ic--sm')}</span>
          <div class="tile__actions">
            <span class="tile__size" data-size="${esc(app.id)}"></span>
            <a class="tile__dl" href="${esc(downloadUrl(app))}" data-download="${esc(app.id)}" aria-label="${esc(t('downloadApp').replace('{app}', app.name))}" title="${esc(t('download'))}">${dlIcon()}</a>
          </div>
        </div>
      </article>`;
  }

  function renderHome() {
    const list = APPS.filter(matches);
    const grid = list.length
      ? `<div class="tiles">${list.map(tile).join('')}</div>`
      : `<div class="empty" role="status">${ic('search')}<b>${esc(t('noResultsFor').replace('{q}', search.value.trim()))}</b><span>${esc(t('noResultsHint'))}</span></div>`;
    view.innerHTML = `
      <section class="home">
        <header class="page-head home__head">
          <h1>${esc(t('library'))}</h1>
          <p>${ic('monitor', 'ic--sm')}${esc(t('homeSub'))}</p>
        </header>
        ${!query ? spotlight() : ''}
        <section class="catalog" aria-labelledby="catalog-title">
          <h2 id="catalog-title">${esc(query ? t('results') : t('allApps'))}</h2>
          ${grid}
        </section>
      </section>`;
    document.title = t('title');
  }

  /* ---------------- Detail ---------------- */
  const externalLink = (href, label) => `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  const distributionLinks = (app) => (app.distribution?.links || []).map(({ href, label }) => externalLink(href, tx(label))).join('');

  function renderDistribution(app) {
    if (!app.distribution) return '';
    return `
      <section class="block distribution">
        <h2>${esc(tx(app.distribution.title))}</h2>
        ${app.distribution.paragraphs.map((paragraph) => `<p>${esc(tx(paragraph))}</p>`).join('')}
        <div class="reference-links">${distributionLinks(app)}</div>
      </section>`;
  }

  function renderDetail(app) {
    const feats = (app.features || []).map((f) => `
      <div class="feat">
        <span class="feat__ic">${ic(f.icon || 'check')}</span>
        <div><h3>${esc(tx(f.title))}</h3><p>${esc(tx(f.text))}</p></div>
      </div>`).join('');
    const info = (app.info || []).map((r) => `<div><dt>${esc(tx(r.label))}</dt><dd>${esc(tx(r.value))}</dd></div>`).join('');
    const others = APPS.filter((a) => a.id !== app.id);
    const osNote = userOs ? `
      <div class="os-note">${ic('monitor')}<p>${esc(t('os').replace('{os}', userOs))}</p>
      <button type="button" class="btn btn--sm btn--ghost" data-copy>${ic('copy')}${esc(t('copy'))}</button></div>` : '';

    view.innerHTML = `
      <article class="detail" style="${accent(app)}">
        <nav class="crumbs" aria-label="${esc(t('breadcrumbs'))}">
          <a href="#/">${ic('back', 'ic--sm')}${esc(t('back'))}</a>${ic('chevron', 'ic--xs')}<span aria-current="page">${esc(app.name)}</span>
        </nav>
        <header class="banner">
          <div class="banner__content">
            <h1>${esc(app.name)}</h1>
            <p>${esc(tx(app.tagline))}</p>
          </div>
          ${artwork(app, vtName(app))}
        </header>

        <div class="actionbar">
          <a class="btn btn--accent btn--xl" href="${esc(downloadUrl(app))}" data-download="${esc(app.id)}">
            ${dlIcon()}
            <span class="btn__label"><b>${esc(t('download'))}</b><small>${esc(t('installer'))} .exe · <span data-size="${esc(app.id)}"></span></small></span>
          </a>
          <dl class="facts">
            <div><dt>${esc(t('version'))}</dt><dd data-ver="${esc(app.id)}">${esc(version(app))}</dd></div>
            <div><dt>${esc(t('released'))}</dt><dd><time data-date="${esc(app.id)}"></time></dd></div>
            <div><dt>${esc(t('system'))}</dt><dd class="facts__os">${ic('monitor', 'ic--sm')}Windows 10 / 11</dd></div>
          </dl>
        </div>
        ${osNote}
        ${renderDistribution(app)}

        <div class="detail__grid">
          <div class="detail__main">
            <section class="block">
              <h2>${esc(t('about'))}</h2>
              <p class="detail__desc">${esc(tx(app.description))}</p>
            </section>
            ${feats ? `<section class="block"><h2>${esc(t('features'))}</h2><div class="feats">${feats}</div></section>` : ''}
          </div>
          ${info ? `<aside class="detail__side"><section class="panel"><h2>${esc(t('info'))}</h2><dl class="info">${info}</dl></section></aside>` : ''}
        </div>

        ${others.length ? `
        <section class="block more">
          <h2>${esc(t('others'))}</h2>
          <div class="minis">
            ${others.map((o) => `
              <a class="mini" href="#/${esc(o.id)}" style="${accent(o)}">
                <img src="${esc(o.icon)}" alt="" width="48" height="48" style="view-transition-name:${vtName(o)}">
                <span class="mini__txt"><b>${esc(o.name)}</b><small>${esc(tx(o.tagline))}</small></span>
                ${ic('arrow')}
              </a>`).join('')}
          </div>
        </section>` : ''}
      </article>`;
    document.title = `${app.name} — SAT`;
  }

  function renderPrivacy() {
    view.innerHTML = `
      <article class="privacy">
        <nav class="crumbs" aria-label="${esc(t('breadcrumbs'))}"><a href="#/">${ic('back', 'ic--sm')}${esc(t('back'))}</a></nav>
        <header class="page-head privacy__head"><h1>${esc(t('privacy'))}</h1><p>${esc(t('privacyIntro'))}</p></header>
        <section class="block distribution">
          <h2>${esc(t('privacyHosting'))}</h2>
          <p>${esc(t('privacyHostingText'))}</p>
          <div class="reference-links">${externalLink('https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement', t('privacyGithubLink'))}</div>
        </section>
        <section class="block distribution">
          <h2>${esc(t('privacySettings'))}</h2>
          <p>${esc(t('privacySettingsText'))}</p>
        </section>
        <section class="block distribution">
          <h2>${esc(t('privacySupport'))}</h2>
          <p>${esc(t('privacySupportText'))}</p>
          <div class="reference-links">${externalLink('https://buymeacoffee.com/privacy-policy', t('privacySupportLink'))}</div>
        </section>
        <section class="block distribution">
          <h2>${esc(t('privacyContact'))}</h2>
          <p>${esc(t('privacyContactText'))}</p>
          <div class="reference-links">
            ${externalLink('https://github.com/Aropatx', t('privacyAuthorLink'))}
            ${externalLink('https://support.github.com/contact/privacy', t('privacyGithubContactLink'))}
          </div>
        </section>
      </article>`;
    document.title = `${t('privacy')} — SAT`;
  }

  function renderNotFound() {
    view.innerHTML = `
      <section class="home">
        <nav class="crumbs"><a href="#/">${ic('back', 'ic--sm')}${esc(t('back'))}</a></nav>
        <div class="empty">${ic('info')}<b>${esc(t('notFound'))}</b><span>${esc(t('notFoundHint'))}</span></div>
      </section>`;
    document.title = t('title');
  }

  function render() {
    const id = route();
    const app = id ? byId(id) : null;
    renderSidebar(id || null);
    if (!id) renderHome();
    else if (id === 'privacy') renderPrivacy();
    else if (app) renderDetail(app);
    else renderNotFound();
    $('#navLibrary').classList.toggle('is-active', !id);
    $('#privacyLink')?.setAttribute('aria-current', id === 'privacy' ? 'page' : 'false');
    fillMeta();
  }

  /* ---------------- Routing with view transitions ---------------- */
  function navigate() {
    const update = () => {
      render();
      window.scrollTo({ top: 0, behavior: 'instant' });
      view.focus({ preventScroll: true });
    };
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(update);
    } else {
      update();
      view.classList.remove('is-entering'); void view.offsetWidth; view.classList.add('is-entering');
    }
  }
  window.addEventListener('hashchange', navigate);
  $('.skip').addEventListener('click', (event) => {
    event.preventDefault();
    view.focus({ preventScroll: true });
    view.scrollIntoView({ block: 'start' });
  });

  /* ---------------- Search ---------------- */
  search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    const id = route();
    renderSidebar(id || null);
    if (!id) renderHome();
    fillMeta();
  });
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const first = APPS.find(matches);
      if (first) { location.hash = '#/' + first.id; search.blur(); }
    } else if (e.key === 'Escape' && search.value) {
      e.preventDefault();
      search.value = '';
      search.dispatchEvent(new Event('input'));
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || (document.activeElement && document.activeElement.isContentEditable)) return;
    if ($('#dlModal').open) return;
    e.preventDefault();
    search.focus();
    search.select();
  });

  /* ---------------- Spotlight on cards ---------------- */
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest && e.target.closest('.tile, .feat');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---------------- Tile motion ---------------- */
  if (canHover && !reduceMotion) {
    const MAX = 3; // degrees
    view.addEventListener('pointermove', (e) => {
      const tl = e.target.closest && e.target.closest('.tile');
      if (!tl) return;
      const r = tl.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tl.classList.add('is-tilting');
      tl.style.setProperty('--ry', `${(px * MAX * 2).toFixed(2)}deg`);
      tl.style.setProperty('--rx', `${(-py * MAX * 2).toFixed(2)}deg`);
    }, { passive: true });
    view.addEventListener('pointerout', (e) => {
      const tl = e.target.closest && e.target.closest('.tile');
      if (!tl || tl.contains(e.relatedTarget)) return;
      tl.classList.remove('is-tilting');
      tl.style.setProperty('--rx', '0deg');
      tl.style.setProperty('--ry', '0deg');
    });
  }

  /* ---------------- Snack / copy ---------------- */
  function snack(msg) {
    const s = $('#snack');
    s.innerHTML = ic('check', 'ic--sm') + esc(msg);
    s.classList.add('is-on');
    clearTimeout(snack._t);
    snack._t = setTimeout(() => s.classList.remove('is-on'), 2200);
  }
  document.addEventListener('click', async (e) => {
    const c = e.target.closest('[data-copy]');
    if (!c) return;
    try { await navigator.clipboard.writeText(location.href); snack(t('copied')); } catch (err) { /* ignore */ }
  });

  /* ---------------- Download modal ---------------- */
  const modal = $('#dlModal');
  function sparks() {
    const box = $('#mdSparks');
    if (!box || reduceMotion) return;
    box.innerHTML = '';
    const N = 18;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 + Math.random() * 0.3;
      const d = 60 + Math.random() * 70;
      const s = document.createElement('i');
      s.className = 'spark';
      s.style.setProperty('--dx', `${(Math.cos(a) * d).toFixed(1)}px`);
      s.style.setProperty('--dy', `${(Math.sin(a) * d).toFixed(1)}px`);
      s.style.animationDelay = `${(0.15 + Math.random() * 0.15).toFixed(2)}s`;
      box.appendChild(s);
    }
    setTimeout(() => { box.innerHTML = ''; }, 1500);
  }
  function openModal(app) {
    if (!modal || typeof modal.showModal !== 'function') return;
    modal.style.setProperty('--a1', app.colors[0]);
    modal.style.setProperty('--a2', app.colors[1]);
    $('#mdIcon').src = app.icon;
    $('#mdTitle').textContent = t('mdTitle').replace('{app}', app.name);
    $('#mdSub').textContent = t('mdSub');
    $('#mdSteps').innerHTML = ['md1', 'md2', 'md3'].map((k) => `<li>${t(k).replace('{file}', esc(assetName(app)))}</li>`).join('');
    const resource = $('#mdResource');
    if (resource) {
      const links = distributionLinks(app);
      resource.innerHTML = links;
      resource.hidden = !links;
    }
    $('#mdRetryTxt').textContent = t('mdRetryTxt');
    const retry = $('#mdRetry');
    retry.textContent = t('mdRetry');
    retry.href = downloadUrl(app);
    if (!modal.open) { modal.showModal(); sparks(); }
  }
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-download]');
    if (!a) return;
    const app = byId(a.dataset.download);
    if (!app) return;
    a.classList.add('is-done');
    clearTimeout(a._t);
    a._t = setTimeout(() => a.classList.remove('is-done'), 2800);
    setTimeout(() => openModal(app), 380);
  });

  /* ---------------- Init ---------------- */
  $('#year').textContent = String(new Date().getFullYear());
  APPS.forEach((a) => { relState[a.id] = a.repo ? 'loading' : 'fail'; });
  lang = detectLang();
  applyStaticText();
  render();
  APPS.forEach(loadRelease);
})();
