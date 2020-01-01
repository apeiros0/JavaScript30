// 取得所有 a 連結的 DOM
const triggers = document.querySelectorAll('a');


// 加入 span.highlight
// 當 highlight 連結時，會調整 highlight 的寬度、高度、頁面上位置 (width, height, translateX, translateY)
// span.highlight 有 transition，所以能從一個地方過渡到另一個地方

// 新增 span 的元素
const highlight = document.createElement('span');

// 加入 highlight class
highlight.classList.add('highlight');

// 加入到 DOM 中
document.body.append(highlight);


function highlightLink() {
  // 當 hover 時，取得元素的 width, height, x, y 位置
  // getBoundingClientRect 會回傳元素的尺寸和位置
  const linkCoords = this.getBoundingClientRect();

  // 有 scroll 時會定位錯誤
  // 解決方式：可以找出偏移多少，並加回去
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  };

  console.log(linkCoords);
  // 取得 highlight 的寬高
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;

  // 對各個連結定位 (transform 可與 transition 一起使用)
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}


// 監聽連結
// mouseenter 是滑鼠移動到元素上就會觸發的事件 (類似 hover)
triggers.forEach(a => {
  a.addEventListener('mouseenter', highlightLink);
});