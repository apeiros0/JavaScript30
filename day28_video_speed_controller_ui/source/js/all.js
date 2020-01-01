const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');


// 監聽 speed (整體白色部分)
// 是透過 speed 來控制速度和調整 speed-bar 的 CSS
speed.addEventListener('mousemove', function (e) {
  // 取得頁面的 Y 軸 (在 speed 內) - speed 距離頂部的距離
  // 會得到在 speed 內移動的全部高度 (從 0 開始)
  // 減掉 offsetTop 是因為 speed 的位置可能會因 padding，或與其他元素合併而改變
  const y = e.pageY - this.offsetTop;

  // 將 y 轉換成百分比 (透過 speed 的整體高度計算)
  const percent = y / this.offsetHeight;
  
  // 設定最小和最大的播放速度
  const min = 0.4;
  const max = 4;

  // 調整 speed-bar 的高度 (會轉換成百分比)
  // Math.round 會四捨五入
  const height = Math.round(percent * 100) + '%';
  bar.style.height = height;

  // 調整播放速度
  // 0% = min 的值
  // 100% = max 的值
  // 百分比 * (max - min) + min 能算出最大和最小值的區間
  // 乘 (max - min) 是為了換算成區間
  // 加回 min 是為了恢復 max 和 min 設定的值
  const playbackRate = percent * (max - min) + min;
  // toFixed(2) 是取得小數點後 2 位
  bar.textContent = playbackRate.toFixed(2) + 'x';

  // 設定播放速率到 video
  // 1 是正常速度
  // 這裡不用擔心小數點後的值 (不會有問題)
  video.playbackRate = playbackRate;
});