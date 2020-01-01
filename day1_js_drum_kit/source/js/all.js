// 在個頁面監聽 keyboard 事件
window.addEventListener('keydown', function(e) {
  // 找到 audio 標籤，再選取到 data 屬性
  // querySelector (類似 CSS) 可以選取到 tag，並用 tag[data-**= ...] 方式選取標籤
  // 沒有該 audio 元素會顯示 null
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // 播放音樂用
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); // 增加 CSS 效果用
  if (!audio) return; // 當 audio 是 null/undefined，讓 function 不要繼續執行
  audio.currentTime = 0; // 讓當前時間歸 0，點擊 keyboard 能一直播放 audio (原本按一下只能播放一次)
  audio.play(); // 播放 audio

  // classList 的 className 不用加 .
  key.classList.add('playing'); // 加入 CSS 效果
});

function removeTransition(e) {
  // e 會呈現 transition 動畫結束後的事件 (加入 .playing 後的轉場時間)
  // 略過其他事件，像是 box-shadow border-color... (保留 transform 事件避免影響效能，也可以留其它的事件)
  if (e.propertyName !== 'transform') return;
  // this 是指向 key (<div>...</div>) 這個物件
  this.classList.remove('playing');
}

// 移除 CSS 效果，可透過 querySelectorAll 和 forEach 來觸發 transition 動畫結束事件
// 動畫結束就來執行這裡 (直接在 Console 加入 playing 會被移除，因為有 transitionend 在做監聽)
const keys = document.querySelectorAll('.key'); // 取得所有 .key 的 className
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));
