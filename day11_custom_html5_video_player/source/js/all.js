/* 取得元素 */
// 盡量別與 CSS 的 class 名稱共用
// 先取得最外層 (整體) 的 player
const player = document.querySelector('.player');
// 透過 palyer 取得 video (viewer 是 JS hook)
const video = player.querySelector('.viewer');
// 進度條
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled'); // 填滿進度條
// 切換播放和暫停
const toggle = player.querySelector('.toggle');
// 類似的功能和 DOM 透過 querySelectorAll 取出
// 會取得所有含有 data-skip 的 DOM
const skipButtons = player.querySelectorAll('[data-skip]'); // 也可以透過 [attribute] 取出 DOM
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

/* 建立 function */
// 切換播放和暫停的 function
function togglePlay() {
  // 透過三元運算子來決定方法
  // 使用 paused 判斷是否為暫停，會回傳 true/false
  const method = video.paused ? 'play' : 'pause';
  video[method]();

  // video[video.paused ? 'play' : 'pause'](); // 簡化寫法
}

// 更新播放/暫停 icon
function updateButton() {
  // this 有綁定到 video
  // 暫停就顯示 play 的 icon；反之顯示暫停的 icon
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon; // 寫入 toggle 的 text 裡面

  // toggle.textContent = this.paused ? '►' : '❚❚'; // 簡化寫法
}

// 快進和倒回
function skip() {
  // 透過 dataset.skip 取得秒數
  // currentTime 取得當前秒數
  // this.dataset.skip 是字串，要轉換成數值 (JS 的 number = Float)
  video.currentTime += parseFloat(this.dataset.skip);
}

// 調整音量和播放速度
function handleRangeUpdate() {
  // 由於 DOM 的 name 與 video 方法名稱一樣，所以透過 name 來調整音量或播放速度
  video[this.name] = this.value;
}

// 調整播放進度條
// 透過 timeupdate 事件來觸發 handleProgress
function handleProgress() {
  // 使用百分比來控制，因為我們是使用 flex-basis (%) 來決定填滿效果
  // 需要計算影片有多長，算出百分比 (當前秒數 / 總秒數 = 當前進度 * 100)
  // 乘 100 = 算出百分比
  // duration 是指影片的總長度，單位為秒
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// 點擊進度條時觸發，會跳到點擊的位置 (透過滑鼠點擊的位置來計算 offsetX)
function scrub(e) {
  // offsetWidth 會回傳元素的寬度 (不含 margin)
  // 透過影片的總秒數 * 點擊的位置 = 影片的當前時間
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime; // 設定到當前時間
}

function toggleFull() {
  // document.fullscreenElement 判斷是否為全螢幕狀態，非全螢幕為 null
  document.fullscreenElement
    ? document.exitFullscreen()
    : player.requestFullscreen();
}

function updateFullscreenButton() {
  const icon = document.fullscreenElement ? '⇲' : '⇱';
  fullscreen.textContent = icon;
}

/* 監聽事件 */
// 監聽 video 和 toggle 的事件
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// 監聽 video 的 play 和 pause 事件來切換 icon
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// 監聽進度條事件
video.addEventListener('timeupdate', handleProgress);

// 監聽快進和倒回事件
skipButtons.forEach((button) => button.addEventListener('click', skip));

// 監聽調整音量和播放速度的事件
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate)
); // 滑動時觸發

// 透過 flag 控制 mousemove
let mousedown = false;
// 監聽進度條的 click 事件
progress.addEventListener('click', scrub);
// 透過 mousemove 來拖曳進度條
// 簡化寫法，會先檢查 mousedown 變數，當變數為 true，就會繼續執行，呼叫 function
// 劫持 && 的使用方法 (會先判斷第一個是否為 true)，為 true，就接著呼叫 function；反之，為 false 就不會繼續執行
// 透過 Short-circuit evaluation 的特性，第一個值為 false 就不會繼續執行 (會影響到高優先性的運算子)
// scrub function 需要初始化的 e (event)，所以要傳入 e (呼叫時不會傳入 event，所以需要加入 event)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

// 監聽全螢幕事件
fullscreen.addEventListener('click', toggleFull);
player.addEventListener('fullscreenchange', updateFullscreenButton);
