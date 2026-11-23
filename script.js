/* =========================================================
   SAT — biblioteka aplikacji
   Dane aplikacji są w apps.js. Ten plik tylko je wyświetla.
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
  };
  const session = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } },
  };
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
      desc: 'Oficjalna strona pobierania aplikacji SAT dla Windows: Downloader Studio, Replay i kolejne.',
      skip: 'Przejdź do treści',
      library: 'Biblioteka',
      allApps: 'Wszystkie aplikacje',
      appsLabel: 'Aplikacje',
      appsNav: 'Aplikacje',
      search: 'Szukaj',
      appsCount: (n) => `${n} ${n === 1 ? 'aplikacja' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 'aplikacje' : 'aplikacji'}`,
      homeSub: 'Wybierz aplikację, aby zobaczyć opis i pobrać instalator.',
      noResults: 'Brak aplikacji pasujących do wyszukiwania.',
      noResultsFor: 'Nic nie pasuje do „{q}”.',
      noResultsHint: 'Spróbuj innej nazwy albo wyczyść wyszukiwanie.',
      results: 'Wyniki wyszukiwania',
      more: 'Kolejne aplikacje wkrótce',
      featured: 'Wyróżnione',
      featuredAria: 'Wyróżnione aplikacje',
      prev: 'Poprzednia',
      next: 'Następna',
      newBadge: 'Nowa wersja',
      download: 'Pobierz',
      downloadApp: 'Pobierz {app}',
      installer: 'Instalator',
      details: 'Szczegóły',
      back: 'Biblioteka',
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
      close: 'Zamknij',
      mdTitle: 'Pobieranie rozpoczęte',
      mdSub: 'Instalacja aplikacji {app}:',
      md1: 'Otwórz plik <code>{file}</code> z folderu Pobrane.',
      md2: 'Jeśli pojawi się okno SmartScreen, kliknij <b>Więcej informacji</b>, a następnie <b>Uruchom mimo to</b>.',
      md3: 'Postępuj zgodnie z instrukcjami instalatora.',
      mdRetryTxt: 'Pobieranie nie rozpoczęło się?',
      mdRetry: 'Pobierz ponownie',
      copied: 'Link skopiowany',
      copy: 'Kopiuj link',
      os: 'Korzystasz z systemu {os}. Ta aplikacja działa na Windows 10 i 11 — otwórz tę stronę na komputerze z Windows.',
    },
    en: {
      title: 'SAT — apps for Windows',
      desc: 'Official download page for SAT Windows apps: Downloader Studio, Replay and more.',
      skip: 'Skip to content',
      library: 'Library',
      allApps: 'All apps',
      appsLabel: 'Apps',
      appsNav: 'Apps',
      search: 'Search',
      appsCount: (n) => `${n} ${n === 1 ? 'app' : 'apps'}`,
      homeSub: 'Select an app to see its description and download the installer.',
      noResults: 'No apps match your search.',
      noResultsFor: 'Nothing matches “{q}”.',
      noResultsHint: 'Try another name or clear the search.',
      results: 'Search results',
      more: 'More apps coming soon',
      featured: 'Featured',
      featuredAria: 'Featured apps',
      prev: 'Previous',
      next: 'Next',
      newBadge: 'New version',
      download: 'Download',
      downloadApp: 'Download {app}',
      installer: 'Installer',
      details: 'Details',
      back: 'Library',
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
      close: 'Close',
      mdTitle: 'Download started',
      mdSub: 'Installing {app}:',
      md1: 'Open <code>{file}</code> from your Downloads folder.',
      md2: 'If a SmartScreen window appears, click <b>More info</b>, then <b>Run anyway</b>.',
      md3: 'Follow the installer instructions.',
      mdRetryTxt: "Download didn't start?",
      mdRetry: 'Download again',
      copied: 'Link copied',
      copy: 'Copy link',
      os: "You're on {os}. This app runs on Windows 10 and 11 — open this page on a Windows PC.",
    },
  };

  let lang = 'pl';
  const t = (k) => UI[lang][k];
  const tx = (obj) => (obj && typeof obj === 'object') ? (obj[lang] || obj.pl || obj.en || '') : (obj || '');

  function detectLang() {
    const saved = store.get('lang');
    if (saved === 'pl' || saved === 'en') return saved;
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

  function setLang(next, save) {
    if (next === lang) return;
    lang = next;
    if (save) store.set('lang', next);
    applyStaticText();
    render();
  }
  $$('.lang__btn').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang, true)));

  /* ---------------- Release data (GitHub API) ---------------- */
  const rel = {};
  const relState = {};
  const downloadUrl = (app) => `https://github.com/${app.repo}/releases/latest/download/${app.asset}`;
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
    }
  }

  async function loadRelease(app) {
    if (!app.repo) { relState[app.id] = 'fail'; return; }
    const key = 'rel2:' + app.repo;
    let data = null;
    const cached = session.get(key);
    if (cached) { try { data = JSON.parse(cached); } catch (e) { data = null; } }
    if (!data) {
      try {
        const res = await fetch(`https://api.github.com/repos/${app.repo}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } });
        if (!res.ok) throw new Error(String(res.status));
        const j = await res.json();
        const asset = (j.assets || []).find((a) => a.name === app.asset);
        data = {
          v: String(j.tag_name || '').replace(/^v/i, '') || null,
          date: j.published_at || null,
          size: asset ? asset.size : null,
          url: j.html_url || null,
        };
        session.set(key, JSON.stringify(data));
      } catch (e) {
        relState[app.id] = 'fail';
        fillMeta();
        return;
      }
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

  /* ---------------- Sidebar ---------------- */
  function renderSidebar(activeId) {
    $('#appCount').textContent = APPS.length;
    const list = APPS.filter(matches);
    sideList.innerHTML = list.map((app) => `
      <a class="side-item${app.id === activeId ? ' is-active' : ''}" href="#/${esc(app.id)}" style="${accent(app)}"${app.id === activeId ? ' aria-current="page"' : ''}>
        <img src="${esc(app.icon)}" alt="" width="34" height="34">
        <span><b>${highlight(app.name)}</b><small data-ver="${esc(app.id)}">${esc(version(app))}</small></span>
        <i class="side-item__new" data-new="${esc(app.id)}"${isFresh(app) ? '' : ' hidden'}></i>
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
      <article class="spot__slide${i === spotIdx ? ' is-active' : ''}" style="${accent(app)}" aria-roledescription="slide" aria-label="${esc(app.name)}" ${i === spotIdx ? '' : 'aria-hidden="true"'}>
        <div class="spot__bg" aria-hidden="true"></div>
        <div class="spot__content">
          <div class="spot__meta">
            <span class="spot__label">${ic('star')}${esc(t('featured'))}</span>
            <span class="badge" data-ver="${esc(app.id)}">${esc(version(app))}</span>
            ${newBadge(app)}
          </div>
          <h2>${esc(app.name)}</h2>
          <p>${esc(tx(app.tagline))}</p>
          <div class="spot__actions">
            <a class="btn btn--accent btn--lg" href="${esc(downloadUrl(app))}" data-download="${esc(app.id)}">${dlIcon()}${esc(t('download'))}</a>
            <a class="btn btn--ghost btn--lg" href="#/${esc(app.id)}">${esc(t('details'))}${ic('arrow', 'ic--sm ic-arrow')}</a>
          </div>
        </div>
        <div class="spot__art" aria-hidden="true">
          ${rings(3)}
          <img class="spot__glow" src="${esc(app.icon)}" alt="">
          <div class="spot__icon-wrap">
            <img class="spot__icon" src="${esc(app.icon)}" alt="" width="196" height="196">
            <div class="spot__reflect"><img src="${esc(app.icon)}" alt=""></div>
          </div>
        </div>
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

  function tile(app, i) {
    return `
      <article class="tile" style="${accent(app)};--i:${i}">
        <a class="tile__link" href="#/${esc(app.id)}" aria-label="${esc(app.name)} — ${esc(t('details'))}"></a>
        <div class="tile__cover">
          <img class="tile__blur" src="${esc(app.icon)}" alt="" aria-hidden="true">
          <img class="tile__icon" src="${esc(app.icon)}" alt="" width="116" height="116" style="view-transition-name:${vtName(app)}">
          <div class="tile__tags">${newBadge(app)}<span class="badge" data-ver="${esc(app.id)}">${esc(version(app))}</span></div>
          <a class="tile__dl" href="${esc(downloadUrl(app))}" data-download="${esc(app.id)}" aria-label="${esc(t('downloadApp').replace('{app}', app.name))}" title="${esc(t('download'))}">${dlIcon()}</a>
        </div>
        <div class="tile__body">
          <h3>${highlight(app.name)}</h3>
          <p>${highlight(tx(app.tagline))}</p>
          <div class="tile__meta">
            <span class="tile__size">${ic('package', 'ic--xs')}<span data-size="${esc(app.id)}"></span></span>
            <span class="tile__cta">${esc(t('details'))}${ic('arrow', 'ic--sm')}</span>
          </div>
        </div>
      </article>`;
  }

  function renderHome() {
    const list = APPS.filter(matches);
    const more = !query ? `<div class="tile tile--soon" style="--i:${list.length}" aria-hidden="true"><div class="tile__cover">${ic('sparkle')}</div><div class="tile__body"><p>${esc(t('more'))}</p></div></div>` : '';
    const grid = list.length
      ? `<div class="tiles">${list.map(tile).join('')}${more}</div>`
      : `<div class="empty">${ic('search')}<b>${esc(t('noResultsFor').replace('{q}', search.value.trim()))}</b><span>${esc(t('noResultsHint'))}</span></div>`;
    view.innerHTML = `
      <section class="home">
        <header class="home__head">
          <div>
            <p class="eyebrow"><span class="dot"></span>SAT · Windows 10 / 11</p>
            <h1><span class="gold-text">${esc(t('library'))}</span></h1>
            <p class="home__sub"><span class="home__count">${esc(t('appsCount')(APPS.length))}</span> · ${esc(t('homeSub'))}</p>
          </div>
        </header>
        ${!query ? spotlight() : ''}
        <div class="section-head"><h2>${esc(query ? t('results') : t('allApps'))}</h2><span class="pill">${list.length}</span></div>
        ${grid}
      </section>`;
    document.title = t('title');
  }

  /* ---------------- Detail ---------------- */
  function renderDetail(app) {
    const feats = (app.features || []).map((f, i) => `
      <div class="feat" style="--i:${i}">
        <span class="feat__ic">${ic(f.icon || 'check')}</span>
        <div><h3>${esc(tx(f.title))}</h3><p>${esc(tx(f.text))}</p></div>
      </div>`).join('');
    const info = (app.info || []).map((r) => `<div><dt>${esc(tx(r.label))}</dt><dd>${esc(tx(r.value))}</dd></div>`).join('');
    const infoAll = `
      <div><dt>${esc(t('version'))}</dt><dd class="mono" data-ver="${esc(app.id)}">${esc(version(app))}</dd></div>
      <div><dt>${esc(t('released'))}</dt><dd class="mono"><time data-date="${esc(app.id)}"></time></dd></div>
      ${info}`;
    const others = APPS.filter((a) => a.id !== app.id);
    const osNote = userOs ? `
      <div class="os-note">${ic('monitor')}<p>${esc(t('os').replace('{os}', userOs))}</p>
      <button type="button" class="btn btn--sm btn--ghost" data-copy>${ic('copy')}${esc(t('copy'))}</button></div>` : '';

    view.innerHTML = `
      <article class="detail" style="${accent(app)}">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a href="#/">${ic('back', 'ic--sm')}${esc(t('back'))}</a>${ic('chevron', 'ic--xs')}<span aria-current="page">${esc(app.name)}</span>
        </nav>
        <header class="banner">
          <div class="banner__art" aria-hidden="true">
            ${rings(3)}
            <img class="banner__art-glow" src="${esc(app.icon)}" alt="">
            <img class="banner__art-icon" src="${esc(app.icon)}" alt="">
          </div>
          <div class="banner__content">
            <img class="banner__icon" src="${esc(app.icon)}" alt="" width="112" height="112" style="view-transition-name:${vtName(app)}">
            <div>
              <div class="banner__eyebrow">
                <span class="badge">${ic('windows')}Windows 10 / 11</span>
                <span class="badge" data-ver="${esc(app.id)}">${esc(version(app))}</span>
                ${newBadge(app)}
              </div>
              <h1>${esc(app.name)}</h1>
              <p class="banner__tag">${esc(tx(app.tagline))}</p>
            </div>
          </div>
          <span class="banner__frame" aria-hidden="true"></span>
        </header>

        <div class="actionbar">
          <a class="btn btn--accent btn--xl" href="${esc(downloadUrl(app))}" data-download="${esc(app.id)}">
            ${dlIcon()}
            <span class="btn__label"><b>${esc(t('download'))}</b><small>${esc(t('installer'))} .exe · <span data-size="${esc(app.id)}"></span></small></span>
          </a>
          <dl class="facts">
            <div style="--i:0"><dt>${esc(t('version'))}</dt><dd data-ver="${esc(app.id)}">${esc(version(app))}</dd></div>
            <div style="--i:1"><dt>${esc(t('size'))}</dt><dd data-size="${esc(app.id)}"></dd></div>
            <div style="--i:2"><dt>${esc(t('released'))}</dt><dd data-date="${esc(app.id)}"></dd></div>
            <div style="--i:3"><dt>${esc(t('system'))}</dt><dd class="facts__os">${ic('windows', 'ic--sm')}Windows 10 / 11</dd></div>
          </dl>
        </div>
        ${osNote}

        <div class="detail__grid">
          <div class="detail__main">
            <section class="block">
              <h2>${esc(t('about'))}</h2>
              <p class="detail__desc">${esc(tx(app.description))}</p>
            </section>
            ${feats ? `<section class="block"><h2>${esc(t('features'))}</h2><div class="feats">${feats}</div></section>` : ''}
          </div>
          <aside class="detail__side">
            <section class="panel"><h3>${esc(t('info'))}</h3><dl class="info">${infoAll}</dl></section>
          </aside>
        </div>

        ${others.length ? `
        <section class="block more" style="margin-top:44px">
          <h2>${esc(t('others'))}</h2>
          <div class="minis">
            ${others.map((o) => `
              <a class="mini" href="#/${esc(o.id)}" style="${accent(o)}">
                <img src="${esc(o.icon)}" alt="" width="56" height="56" style="view-transition-name:${vtName(o)}">
                <span class="mini__txt"><b>${esc(o.name)}</b><small>${esc(tx(o.tagline))}</small></span>
                ${ic('arrow')}
              </a>`).join('')}
          </div>
        </section>` : ''}
      </article>`;
    document.title = `${app.name} — SAT`;
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
    renderSidebar(app ? app.id : null);
    if (!id) renderHome();
    else if (app) renderDetail(app);
    else renderNotFound();
    $('#navLibrary').classList.toggle('is-active', !id);
    fillMeta();
  }

  /* ---------------- Routing with view transitions ---------------- */
  function navigate() {
    const update = () => { window.scrollTo({ top: 0, behavior: 'instant' }); render(); };
    if (document.startViewTransition && !reduceMotion) {
      view.classList.add('is-morph');
      const vt = document.startViewTransition(update);
      vt.finished.finally(() => view.classList.remove('is-morph'));
    } else {
      update();
      view.classList.remove('is-entering'); void view.offsetWidth; view.classList.add('is-entering');
    }
  }
  window.addEventListener('hashchange', navigate);

  /* ---------------- Search ---------------- */
  search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    const id = route();
    renderSidebar(byId(id) ? id : null);
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

  /* ---------------- Steam-like 3D tilt on library tiles ---------------- */
  if (canHover && !reduceMotion) {
    const MAX = 10; // degrees
    view.addEventListener('pointermove', (e) => {
      const tl = e.target.closest && e.target.closest('.tile:not(.tile--soon)');
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
    $('#mdTitle').textContent = t('mdTitle');
    $('#mdSub').textContent = t('mdSub').replace('{app}', app.name);
    $('#mdSteps').innerHTML = ['md1', 'md2', 'md3'].map((k) => `<li>${t(k).replace('{file}', esc(app.asset))}</li>`).join('');
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
