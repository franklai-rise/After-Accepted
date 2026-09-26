import { categories, projects, podcast } from './site-data.js?v=20260926-warm';

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const safeURL = (value) => {
  if (!value) return null;
  try { const url = new URL(value, location.href); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
};
const categoryArt = {
  software: '<div class="code-preview" aria-hidden="true"><div class="code-dots"><i></i><i></i><i></i></div><p><span class="code-pink">const</span> idea = <span class="code-blue">"what if?"</span>;</p><p><span class="code-blue">build</span>(idea);</p><p>// make something useful.</p></div>',
  skills: '<div class="skill-preview" aria-hidden="true"><span class="skill-key">/</span><span class="skill-key">skill</span><span class="skill-key">↵</span></div>',
  plugins: '<div class="plugin-preview" aria-hidden="true"><span class="plugin-icon">{ }</span><span class="connector">···</span><span class="plugin-icon">＋</span></div>',
};
const grid = document.querySelector('#work-grid');
const dialog = document.querySelector('#detail-dialog');
let dialogTrigger;

function renderWork(filter = 'all') {
  const visibleCategories = categories.filter((category) => filter === 'all' || category.id === filter);
  grid.innerHTML = visibleCategories.map((category) => {
    const entries = projects.filter((project) => project.category === category.id);
    if (entries.length) return entries.map((project) => `<article class="work-card"><div class="card-content"><p class="card-kicker">${escapeHTML(category.kicker)}</p><h3>${escapeHTML(project.name)}</h3><p class="card-description">${escapeHTML(project.description)}</p></div><div class="card-art">${safeURL(project.image) ? `<img class="project-card-image" src="${escapeHTML(safeURL(project.image))}" alt="${escapeHTML(project.name)} 预览" loading="lazy" />` : categoryArt[category.id]}</div><div class="card-bottom"><span class="card-status">${escapeHTML(project.status || category.label)}</span><button class="card-open" data-project="${escapeHTML(project.id)}" aria-label="了解 ${escapeHTML(project.name)}">+</button></div></article>`).join('');
    return `<article class="work-card ${escapeHTML(category.theme)}"><div class="card-content"><p class="card-kicker">${escapeHTML(category.kicker)}</p><h3>${escapeHTML(category.title)}</h3><p class="card-description">${escapeHTML(category.description)}</p></div><div class="card-art">${categoryArt[category.id]}</div><div class="card-bottom"><span class="card-status">${escapeHTML(category.status)}</span><button class="card-open" data-category="${escapeHTML(category.id)}" aria-label="了解${escapeHTML(category.label)}">+</button></div></article>`;
  }).join('');
  document.querySelectorAll('[data-filter]').forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const pending = visibleCategories.some((category) => !projects.some((project) => project.category === category.id));
  document.querySelector('#collection-note').textContent = pending ? '第一批作品正在整理，敬请期待。' : '从真实需求出发，持续打磨每一件作品。';
}

function openDetails(button) {
  const category = categories.find((item) => item.id === button.dataset.category);
  const project = projects.find((item) => item.id === button.dataset.project);
  const item = category || project;
  if (!item) return;
  const url = safeURL(project?.url);
  document.querySelector('#dialog-content').innerHTML = `<p class="eyebrow">${escapeHTML(category?.kicker || 'AFTERACCEPTED WORKS')}</p><h2 id="dialog-title">${escapeHTML(category?.label || project.name)}</h2><p>${escapeHTML(category?.detail || project.details || project.description)}</p>${category ? '<p class="dialog-note">第一批作品正在整理，正式上线后会在这里与你见面。</p>' : url ? `<a class="text-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">前往项目 ↗</a>` : '<p class="dialog-note">项目链接即将更新。</p>'}`;
  dialogTrigger = button;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}
document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => renderWork(button.dataset.filter)));
document.querySelectorAll('[data-category-link]').forEach((link) => link.addEventListener('click', () => renderWork(link.dataset.categoryLink)));
document.querySelectorAll('a[href="#work"]:not([data-category-link])').forEach((link) => link.addEventListener('click', () => renderWork('all')));
grid.addEventListener('click', (event) => { const button = event.target.closest('.card-open'); if (button) openDetails(button); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); dialogTrigger?.focus(); });

document.querySelector('#episode-list').innerHTML = podcast.episodes.map((episode) => {
  const url = safeURL(episode.url);
  const audio = safeURL(episode.audioUrl);
  return `<details class="episode"><summary>${safeURL(episode.image) ? `<img class="episode-cover" src="${escapeHTML(safeURL(episode.image))}" alt="第 ${escapeHTML(episode.number)} 期节目海报" width="1254" height="1254" loading="lazy" />` : ''}<span class="episode-info"><span class="episode-number">EP ${escapeHTML(episode.number)}</span><span class="episode-title">${escapeHTML(episode.title)}</span><span class="episode-tags">${escapeHTML(episode.tags)}</span><span class="episode-more">本期聊什么 <span class="episode-plus" aria-hidden="true">+</span></span></span></summary><div class="episode-body"><p>${escapeHTML(episode.description)}</p>${audio ? `<audio controls preload="none" aria-label="播放：${escapeHTML(episode.title)}" src="${escapeHTML(audio)}">你的浏览器不支持音频播放。</audio>` : ''}${url ? `<p><a class="text-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">收听本期节目 ↗</a></p>` : !audio ? '<p class="audio-pending">收听链接即将更新。</p>' : ''}</div></details>`;
}).join('');
const platforms = podcast.platforms.filter((platform) => safeURL(platform.url));
document.querySelector('#listen-links').innerHTML = platforms.length ? platforms.map((platform) => `<a href="${escapeHTML(safeURL(platform.url))}" target="_blank" rel="noopener noreferrer">在${escapeHTML(platform.label)}收听 ↗</a>`).join('') : '<span>节目收听入口即将更新，先从一个感兴趣的问题开始。</span>';

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', '打开导航'); mobileNav.hidden = true; }
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? '打开导航' : '关闭导航');
  mobileNav.hidden = expanded;
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuToggle.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });
document.querySelector('#copyright-year').textContent = new Date().getFullYear();
renderWork();
