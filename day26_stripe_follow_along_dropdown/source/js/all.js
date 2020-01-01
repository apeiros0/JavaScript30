// 取得 li 的 DOM
// .cool > li 只會取得第一層的 li
const triggers = document.querySelectorAll('.cool > li');

// 取得 dropdownBackground (移動背景用)
const background = document.querySelector('.dropdownBackground');

// 取得 nav 的 DOM
const nav = document.querySelector('.top');



// 使用新增和移除 class 的方式，透過 CSS 做到
// hover li 時，找到 .dropdown 並顯示內容
function handleEnter() {
  // this = li

  // 先將 display none 變成 block
  // 也能先讓 getBoundingClientRect 取得寬高 (沒有加入的話無法讓 getBoundingClientRect 取得寬高)
  this.classList.add('trigger-enter');

  // 使用 function () {...} this 會是全域物件
  // arrow function 的 this 會透過父層 (function ...) 找到 this (沒有自己的 this)
  // arrow function 可以讓 setTimeout 的 this 綁定定義時所在的作用域 (scope)
  // setTimeout 的 this 永遠指向 window

  // 150 毫秒後顯示 dropdown 的內容 (會有 transition 的效果)
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);

  // 當快速切換連結時，setTimeout 有時會在 hover off 後才加入 .trigger-enter-active
  // 會導致 hover 時會先看到內容
  // 當 class 有 trigger-enter，才加入 trigger-enter-active


  // 顯示白色背景
  background.classList.add('open');

  // 取得 dropdown 內容的大小
  // 透過 JavaScript 取得 dropdown 內容的大小，讓 background 可以跟在後方
  // 透過 li 取得 div.dropdown 的 DOM (這三個 dropdown 是不同的，需要動態變化)
  const dropdown = this.querySelector('.dropdown');

  // 取得 dropdown 的大小和位置
  const dropdownCoords = dropdown.getBoundingClientRect();

  // getBoundingClientRect 只會給絕對值 (當頁面有變化不會更新)
  // 所以需要取得 nav 的位置
  // 因為頁面可能有 banner 被開啟或關閉，所以不能假設 nav 的位置和載入時是相同的

  // 取得 nav 的位置 (nav 不可能永遠都在頁面的最上面，可能會有其他元素它的在前面)
  const navCoords = nav.getBoundingClientRect();

  // 在這個範例中，nav 前加上其他元素 (h2)，會使 dropdownCoords.top  產生偏移，
  // 因為 .dropdownBackground 是在 nav 內的最左邊 (前面已經有 h2 )，再加上 dropdownCoords.top 後，導致 .dropdownBackground 整個偏移
  // 所以要減掉 nav 離頂部的位置，lef 也要 (可能會被 logo 佔位置)
  // 這就是為什麼要取得 nav 的位置，取得 nav 距離頂部的位置 (偏移量)
  // 這點 jQuery 的 .offset() 就做得很好

  // 真正的寬高和位置
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  };

  // 改變 dropdownBackground
  // 除了使用 style.width/height，也能使用 setProperty() 設定 style 屬性
  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  // translate 可以做平移
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}


function handleLeave() {
  // remove 可加入多個參數移除
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}


// 觸發 li 的 mouseenter (hover on) 和 mouseeleave (hover off) 事件
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));