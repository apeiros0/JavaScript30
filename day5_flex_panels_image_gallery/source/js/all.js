const panels = document.querySelectorAll('.panel'); // All 是取得全部同名稱 class

function toggleOpen() {
  this.classList.toggle('open'); // toggle 可以 add 和 remove class
}

panels.forEach((panel) => panel.addEventListener('click', toggleOpen));

function toggleActive(e) {
  // 擋掉 flex 以外的事件
  // e.propertyName === 'flex' 是為了支援 Safari (Safari 的 flex-grow、flex-shrink、flex-basic 的 propertyName 都是指 flex)
  // String.includes() 字串有包含某個字就為 true
  if (e.propertyName.includes('flex')) {
    // 會有多個 transitionend 被觸發，導致 toggle 觸發兩次切回原本狀態，所以才像沒有觸發一樣
    // 觸發兩次的原因是 .open 的 CSS 有 flex 和 font-size 各觸發一次 transitionend
    this.classList.toggle('open-active');
  }
}

// 動畫效果結束，讓字體推移回來 100% -> 0%
panels.forEach((panel) => panel.addEventListener('transitionend', toggleActive));
