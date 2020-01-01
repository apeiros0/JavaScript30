// 目標：學習 mousemove 相關的知識，並重新建立 (移動滑鼠時，陰影會隨著滑鼠移動，動態更新 h1 標籤樣式)
// 要弄清 mousemove 觸發時，陰影會跑多遠

// 取得 hero div (佔 100 vh)
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 300; // 100px

// function
function shadow(e) {
  // ES6 解構賦值
  // 取得 hero 的物件，分別會對應 offsetWidth 和 offsetHeight，並將對應的值賦予變數 width 和 height
  // offsetWidth 和 offsetHeight 取得元素的寬高 (不含 margin)
  const { offsetWidth: width, offsetHeight: height } = hero;
  // 取得 event 的滑鼠的位置，賦予 x, y 變數 (使用 let 是為了重新賦予值)
  let { offsetX: x, offsetY: y } = e;

  // 移動到 h1 tag offsetX 和 offsetY 會以 h1 tag 計算 (以父元素做 mousemove，子元素也會受到影響)
  // 但現在要以 .hero 為主 (須排除掉 h1)
  // this = hero 的 DOM
  // e.target 是實際觸發的 DOM
  if (this !== e.target) {
    // 透過觸發的 h1 元素到視窗的距離 + 現在 h1 元素的 x 滑鼠位置 = hero 的滑鼠位置
    x = x + e.target.offsetLeft;
    // y 與 x 一樣
    y = y + e.target.offsetTop;
  }

  // 弄清楚 text-shadow 跑多遠 (陰影會拉多長)
  // 在計算以 h1 為中心的距離的 walk，50 與 -50 = 總 walk (類似座標，做位移用)
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  text.style.textShadow = `
    ${ xWalk }px ${ yWalk  }px 0 rgba(255, 0, 255, 0.7),
    ${ xWalk }px ${ yWalk * -1 }px 0 rgba(0, 255, 255, 0.7),
    ${ yWalk }px ${ xWalk * -1 }px 0 rgba(255, 255, 0, 0.7),
    ${ yWalk * -1 }px ${ xWalk * -1 }px 0 rgba(0, 0, 255, 0.7)
  `;
}


// 監聽 hero 上的 mousemove 事件
hero.addEventListener('mousemove', shadow);