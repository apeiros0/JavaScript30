const canvas = document.querySelector('#draw'); // 取得 node object
const ctx = canvas.getContext('2d'); // 取得 context 來繪製

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 畫布工具的基本設定
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50; // 調整線的寬度


// 線條變換顏色
let isDrawing = false; // 判斷是否觸發繪畫，click down 就為 true，click up 就為 false

// 計算線從哪裡開始
let lastX = 0;
let lastY = 0;

let hue = 0; // 變換線條顏色
let direction = true; // 控制線條寬度

// 繪畫的 function (透過事件來觸發，需要在 canvas 上觸發)
function draw(e) {
  // 避免一直觸發 function，可透過 isDrawing 來判斷是否繪畫
  // 沒有 mousedown 就停止 function 執行
  if (!isDrawing) return;
  console.log(e);

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // 使用 hsl() 來調整顏色

  ctx.beginPath(); // 產生新路徑，再使用繪圖指令來設定路徑
  // 從起始 x, y 移動到結束的 x, y 完成線的繪製
  ctx.moveTo(lastX, lastY); // moveTo 移動到指定的點 (起始點)
  // offset 是回傳滑鼠的座標位置
  ctx.lineTo(e.offsetX, e.offsetY); // lineTo 增加新的點連成一條線 (結束點)
  ctx.stroke(); // 繪製出 moveTo 和 lineTo 所定義的路徑
  // 合成效果
  ctx.globalCompositeOperation = 'lighten';
  
  // 紀錄上一個路徑
  // ES6 解構賦值
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++; // 每次觸發 mousemove 就會一直變換顏色，雖然 hue 只有到 360，但會一直不段輪迴
  if (hue >= 360) hue = 0; // 超過 360 就把 hue 變回 0

  // lineWidth 超過 60 或小於 30 就變換 direction
  if (ctx.lineWidth >= 60 || ctx.lineWidth <= 30) {
    direction = !direction;
  }

  if (direction) {
    // 一開始為 true，一直增加 lineWidth，超過 100 就轉為 false，反之，小於 0 就轉為 true
    ctx.lineWidth++; // 讓線條寬度隨 mousemove 遞增
  } else {
    ctx.lineWidth--; // 隨 mousemove 遞減
  }
}

// 以下就模擬出 click 和 drag 的事件
// 滑鼠在 canvas 上移動就會觸發
canvas.addEventListener('mousemove', draw);

// 按下滑鼠時觸發
canvas.addEventListener('mousedown', (e) => {
  // mousedown 時先記錄滑鼠起始點，當 mousemove 時，從這個起始點開始繪製
  [lastX, lastY] = [e.offsetX, e.offsetY];
  isDrawing = true;
});

canvas.addEventListener('mouseup', () => (isDrawing = false)); // 放開滑鼠時觸發

// 沒有 mouseout 的話，當離開 canvas 時 isDrawing 會一直是 true，造成一直在畫畫的 bug
canvas.addEventListener('mouseout', () => (isDrawing = false)); // 滑鼠離開元素時觸發
