// 取得 items
// click 時會加入 .active class，並取得在哪裡點擊
// 當按住滑鼠向左右拖曳時，要弄清楚，像是
// 假設白框有 500px，並向左拖曳 20px，div 就要向左滾動 20px (反之就向右移動)
// 在點擊後取得滑鼠位置，然後再依據 scroll 多少，移動 div
// 這是 mouse down, mouse leave, mouse up 和 mouse move 的組合

// 首先取得 silder (白色外框，控制 scroll 的外框)
const silder = document.querySelector('.items');
// 由於會變動，所以用 let 宣告 (flag variable)

// 確認是否有點擊 (滑鼠按住時能拖曳)
let isDone = false;
// 沒有值是因為要在 event 中塞值
// 取得滑鼠位置和移動距離
let stratX;
let scrollLeft;

// 監聽 mousedown, mouseleave, mouseup, mousemove 事件
// mouseleave 離開包覆的元素就會觸發 (離開 ul 觸發，當監聽元素為 ul 時)
// mouseout 當滑鼠離開目標元素就會觸發 (離開 li 觸發，同上)

// 把每個事件獨立出來，並個別觸發 function

// 在元素按下滑鼠時觸發
silder.addEventListener("mousedown", (e) => {
  // 開始拖曳
  isDone = true;
  // 加入 active
  silder.classList.add('active');

  // 取得滑鼠點擊的位置 (錨點)
  // 也就是要記錄最初點擊的位置來做拖曳的計算 (取得 x 軸，內部的距離)
  // pageX 是紀錄 client 的視窗距離點擊的距離，同時會記錄 scroll 後的位置
  
  // el.offsetLeft 是元素距離視窗的位置 (現在為 0，是因為透過 scale 縮放，實際距離是 0)
  // 這主要是計算有 margin 的情況

  // 現在要取得 items 內部的距離，所以要減掉 items 的 margin 距離
  stratX = e.pageX - silder.offsetLeft;

  // el.scrollLeft 可以取得 scroll 多少距離
  scrollLeft = silder.scrollLeft;

  // stratX 和 scrollLeft 是取得初始距離 (包含移動後的初始距離)
});

// 滑鼠離開元素觸發
silder.addEventListener("mouseleave", () => {
  // 離開後就不再拖曳
  isDone = false;
  silder.classList.remove('active');
});

// 在元素滑鼠抬起時觸發
silder.addEventListener("mouseup", () => {
  isDone = false;
  silder.classList.remove('active');
});

// 滑鼠移動時觸發
silder.addEventListener("mousemove", (e) => {
  // 當 isDone 為 false 就不會觸發 mousemove 事件
  if (!isDone) return;
  // 取消預設行為
  e.preventDefault();

  // 移動 scroll
  // 透過 mousemove，每次能取得在 items 中滑鼠移動的距離
  const x = e.pageX - silder.offsetLeft;
  
  // 取得移動距離 (位移)，做 scroll 用
  // 可以乘上數字讓位移變大
  const walk = (x - stratX) * 2;

  // 透過 scrollLeft (已 scroll 多少距離) - walk (位移) 來改變 silder 的 scroll
  // - 才有往左右滑的效果
  silder.scrollLeft = scrollLeft - walk
});
