// ShotSIM - メインJS

// 検索機能
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

function doSearch() {
  const query = searchInput?.value.trim();
  if (!query) return;
  // 国名マッピング
  const countryMap = {
    '韓国': 'korea',
    'かんこく': 'korea',
    'korea': 'korea',
    'アメリカ': 'usa',
    'ハワイ': 'usa',
    'hawaii': 'usa',
    'usa': 'usa',
    '台湾': 'taiwan',
    'たいわん': 'taiwan',
    'taiwan': 'taiwan',
    'タイ': 'thailand',
    'たい': 'thailand',
    'thailand': 'thailand',
    'ベトナム': 'vietnam',
    'べとなむ': 'vietnam',
    'vietnam': 'vietnam',
  };
  const key = query.toLowerCase();
  const match = countryMap[key] || countryMap[query];
  if (match) {
    window.location.href = `/countries/${match}.html`;
  } else {
    alert(`「${query}」の情報は現在準備中です。`);
  }
}

searchBtn?.addEventListener('click', doSearch);
searchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doSearch();
});

// 関連記事の自動表示
// 使い方: <div id="related-articles" data-article-id="記事ID"></div> を記事末尾に置く
(function () {
  const container = document.getElementById('related-articles');
  if (!container) return;

  const currentId = container.dataset.articleId;

  fetch('/shotsim/data/articles.json')
    .then(r => r.json())
    .then(articles => {
      const current = articles.find(a => a.id === currentId);
      if (!current) return;

      const currentTags = current.tags || [];

      // タグが1つ以上一致する記事を抽出（自分自身は除外）
      const related = articles
        .filter(a => a.id !== currentId)
        .map(a => {
          const matchCount = (a.tags || []).filter(t => currentTags.includes(t)).length;
          return { ...a, matchCount };
        })
        .filter(a => a.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount || b.date.localeCompare(a.date))
        .slice(0, 3);

      if (related.length === 0) return;

      const html = `
        <h2 style="font-size:1.2rem;margin:32px 0 12px;padding-left:12px;border-left:4px solid #1a73e8;">関連記事</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${related.map(a => `
            <a href="${a.url}" style="display:block;padding:12px 16px;border:1px solid #ddd;border-radius:4px;text-decoration:none;color:#1a73e8;font-size:0.95rem;transition:background 0.2s;"
               onmouseover="this.style.background='#f0f4ff'" onmouseout="this.style.background=''">
              ${a.title}
            </a>
          `).join('')}
        </div>
      `;
      container.innerHTML = html;
    })
    .catch(() => {}); // エラー時は何も表示しない
}());
