const PAGE_COUNT = 23;
const portfolio = document.getElementById('portfolio');
const indicator = document.getElementById('pageIndicator');
const viewer = document.getElementById('viewer');
const viewerImage = document.getElementById('viewerImage');
const viewerLabel = document.getElementById('viewerLabel');
const viewerCanvas = document.getElementById('viewerCanvas');
const zoomButton = document.getElementById('zoomButton');
const closeButton = document.getElementById('closeButton');

const pad = n => String(n).padStart(2, '0');

for (let page = 1; page <= PAGE_COUNT; page++) {
  const number = pad(page);
  const figure = document.createElement('figure');
  figure.className = 'portfolio-page';
  figure.id = `page-${number}`;
  figure.dataset.page = page;

  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Open portfolio page ${page}`);

  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.media = '(max-width: 700px)';
  source.srcset = `assets/preview/page-${number}.webp`;

  const img = document.createElement('img');
  img.src = `assets/full/page-${number}.webp`;
  img.alt = `Portfolio page ${page} of ${PAGE_COUNT}`;
  img.width = 3840;
  img.height = 2160;
  img.decoding = 'async';
  if (page === 1) {
    img.loading = 'eager';
    img.fetchPriority = 'high';
  } else {
    img.loading = 'lazy';
  }

  picture.append(source, img);
  button.appendChild(picture);
  figure.appendChild(button);
  portfolio.appendChild(figure);

  button.addEventListener('click', () => openViewer(page));
}

const observer = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) indicator.textContent = `${pad(Number(visible.target.dataset.page))} / ${PAGE_COUNT}`;
}, { threshold: [0.15, 0.35, 0.6, 0.85] });

document.querySelectorAll('.portfolio-page').forEach(page => observer.observe(page));

function openViewer(page) {
  const number = pad(page);
  viewerImage.src = `assets/full/page-${number}.webp`;
  viewerImage.alt = `Expanded portfolio page ${page} of ${PAGE_COUNT}`;
  viewerLabel.textContent = `Page ${number} / ${PAGE_COUNT}`;
  viewer.classList.remove('is-zoomed');
  zoomButton.textContent = 'Zoom';
  viewer.showModal();
  viewerCanvas.scrollTo({ top: 0, left: 0 });
}

function closeViewer() {
  viewer.close();
  viewerImage.removeAttribute('src');
}

function toggleZoom() {
  const zoomed = viewer.classList.toggle('is-zoomed');
  zoomButton.textContent = zoomed ? 'Fit' : 'Zoom';
  viewerCanvas.scrollTo({ top: 0, left: 0 });
}

zoomButton.addEventListener('click', toggleZoom);
closeButton.addEventListener('click', closeViewer);
viewer.addEventListener('click', event => {
  if (event.target === viewer) closeViewer();
});
viewer.addEventListener('close', () => {
  viewer.classList.remove('is-zoomed');
});
