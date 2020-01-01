const scoreBoard = document.querySelector('.score'); // 計分
const holes = document.querySelectorAll('.hole'); // 全部的洞
const moles = document.querySelectorAll('.mole'); // 全部的地鼠
let lastMole; // 避免地鼠重複
let timeUp = false; // 控制遊戲時間，為 true 就關閉遊戲
let score = 0; // 計分

// 建立地鼠出現的時間 (秒) 的 function
function randomTime(min, max) {
  // 取得最大和最小值得區間
  return Math.round(Math.random() * (max - min) + min);
}

// 讓地鼠隨機從某個洞出現的 function (會回傳隨機的 DOM 元素)
// 參數是取得全部的洞
function randomHole(holes) {
  // 取得最大整數 floor (四捨五入 (round) 會超出 index)
  const idx = Math.floor(Math.random() * holes.length); // 回傳 0 ~ length 之間的隨機數 (不含 length)
  const hole = holes[idx];

  if (hole === lastMole) {
    return randomHole(holes); // 再次呼叫 randomHole 重新取得新的地鼠出現的洞 (DOM)
  }

  lastMole = hole; // 取得 function 呼叫後的地鼠出現的洞 (DOM)

  return hole; // 回傳地鼠出現的洞 (DOM)
}

// 取得地鼠出現的 function
function peep() {
  const time = randomTime(200, 1000); // 地鼠出現的時間
  const hole = randomHole(holes); // 地鼠出現的洞
  hole.classList.add('up'); // 讓地鼠出現

  setTimeout(() => {
    hole.classList.remove('up'); // 讓地鼠自動回到洞裡

    if (!timeUp) { // 遊戲沒結束就繼續讓地鼠出現
      peep(); // 重新開始遊戲
    }
  }, time)
}

// 啟動遊戲
function startGame() {
  scoreBoard.textContent = 0; // 重設記分板
  timeUp = false; // 玩多次能重新開始遊戲
  score = 0; // 重新計分
  peep();

  // 透過 setTimeout 來為遊戲計時 (10 秒)
  setTimeout(() => timeUp = true, 10000);
}

// 打地鼠計分
function bonk(e) {
  // e.isTrusted 是確保事件是由使用者操作，不是透過其他方式修改事件 (透過其他方式作弊)
  if(!e.isTrusted) {
    return;
  }
  score++;
  this.parentNode.classList.remove('up'); // 點擊後讓地鼠回到洞裡 (移除 parent 的 class)
  scoreBoard.textContent = score;
}

// 取得每隻地鼠的 DOM，click 後能計分
moles.forEach(mole => mole.addEventListener('click', bonk));