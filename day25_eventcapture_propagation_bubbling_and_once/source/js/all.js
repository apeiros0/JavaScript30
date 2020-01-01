// 取得所有 div 的 DOM
const divs = document.querySelectorAll('div');

// 取得 button 的 DOM
const button = document.querySelector('button');

// 輸出 class 的值
function logText(e) {
  console.log(this.classList.value);
  console.log(this);

  // 停止冒泡和捕捉
  e.stopPropagation();
}


// 監聽 div 的 click 事件
// divs.forEach(div => div.addEventListener('click', logText));
// document.body.addEventListener('click', logText);


// Bubbling
// 瀏覽器會找出使用者點擊什麼，同時也會不斷往上觸發事件直到 document


// Capture
// 啟用 capture
// divs.forEach(div => div.addEventListener('click', logText, {
//   // capture 預設是 false
//   capture: true
// }));

// 這個監聽不會在冒泡時執行，它會在捕捉時執行
// 所以順序是 one -> two -> three
// Capture 在執行 function 是由上往下執行


// Stop Propagation (會停止 Bubble 和 Capture)
// 在 function 中加入 e.stopPropagation() 會停止事件冒泡，直接取得目標元素
// 如果想取得中間的元素，可以將 e.stopPropagation() 包在 if 裡

// 如果啟用 Capture，當點擊 .three 時，只會顯示 .one
// 因為 function 先輸出 .one，之後停止捕捉



// Once
// 是瀏覽器新的傳遞事件
// 當觸發事件時，只會觸發一次，之後會對事件解除綁定 (unbind)
// 解除綁定 (unbind)與 div.removeEventListener('click', logText) 一樣


// 啟用 once
divs.forEach(div => div.addEventListener('click', logText, {
  // capture 預設是 false
  capture: false,
  once: true
}));

// 在 button 添加 once
button.addEventListener('click', () => {
  console.log('Click');
}, {
  once: true
});
