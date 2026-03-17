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
