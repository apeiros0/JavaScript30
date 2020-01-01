// 建立語音和合成的物件
// rate, pitch，不同的聲音，說話的資訊會設定到 SpeechSynthesisUtterance 中
const msg = new SpeechSynthesisUtterance();
// 放入不同的語音
let voices = [];
// 取得 select 的 DOM
const voicesDropdown = document.querySelector('[name="voice"]');
// 取得 range 和 textarea 的 DOM (querySelectorAll 也能放不同的 DOM)
const options = document.querySelectorAll('[type="range"], [name="text"]');
// 取得 button 的 DOM
// 開始和暫停說話的 button
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// 當頁面載入時，將 textarea 裡的文字作為 SpeechSynthesisUtterance.text 的預設值
msg.text = document.querySelector('[name="text"]').value;

// populateVoices 在頁面載入時不會呼叫
function populateVoices() {
  // 取得不同 voice，會回傳 SpeechSynthesisVoice 物件，取得設備可使用的語音
  // 是 speechSynthesis 的方法
  voices = this.getVoices();

  voicesDropdown.innerHTML = voices
    // 過濾其他語音
    .filter(voice => voice.lang.includes('en'))
    // 透過 .map() 將 SpeechSynthesisVoice 物件的陣列加入到 select > option 中
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// 切換語音
function setVoice() {
  // this.value 會取得 change 後的 select 的值
  // 透過 find 找到相對應的 SpeechSynthesisVoice 物件
  // SpeechSynthesisVoice.name 與選擇的 option 的 value 相等
  // 選擇 google 語音可能需要一些時間加載，如果選擇後沒有運作，只需要等一下就好
  msg.voice = voices.find(voice => voice.name === this.value);
  // 重新播放
  toggle();
}

// 重新啟動語音合成
// 1. 沒有設定重新啟動，講完就無法再講，所以需要重啟
// 2. 無法馬上切換語音，必須等待前面語音講完才能切換
function toggle(startOver = true) {
  // .cancel() 會停止語音播放 (會移除全部的 utterance)
  // 會立即停止 .speak()
  speechSynthesis.cancel();
  // 透過 startOver 決定要不要 .speak()
  if (startOver) {
    // 開始 .speak()
    speechSynthesis.speak(msg);
  }
}


// 調整講話速度、音調、文字
function setOption() {
  msg[this.name] = this.value;
  // 重新播放
  toggle();
}


// 監聽 speechSynthesis (可以透過 addEventListener 監聽)
// speechSynthesis (全域變數，瀏覽器本身就有)
// SpeechSynthesis 需要一些時間載入 (包括 SpeechSynthesisVoice)，所以透過監聽 voiceschanged 事件，等待 SpeechSynthesis 載入
speechSynthesis.addEventListener('voiceschanged', populateVoices);


// 監聽 select
voicesDropdown.addEventListener('change', setVoice);

// 監聽 input * 2 + textarea
options.forEach(option => option.addEventListener('change', setOption));

// button 事件
speakButton.addEventListener('click', toggle);

// 在 addEventListener 綁定 function
// 1. 使用 bind
// bind 呼叫時，會回傳新的 function，永遠接收 false 參數
// null 是指向全域環境 (global context)，第一個參數是 this 指向的地方
// 透過回傳的 function 來做監聽觸發的 function
stopButton.addEventListener('click', toggle.bind(null, false));

// 2. arrow function
// function 中還有 function
// stopButton.addEventListener('click', () => toggle(false));