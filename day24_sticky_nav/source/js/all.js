// 取得 nav 的 DOM
const nav = document.querySelector('#main');

// 取得 nav 元素頂部距離
let topOfNav = nav.offsetTop;

// nav 置頂
// 要取得 nav 元素頂部離瀏覽器頂部有多少距離 (nav.offsetTop)
// 當 scroll 時，要取得 scroll 多少距離 (window.scrollY)
// 當 scroll 超過 nav 元素頂部距離時，就要置頂
function fixNav() {
  // 在 body 加入/移除 class
  // 容易取得目標和其他的子元素 (放在目標也可以，但放在 body 比較能取得其他的子元素)
  if (window.scrollY >= topOfNav) {
    // 當 .fixed-nav 加入時，.site-wrap 的內容會跳起來
    // 這是因為當 fixed 元素後，它就不再占用原本的空間 (類似 float 在瀏覽器頂部)
    // 透過 paddingTop 將失去的 nav 元素的高度 (nav.offsetHeight) 補回
    // 高度透過 nav.offsetHeight 取得，不要直接寫死 (可能受 nav 改變高度，或字體尺寸改變... 的因素影響)
    document.body.style.paddingTop = `${nav.offsetHeight}px`;

    // 在 body 加上 .fixed-nav class
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}


// 監聽 window scroll 事件
window.addEventListener('scroll', fixNav);

// 透過 window 的 resize 重新調整 topOfNav 的距離
window.addEventListener('resize', () => {
  // 透過 header 的高度重新調整 topOfNav 的距離
  topOfNav = document.querySelector('header').offsetHeight;
});